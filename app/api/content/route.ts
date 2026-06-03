import { auth } from "@clerk/nextjs/server";
import { tasks } from "@trigger.dev/sdk";
import { ObjectId } from "mongodb";
import sharp from "sharp";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") === "archived" ? "archived" : "active";

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

  const items = await db
    .collection("content")
    .find({ account_id: account._id, status, type: { $ne: "layout_content" } })
    .sort({ created_at: -1 })
    .toArray();

  const serialized = items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    account_id: item.account_id.toString(),
    created_at: item.created_at?.toISOString() ?? null,
    updated_at: item.updated_at?.toISOString() ?? null,
  }));

  return Response.json(serialized);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, url, mimeType, runtime, type: contentType = "promotion", is16_9 } = body;

  if (!name || !url || !mimeType) {
    return Response.json({ error: "name, url, and mimeType are required" }, { status: 400 });
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

  const now = new Date();

  let bgColor: string | null = null;
  if (mimeType.startsWith("image/")) {
    try {
      const imgRes = await fetch(url);
      const buffer = Buffer.from(await imgRes.arrayBuffer());
      const { data } = await sharp(buffer)
        .resize(1, 1)
        .raw()
        .toBuffer({ resolveWithObject: true });
      const luminance = (0.2126 * data[0] + 0.7152 * data[1] + 0.0722 * data[2]) / 255;
      bgColor = luminance > 0.5 ? "#ffffff" : "#000000";
    } catch (err) {
      console.error("[bg_color] color extraction failed:", err);
    }
  }

  const result = await db.collection("content").insertOne({
    account_id: account._id,
    type: contentType,
    status: "active",
    name,
    url,
    mime_type: mimeType,
    partner: "CETV",
    total_plays: 0,
    runtime: typeof runtime === "number" ? runtime : parseInt(runtime, 10),
    transcoding_required: mimeType === "video/mp4",
    transcoded: false,
    ...(typeof is16_9 === "boolean" && { is_16_9: is16_9 }),
    ...(bgColor && { bg_color: bgColor }),
    created_at: now,
    updated_at: now,
  });

  if (mimeType === "video/mp4") {
    try {
      await tasks.trigger("transcode-user-content", { id: result.insertedId.toString() });
    } catch (err) {
      console.error("[transcode-user-content] trigger failed:", err);
    }
  }

  const isVideo = mimeType === "video/mp4";

  return Response.json({
    _id: result.insertedId.toString(),
    account_id: account._id.toString(),
    name,
    url,
    mime_type: mimeType,
    runtime,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
    transcoding_required: isVideo,
    transcoded: false,
    transcoding_error: false,
    ...(typeof is16_9 === "boolean" && { is_16_9: is16_9 }),
  });
}
