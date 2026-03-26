import { ChatRepository } from "../../repositories/pg/chat.repository";

export class BuscarHistoricoUseCase {
    constructor(private chatRepository: ChatRepository) {}

    async processar(aulaId: number) {
        // Garante que a conversa existe (ou cria uma vazia caso seja o primeiro acesso)
        const conversa = await this.chatRepository.buscarOuCriarConversa(aulaId);
        
        // Retorna as mensagens atreladas a esta conversa
        const historico = await this.chatRepository.buscarHistorico(conversa.id);
        
        return {
            conversaId: conversa.id,
            historico
        };
    }
}