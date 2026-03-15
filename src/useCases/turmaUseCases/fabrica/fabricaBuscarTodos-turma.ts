import { TurmaRepository } from "../../../repositories/pg/turma.repository";
import { BuscarTodasTurmasUseCase } from "../buscarTodos";

export async function fabricaBuscarTodasTurmas() {
    return new BuscarTodasTurmasUseCase(new TurmaRepository());
}