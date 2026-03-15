import { PeriodoRepository } from "../../../repositories/pg/periodo.repository";
import { CadastroPeriodoUseCase } from "../cadastro";

export async function fabricaCadastroPeriodos() {
    return new CadastroPeriodoUseCase(new PeriodoRepository());
}