import { ChatRepository } from "../../../repositories/pg/chat.repository";
import { BuscarTodasConversasUseCase } from "../buscarTodasConversas";

export async function fabricaBuscarTodasConversasChronos() {
    return new BuscarTodasConversasUseCase(new ChatRepository());
}