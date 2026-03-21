import { PeriodoRepository } from "../../../repositories/pg/periodo.repository";
import { DeletarPeriodoUseCase } from "../deletar";

export async function fabricaDeletarPeriodos() {
    return new DeletarPeriodoUseCase(new PeriodoRepository());
}