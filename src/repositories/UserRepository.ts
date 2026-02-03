import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User.entity";

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  findAll() {
    return this.repo.find({ order: { nombre: "ASC" } });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
