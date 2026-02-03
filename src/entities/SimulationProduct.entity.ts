import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from "typeorm";
import { Simulation } from "./Simulation.entity";
import { numericTransformer } from "../utils/numericTransformer";

@Entity({ name: "simulacion_productos" })
export class SimulationProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "simulacion_id", type: "uuid" })
  simulacionId!: string;

  @ManyToOne(() => Simulation, (s) => s.productosDetalle, { onDelete: "CASCADE" })
  @JoinColumn({ name: "simulacion_id" })
  simulacion!: Simulation;

  @Column({ type: "varchar", length: 255 })
  nombre!: string;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  precio!: number;

  @Column({
    name: "porcentaje_ganancia",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  porcentajeGanancia!: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
    default: 0
  })
  riesgo!: number;

  @Column({
    name: "ganancia_esperada",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  gananciaEsperada!: number;

  @Column({
    name: "retorno_individual_porcentaje",
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer
  })
  retornoIndividualPorcentaje!: number;

  @Column({ type: "boolean", default: false })
  seleccionado!: boolean;
}
