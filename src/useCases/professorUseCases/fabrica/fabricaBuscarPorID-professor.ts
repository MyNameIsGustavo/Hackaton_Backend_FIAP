import { ProfessorRepository } from "../../../repositories/pg/professor.repository";
import { BuscarProfessorPorIDUseCase } from "../buscarPorID";

export async function fabricaBuscarProfessorPorID() {
    return new BuscarProfessorPorIDUseCase(new ProfessorRepository());
}