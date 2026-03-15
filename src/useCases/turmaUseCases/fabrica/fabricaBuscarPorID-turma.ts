import { TurmaRepository } from "../../../repositories/pg/turma.repository";
import { BuscarTurmaPorIDUseCase } from "../buscarPorID";

export async function fabricaBuscarTurmaPorID() {
    return new BuscarTurmaPorIDUseCase(new TurmaRepository());
}