import { HabilidadeRepository } from "../../../repositories/pg/habilidade.repository";
import { AtividadeRepository } from "../../../repositories/pg/atividade.repository";
import { GerarAtividadeUseCase } from "../gerarAtividade";

export async function fabricaGerarAtividadeChronos() {
    return new GerarAtividadeUseCase(
        new HabilidadeRepository(),
        new AtividadeRepository()
    );
}
