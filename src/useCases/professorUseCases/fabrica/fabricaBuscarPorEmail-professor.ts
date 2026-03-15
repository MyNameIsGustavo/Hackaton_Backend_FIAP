import { ProfessorRepository } from "../../../repositories/pg/professor.repository";
import { BuscarProfessorPorEmailUseCase } from "../buscarPorEmail";

export async function fabricaBuscarProfessorPorEmail() {
    return new BuscarProfessorPorEmailUseCase(new ProfessorRepository());
}