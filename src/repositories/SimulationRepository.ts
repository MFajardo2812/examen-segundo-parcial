import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Simulation } from "../entities/Simulation.entity";
import { SimulationProduct } from "../entities/SimulationProduct.entity";

export class SimulationRepository {
  private simRepo: Repository<Simulation>;
  private prodRepo: Repository<SimulationProduct>;

  constructor() {
    this.simRepo = AppDataSource.getRepository(Simulation);
    this.prodRepo = AppDataSource.getRepository(SimulationProduct);
  }

  async saveSimulation(simulation: Simulation, detail: SimulationProduct[]) {
    simulation.productosDetalle = detail;
    return this.simRepo.save(simulation);
  }

  async findByUser(usuarioId: string) {
    return this.simRepo.find({
      where: { usuarioId },
      order: { fechaSimulacion: "DESC" }
    });
  }

  async countSelectedBySimulation(simulacionId: string) {
    return this.prodRepo.count({
      where: { simulacionId, seleccionado: true }
    });
  }
}
