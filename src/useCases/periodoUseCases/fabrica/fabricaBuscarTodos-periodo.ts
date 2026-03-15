import { PeriodoRepository } from "../../../repositories/pg/periodo.repository";
import { BuscarTodosPeriodosUseCase } from "../buscarTodos";

export async function fabricaBuscarTodosPeriodos() {
    return new BuscarTodosPeriodosUseCase(new PeriodoRepository());
}