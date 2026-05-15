import { auth } from "@clerk/nextjs/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import OpenAI from "openai";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

  const { prompt } = await req.json();
  if (!prompt?.trim()) {
    return Response.json({ error: "prompt is required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account) return Response.json({ error: "Account not found" }, { status: 404 });

  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt: `Digital signage advertisement for a widescreen TV display. Professional, modern, high-quality. ${prompt}`,
    size: "1536x1024",
    quality: "high",
  });

  const b64 = result.data?.[0]?.b64_json;
  if (!b64) return Response.json({ error: "No image returned" }, { status: 502 });

  const imageBuffer = Buffer.from(b64, "base64");
  const key = `asds/content-temp/${account._id.toString()}/${Date.now()}.png`;

  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: imageBuffer,
    ContentType: "image/png",
  }));

  const previewUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return Response.json({ imageUrl: previewUrl });
}
