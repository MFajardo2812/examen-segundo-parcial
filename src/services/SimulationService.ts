import {
  SimulationInsufficientFundsError,
  SimulationRequestDto,
  SimulationResponseDto
} from "../dtos/SimulationDto";
import { SimulationRepository } from "../repositories/SimulationRepository";
import { Simulation } from "../entities/Simulation.entity";
import { SimulationProduct } from "../entities/SimulationProduct.entity";

/**
 * Knapsack 0/1 (max ganancia) usando DP esparso por suma de costos (en centavos).
 */
function optimizeSelection(input: {
  capital: number;
  items: Array<{
    nombre: string;
    precio: number;
    porcentajeGanancia: number;
    riesgo: number;
  }>;
}) {
  const capCents = Math.round(input.capital * 100);

  const items = input.items.map((it) => {
    const priceCents = Math.round(it.precio * 100);
    const gain = Number((it.precio * (it.porcentajeGanancia / 100)).toFixed(2));
    const gainCents = Math.round(gain * 100);
    return { ...it, priceCents, gain, gainCents };
  });

  // dp[cost] = { gainCents, chosenIndices }
  const dp = new Map<number, { gainCents: number; chosen: number[] }>();
  dp.set(0, { gainCents: 0, chosen: [] });

  items.forEach((item, idx) => {
    const snapshot = Array.from(dp.entries());
    for (const [cost, state] of snapshot) {
      const newCost = cost + item.priceCents;
      if (newCost > capCents) continue;

      const newGain = state.gainCents + item.gainCents;
      const existing = dp.get(newCost);

      if (!existing || newGain > existing.gainCents) {
        dp.set(newCost, { gainCents: newGain, chosen: [...state.chosen, idx] });
      }
    }
  });

  // Escoger mejor por ganancia; si empata, usa mayor costo (más eficiencia capital)
  let bestCost = 0;
  let bestState = dp.get(0)!;

  for (const [cost, state] of dp.entries()) {
    if (
      state.gainCents > bestState.gainCents ||
      (state.gainCents === bestState.gainCents && cost > bestCost)
    ) {
      bestCost = cost;
      bestState = state;
    }
  }

  const chosenIdx = new Set(bestState.chosen);
  const selected = items.filter((_, i) => chosenIdx.has(i));

  const costoTotal = Number((bestCost / 100).toFixed(2));
  const gananciaTotal = Number((bestState.gainCents / 100).toFixed(2));
  const capitalRestante = Number((input.capital - costoTotal).toFixed(2));

  const retornoTotalPorcentaje =
    costoTotal > 0 ? Number(((gananciaTotal / costoTotal) * 100).toFixed(2)) : 0;

  const eficienciaCapital =
    input.capital > 0 ? Number(((costoTotal / input.capital) * 100).toFixed(2)) : 0;

  // Riesgo agregado simple (suma), para visibilidad como pide el contexto
  const riesgoTotal = Number(selected.reduce((acc, s) => acc + s.riesgo, 0).toFixed(2));

  return {
    selected,
    allEvaluated: items,
    costoTotal,
    gananciaTotal,
    capitalRestante,
    retornoTotalPorcentaje,
    eficienciaCapital,
    riesgoTotal
  };
}

export class SimulationService {
  constructor(private readonly repo = new SimulationRepository()) {}

