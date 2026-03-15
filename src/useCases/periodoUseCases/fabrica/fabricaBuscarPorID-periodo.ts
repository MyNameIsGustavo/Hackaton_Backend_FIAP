import { PeriodoRepository } from "../../../repositories/pg/periodo.repository";
import { BuscarPeriodoPorIDUseCase } from "../buscarPorID";

export async function fabricaBuscarPeriodoPorID() {
    return new BuscarPeriodoPorIDUseCase(new PeriodoRepository());
}