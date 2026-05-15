import { auth } from "@clerk/nextjs/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageUrl, name, runtime: runtimeVal } = await req.json();
  if (!imageUrl || !name) {
    return Response.json({ error: "imageUrl and name are required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account) return Response.json({ error: "Account not found" }, { status: 404 });

  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) return Response.json({ error: "Failed to download generated image" }, { status: 502 });
  const buffer = Buffer.from(await imgRes.arrayBuffer());

  const TARGET_W = 1920;
  const TARGET_H = 1080;

  const meta = await sharp(buffer).metadata();
  const srcW = meta.width ?? TARGET_W;
  const srcH = meta.height ?? TARGET_H;

  // Scale so the image fully covers 1920x1080, then center-crop — no letterboxing
  const scale = Math.max(TARGET_W / srcW, TARGET_H / srcH);
  const scaledW = Math.round(srcW * scale);
  const scaledH = Math.round(srcH * scale);
  const cropLeft = Math.round((scaledW - TARGET_W) / 2);
  const cropTop = Math.round((scaledH - TARGET_H) / 2);

  const resized = await sharp(buffer)
    .resize(scaledW, scaledH, { fit: "fill" })
    .extract({ left: cropLeft, top: cropTop, width: TARGET_W, height: TARGET_H })
    .flatten({ background: "#000000" }) // strip alpha before JPEG output
    .jpeg({ quality: 92 })
    .toBuffer();

  const key = `asds/content/${account._id.toString()}/${Date.now()}-ai.jpg`;

  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: resized,
    ContentType: "image/jpeg",
  }));

  const s3Url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  const runtime = typeof runtimeVal === "number" ? runtimeVal : parseInt(runtimeVal, 10);
  const now = new Date();

  const result = await db.collection("content").insertOne({
    account_id: account._id,
    type: "promotion",
    status: "active",
    name: name.trim(),
    url: s3Url,
    mime_type: "image/jpeg",
    partner: "CETV",
    total_plays: 0,
    runtime,
    transcoding_required: false,
    transcoded: false,
    created_at: now,
    updated_at: now,
  });

  return Response.json({
    _id: result.insertedId.toString(),
    name: name.trim(),
    url: s3Url,
    mime_type: "image/jpeg",
    runtime,
    created_at: now.toISOString(),
    transcoding_required: false,
    transcoded: false,
    transcoding_error: false,
  });
}
