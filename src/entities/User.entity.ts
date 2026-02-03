import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { numericTransformer } from "../utils/numericTransformer";

@Entity({ name: "usuarios" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  nombre!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({
    name: "capital_disponible",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
    default: 0
  })
  capitalDisponible!: number;
}
