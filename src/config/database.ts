import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import { FinancialProduct } from "../entities/FinancialProduct.entity";
import { Simulation } from "../entities/Simulation.entity";
import { SimulationProduct } from "../entities/SimulationProduct.entity";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "admin123",
  database: process.env.DB_NAME || "andesfin_db",
  synchronize: false, 
  logging: false,
  entities: [User, FinancialProduct, Simulation, SimulationProduct]
});

