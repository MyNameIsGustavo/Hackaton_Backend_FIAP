import { MateriaRepository } from "../../../repositories/pg/materia.repository";
import { BuscarTodasMateriasUseCase } from "../buscarTodos";

export async function fabricaBuscarTodasMateria() {
    return new BuscarTodasMateriasUseCase(new MateriaRepository());
}