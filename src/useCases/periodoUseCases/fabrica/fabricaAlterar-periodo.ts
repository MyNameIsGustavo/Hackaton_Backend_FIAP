import { PeriodoRepository } from "../../../repositories/pg/periodo.repository";
import { AlterarPeriodoUseCase } from "../alterar";

export async function fabricaAlterarPeriodo() {
    return new AlterarPeriodoUseCase(new PeriodoRepository());
}