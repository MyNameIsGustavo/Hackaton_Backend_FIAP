import { MateriaRepository } from "../../../repositories/pg/materia.repository";
import { CadastroMateriaUseCase } from "../cadastro";

export async function fabricaCadastroMateria() {
    return new CadastroMateriaUseCase(new MateriaRepository());
}