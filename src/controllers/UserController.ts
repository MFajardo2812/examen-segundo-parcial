import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private readonly service = new UserService()) {}

  getAll = async (_req: Request, res: Response) => {
    const users = await this.service.listUsers();
    res.json(users);
  };
}
