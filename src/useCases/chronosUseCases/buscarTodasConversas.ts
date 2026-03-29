import { ChatRepository } from "../../repositories/pg/chat.repository";

export class BuscarTodasConversasUseCase {
    constructor(private chatRepository: ChatRepository) {}

    async processar(professorId: number) {
        return await this.chatRepository.buscarTodasConversasPorProfessor(professorId);
    }
}