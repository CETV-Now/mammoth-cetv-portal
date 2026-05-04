import { auth } from "@clerk/nextjs/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import clientPromise from "@/lib/mongodb";
import path from "path";

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

  const body = await req.json();
  const { filename, contentType } = body;

  if (!filename || !contentType) {
    return Response.json({ error: "filename and contentType are required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account) {
    return Response.json({ error: "Account not found" }, { status: 404 });
  }

  const ext = path.extname(filename);
  const timestamp = Date.now();
  const key = `asds/content/${account._id.toString()}/${timestamp}${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  const s3Url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  return Response.json({ uploadUrl, s3Url });
}
