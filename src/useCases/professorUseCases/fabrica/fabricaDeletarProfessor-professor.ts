import { ProfessorRepository } from "../../../repositories/pg/professor.repository";
import { DeletarProfessorUseCase } from "../deletar";

export async function fabricaDeletarProfessor() {
    return new DeletarProfessorUseCase(new ProfessorRepository());
}