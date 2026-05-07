import type { Db } from "mongodb";

const MAX_ATTEMPTS = 5;

export async function generateInstallCode(db: Db): Promise<string> {
  const screens = db.collection("screens");

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    const exists = await screens.findOne({ installCode: code }, { projection: { _id: 1 } });
    if (!exists) return code;
  }

  throw new Error("Failed to generate a unique install code after maximum attempts");
}
