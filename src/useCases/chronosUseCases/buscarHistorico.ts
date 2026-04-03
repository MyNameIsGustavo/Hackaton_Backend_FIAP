import { ChatRepository } from "../../repositories/pg/chat.repository";

export class BuscarHistoricoUseCase {
    constructor(private chatRepository: ChatRepository) {}

    async processar(aulaId: number, professorId: number, conversaId?: number) {
        const conversa = conversaId
            ? await this.chatRepository.buscarConversaPorId(conversaId, professorId, aulaId)
            : await this.chatRepository.buscarUltimaConversaPorProfessorEAula(aulaId, professorId)
                ?? await this.chatRepository.criarConversa(aulaId, professorId);
        const historico = await this.chatRepository.buscarHistorico(conversa.id);
        
        return {
            conversaId: conversa.id,
            historico
        };
    }
}
