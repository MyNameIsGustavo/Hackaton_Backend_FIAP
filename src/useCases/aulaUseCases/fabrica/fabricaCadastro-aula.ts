import { AulaRepository } from "../../../repositories/pg/aula.repository";
import { CadastroAulaUseCase } from "../cadastro";

export async function fabricaCadastroAula() {
    return new CadastroAulaUseCase(new AulaRepository());
}