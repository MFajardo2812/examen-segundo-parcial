import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./config/database";
import { createApp } from "./app";

async function main() {
  await AppDataSource.initialize();

  const app = createApp();
  const port = Number(process.env.PORT || 3000);

  app.listen(port, () => {
    console.log(`✅ API corriendo en http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error("❌ Error al iniciar:", err);
  process.exit(1);
});
