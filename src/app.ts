import express from "express";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import simulationRoutes from "./routes/simulationRoutes";
import { openApiSpec } from "./config/swagger";
import { errorHandler } from "./middlewares/errorHandler";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

  app.use("/usuarios", userRoutes);
  app.use("/productos", productRoutes);
  app.use("/simulaciones", simulationRoutes);

  app.use(errorHandler);
  return app;
}
