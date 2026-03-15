import { AulaRepository } from "../../../repositories/pg/aula.repository";
import { BuscarTodasAulasUseCase } from "../buscarTodos";

export async function fabricaBuscarTodasAulas() {
    return new BuscarTodasAulasUseCase(new AulaRepository());
}