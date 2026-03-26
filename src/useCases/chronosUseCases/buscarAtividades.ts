import { IAtividadeRepository } from "../../repositories/atividade.repository.interface";
import { AtividadeComplementar } from "../../entities/atividadeComplementar.entity";

export class BuscarAtividadesUseCase {
    constructor(private atividadeRepository: IAtividadeRepository) {}

    async processar(aulaId: number): Promise<AtividadeComplementar[]> {
        return await this.atividadeRepository.buscarAtividadesPorPlanoAula(aulaId);
    }
}
