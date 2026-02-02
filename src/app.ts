import "reflect-metadata";
import express from "express";
import { config } from "dotenv";
import { AppDataSource } from "./config/database";
import patientRoutes from "./routes/patientRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import { specs, swaggerUi } from "./config/swagger";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conectar a base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((error) => {
    console.error("❌ Error connecting to database:", error);
    process.exit(1);
  });

// Rutas
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Swagger docs: http://localhost:${PORT}/api-docs`);
});
