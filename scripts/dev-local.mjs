import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { MongoMemoryServer } from "mongodb-memory-server";

const dbPath = resolve(process.env.KALENDLY_LOCAL_DB_PATH ?? ".data/mongo");
mkdirSync(dbPath, { recursive: true });

const mongod = await MongoMemoryServer.create({
  instance: {
    dbPath,
    storageEngine: "wiredTiger",
  },
});

const appEnv = {
  ...process.env,
  MONGODB_URI: mongod.getUri(),
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "kalendly-local-development-secret",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "admin@local.test",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? "kalendly-demo",
  APP_URL: process.env.APP_URL ?? "http://localhost:3000",
  COMPOSIO_API_KEY: process.env.COMPOSIO_API_KEY ?? "local-development-placeholder",
};

const command = process.platform === "win32" ? "npm.cmd" : "npm";
const app = spawn(command, ["run", "dev", "--", "--hostname", "0.0.0.0"], {
  env: appEnv,
  stdio: "inherit",
});

const shutdown = async (signal) => {
  app.kill(signal);
  await mongod.stop();
  process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
app.on("exit", async (code, signal) => {
  await mongod.stop();
  process.exit(code ?? (signal ? 1 : 0));
});
