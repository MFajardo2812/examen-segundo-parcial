export type SimulationCandidateDto = {
  nombre: string;
  precio: number;
  porcentaje_ganancia: number;
  riesgo?: number; 
};

export type SimulationRequestDto = {
  usuario_id: string;
  capital_disponible: number;
  productos: SimulationCandidateDto[];
};

export type SimulationSelectedProductDto = {
  nombre: string;
  precio: number;
  porcentaje_ganancia: number;
  riesgo: number;
  ganancia_esperada: number;
};

export type SimulationResponseDto = {
  id: string;
  usuario_id: string;
  fecha_simulacion: string;
  capital_disponible: number;
  productos_seleccionados: SimulationSelectedProductDto[];
  costo_total: number;
  capital_restante: number;
  ganancia_total: number;
  retorno_total_porcentaje: number;
  eficiencia_capital: number;
  riesgo_total: number;
  mensaje: string;
};

export type SimulationHistoryItemDto = {
  id: string;
  usuario_id: string;
  fecha_simulacion: string;
  capital_disponible: number;
  ganancia_total: number;
  cantidad_productos: number;
  retorno_porcentaje: number;
};

export type SimulationInsufficientFundsError = {
  error: "Fondos insuficientes";
  detalle: string;
  capital_disponible: number;
  producto_mas_barato: number;
  diferencia_necesaria: number;
  recomendacion: string;
};
