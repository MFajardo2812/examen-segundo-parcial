import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { FinancialProduct } from "../entities/FinancialProduct.entity";

export class ProductRepository {
  private repo: Repository<FinancialProduct>;

  constructor() {
    this.repo = AppDataSource.getRepository(FinancialProduct);
  }

  findActive() {
    return this.repo.find({ where: { activo: true }, order: { nombre: "ASC" } });
  }
}
