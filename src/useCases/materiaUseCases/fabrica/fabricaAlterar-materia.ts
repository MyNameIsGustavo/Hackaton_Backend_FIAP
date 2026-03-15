import { MateriaRepository } from "../../../repositories/pg/materia.repository";
import { AlterarMateriaUseCase } from "../alterar";

export async function fabricaAlterarMateria() {
    return new AlterarMateriaUseCase(new MateriaRepository());
}