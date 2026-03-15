import { ProfessorRepository } from "../../../repositories/pg/professor.repository";
import { CadastroProfessorUseCase } from "../cadastro";

export async function fabricaCadastroProfessor() {
    return new CadastroProfessorUseCase(new ProfessorRepository());
}