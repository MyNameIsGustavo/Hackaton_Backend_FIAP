import { AtividadeRepository } from "../../../repositories/pg/atividade.repository";
import { BuscarAtividadesUseCase } from "../buscarAtividades";

export async function fabricaBuscarAtividadesChronos() {
    return new BuscarAtividadesUseCase(new AtividadeRepository());
}
