import { ChatRepository } from "../../../repositories/pg/chat.repository";
import { BuscarHistoricoUseCase } from "../buscarHistorico";

export async function fabricaBuscarHistoricoChronos() {
    return new BuscarHistoricoUseCase(new ChatRepository());
}