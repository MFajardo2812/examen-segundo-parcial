import { Request, Response } from "express";
import { SimulationService } from "../services/SimulationService";

export class SimulationController {
  constructor(private readonly service = new SimulationService()) {}

  create = async (req: Request, res: Response) => {
    const result = await this.service.simulate(req.body);
    // Fondos insuficientes (error “controlado”)
    if ("error" in result) return res.status(400).json(result);
    return res.json(result);
  };

  byUser = async (req: Request, res: Response) => {
    const  usuarioId  = String(req.params.usuarioId);
    const list = await this.service.historyByUser(usuarioId);
    res.json(list);
  };
}
