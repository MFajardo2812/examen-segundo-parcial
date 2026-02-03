import { ProductRepository } from "../repositories/ProductRepository";
import { ProductDto } from "../dtos/ProductDto";

export class ProductService {
  constructor(private readonly repo = new ProductRepository()) {}

  async listActiveProducts(): Promise<ProductDto[]> {
    const items = await this.repo.findActive();
    return items.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      costo: p.costo,
      porcentaje_retorno: p.porcentajeRetorno,
      activo: p.activo
    }));
  }
}
