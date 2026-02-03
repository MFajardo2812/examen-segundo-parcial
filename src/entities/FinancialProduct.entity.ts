import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { numericTransformer } from "../utils/numericTransformer";

@Entity({ name: "productos_financieros" })
export class FinancialProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  nombre!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  costo!: number;

  @Column({
    name: "porcentaje_retorno",
    type: "numeric",
    precision: 5,
    scale: 2,
    transformer: numericTransformer
  })
  porcentajeRetorno!: number;

  @Column({ type: "boolean", default: true })
  activo!: boolean;
}