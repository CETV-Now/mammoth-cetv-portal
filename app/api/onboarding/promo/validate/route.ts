import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { code } = await req.json();
  if (!code || typeof code !== "string") {
    return Response.json({ error: "code is required" }, { status: 400 });
  }

  const normalizedCode = code.trim().toUpperCase();

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const promoCode = await db.collection("promo_codes").findOne({
    code: normalizedCode,
    status: "active",
  });

  if (!promoCode) {
    return Response.json({ valid: false, error: "Invalid or unavailable promo code" }, { status: 200 });
  }

  return Response.json({ valid: true, promoCodeId: promoCode._id.toString(), type: promoCode.type });
}
