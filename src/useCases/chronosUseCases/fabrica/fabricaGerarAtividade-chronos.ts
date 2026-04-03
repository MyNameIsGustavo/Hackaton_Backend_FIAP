import { HabilidadeRepository } from "../../../repositories/pg/habilidade.repository";
import { AtividadeRepository } from "../../../repositories/pg/atividade.repository";
import { PlanoAulaRepository } from "../../../repositories/pg/planoAula.repository";
import { ChatRepository } from "../../../repositories/pg/chat.repository";
import { GerarAtividadeUseCase } from "../gerarAtividade";

export async function fabricaGerarAtividadeChronos() {
    return new GerarAtividadeUseCase(
        new HabilidadeRepository(),
        new AtividadeRepository(),
        new PlanoAulaRepository(),
        new ChatRepository()
    );
}
