import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

export class ProductController {
  constructor(private readonly service = new ProductService()) {}

  getActive = async (_req: Request, res: Response) => {
    const products = await this.service.listActiveProducts();
    res.json(products);
  };
}
