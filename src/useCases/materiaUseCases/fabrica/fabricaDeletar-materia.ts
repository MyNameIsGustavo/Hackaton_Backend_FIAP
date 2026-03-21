import { MateriaRepository } from "../../../repositories/pg/materia.repository";
import { DeletarMateriaUseCase } from "../deletar";

export async function fabricaDeletarMateria() {
    return new DeletarMateriaUseCase(new MateriaRepository());
}