  async simulate(
    body: SimulationRequestDto
  ): Promise<SimulationResponseDto | SimulationInsufficientFundsError> {
    const usuarioId = body.usuario_id;
    const capital = Number(body.capital_disponible);

    if (!usuarioId || !capital || !Array.isArray(body.productos)) {
      throw new Error("Body inválido. Debe incluir usuario_id, capital_disponible y productos.");
    }

    const candidates = body.productos.map((p) => ({
      nombre: String(p.nombre),
      precio: Number(p.precio),
      porcentajeGanancia: Number(p.porcentaje_ganancia),
      riesgo: p.riesgo !== undefined ? Number(p.riesgo) : 0
    }));

    const positivePriced = candidates.filter((c) => c.precio > 0);
    const minPrice = positivePriced.length
      ? Math.min(...positivePriced.map((c) => c.precio))
      : 0;

    // Caso “Fondos insuficientes” como EJEMPLO 3 
    if (positivePriced.length > 0 && minPrice > capital) {
      const diferencia = Number((minPrice - capital).toFixed(2));
      return {
        error: "Fondos insuficientes",
        detalle: `El capital disponible ($${capital.toFixed(
          2
        )}) es insuficiente para adquirir cualquier producto de la lista.`,
        capital_disponible: Number(capital.toFixed(2)),
        producto_mas_barato: Number(minPrice.toFixed(2)),
        diferencia_necesaria: diferencia,
        recomendacion: "Aumente su capital o consulte productos con menor inversión mínima."
      };
    }

    const opt = optimizeSelection({
      capital,
      items: candidates
    });

    const mensaje =
      opt.gananciaTotal <= 0
        ? "Simulación con ganancias mínimas. Considere aumentar capital para mejores opciones."
        : opt.eficienciaCapital >= 90
          ? `Simulación óptima con alta eficiencia de capital (${opt.eficienciaCapital}% utilizado)`
          : "Simulación exitosa con ganancias óptimas";

    // Persistencia de simulación + detalle evaluado/seleccionado
    const sim = new Simulation();
    sim.usuarioId = usuarioId;
    sim.capitalDisponible = Number(capital.toFixed(2));
    sim.costoTotal = opt.costoTotal;
    sim.capitalRestante = opt.capitalRestante;
    sim.gananciaTotal = opt.gananciaTotal;
    sim.retornoTotalPorcentaje = opt.retornoTotalPorcentaje;
    sim.eficienciaCapital = opt.eficienciaCapital;
    sim.riesgoTotal = opt.riesgoTotal;
    sim.mensaje = mensaje;

    const selectedNames = new Set(opt.selected.map((s) => s.nombre));

    const detail: SimulationProduct[] = opt.allEvaluated.map((it) => {
      const sp = new SimulationProduct();
      sp.nombre = it.nombre;
      sp.precio = Number(it.precio.toFixed(2));
      sp.porcentajeGanancia = Number(it.porcentajeGanancia.toFixed(2));
      sp.riesgo = Number(it.riesgo.toFixed(2));
      sp.gananciaEsperada = Number(it.gain.toFixed(2));
      sp.retornoIndividualPorcentaje = Number(it.porcentajeGanancia.toFixed(2));
      sp.seleccionado = selectedNames.has(it.nombre);
      return sp;
    });

    const saved = await this.repo.saveSimulation(sim, detail);

    const productosSeleccionados = detail
      .filter((d) => d.seleccionado)
      .map((d) => ({
        nombre: d.nombre,
        precio: d.precio,
        porcentaje_ganancia: d.porcentajeGanancia,
        riesgo: d.riesgo,
        ganancia_esperada: d.gananciaEsperada
      }));

    return {
      id: saved.id,
      usuario_id: saved.usuarioId,
      fecha_simulacion: saved.fechaSimulacion.toISOString(),
      capital_disponible: saved.capitalDisponible,
      productos_seleccionados: productosSeleccionados,
      costo_total: saved.costoTotal,
      capital_restante: saved.capitalRestante,
      ganancia_total: saved.gananciaTotal,
      retorno_total_porcentaje: saved.retornoTotalPorcentaje,
      eficiencia_capital: saved.eficienciaCapital,
      riesgo_total: saved.riesgoTotal,
      mensaje: saved.mensaje
    };
  }

  async historyByUser(usuarioId: string) {
    const sims = await this.repo.findByUser(usuarioId);

    const items = [];
    for (const s of sims) {
      const count = await this.repo.countSelectedBySimulation(s.id);
      items.push({
        id: s.id,
        usuario_id: s.usuarioId,
        fecha_simulacion: s.fechaSimulacion.toISOString(),
        capital_disponible: s.capitalDisponible,
        ganancia_total: s.gananciaTotal,
        cantidad_productos: count,
        retorno_porcentaje: s.retornoTotalPorcentaje
      });
    }
    return items;
  }
}
