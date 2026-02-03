import { UserRepository } from "../repositories/UserRepository";
import { UserDto } from "../dtos/UserDto";

export class UserService {
  constructor(private readonly repo = new UserRepository()) {}

  async listUsers(): Promise<UserDto[]> {
    const users = await this.repo.findAll();
    return users.map((u) => ({
      id: u.id,
      nombre: u.nombre,
      email: u.email,
      capital_disponible: u.capitalDisponible
    }));
  }
}
