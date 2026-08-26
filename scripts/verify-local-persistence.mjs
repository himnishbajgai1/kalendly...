import { readFileSync } from "node:fs";
import { MongoClient } from "mongodb";

const uri = readFileSync(".data/mongo-uri", "utf8").trim();
const client = new MongoClient(uri);
await client.connect();
const collection = client.db("kalendly").collection("_local_persistence_check");
const marker = "local-persistence-check";
const mode = process.argv[2] ?? "write";
if (mode === "write") {
  await collection.updateOne({ marker }, { $set: { marker, createdAt: new Date() } }, { upsert: true });
  console.log("marker written");
} else {
  const found = Boolean(await collection.findOne({ marker }));
  console.log(found ? "marker found" : "marker missing");
  await collection.deleteOne({ marker });
  if (!found) process.exitCode = 1;
}
await client.close();
