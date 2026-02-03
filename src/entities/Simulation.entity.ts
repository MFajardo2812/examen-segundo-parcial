import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { SimulationProduct } from "./SimulationProduct.entity";
import { numericTransformer } from "../utils/numericTransformer";

@Entity({ name: "simulaciones" })
export class Simulation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "usuario_id", type: "uuid" })
  usuarioId!: string;

  @CreateDateColumn({ name: "fecha_simulacion", type: "timestamp" })
  fechaSimulacion!: Date;

  @Column({
    name: "capital_disponible",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  capitalDisponible!: number;

  @Column({
    name: "costo_total",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  costoTotal!: number;

  @Column({
    name: "capital_restante",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  capitalRestante!: number;

  @Column({
    name: "ganancia_total",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  gananciaTotal!: number;

  @Column({
    name: "retorno_total_porcentaje",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  retornoTotalPorcentaje!: number;

  @Column({
    name: "eficiencia_capital",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  eficienciaCapital!: number;

  @Column({
    name: "riesgo_total",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
    default: 0
  })
  riesgoTotal!: number;

  @Column({ type: "text" })
  mensaje!: string;

  @OneToMany(() => SimulationProduct, (sp) => sp.simulacion, { cascade: true })
  productosDetalle!: SimulationProduct[];
}
