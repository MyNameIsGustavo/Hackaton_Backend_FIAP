import { ProfessorRepository } from "../../../repositories/pg/professor.repository";
import { LoginProfessorUseCase } from "../login";

export async function fabricaLoginProfessor() {
    return new LoginProfessorUseCase(new ProfessorRepository());
}