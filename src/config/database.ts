import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Patient } from "../entities/Patient.entity";
import { Doctor } from "../entities/Doctor.entity";

config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC === "true",
  logging: true,
  entities: [Patient, Doctor],
});
