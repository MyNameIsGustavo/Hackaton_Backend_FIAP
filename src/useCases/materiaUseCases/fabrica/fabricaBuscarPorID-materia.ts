import { MateriaRepository } from "../../../repositories/pg/materia.repository";
import { BuscarMateriaPorIDUseCase } from "../buscarPorID";

export async function fabricaBuscarMateriaPorID() {
    return new BuscarMateriaPorIDUseCase(new MateriaRepository());
}