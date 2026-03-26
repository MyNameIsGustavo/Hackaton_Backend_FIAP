import { AtividadeComplementar } from "../entities/atividadeComplementar.entity";
import { IAtividadeComplementar } from "../entities/interfaces/IAtividadeComplementar";

export interface IAtividadeRepository {
    salvarAtividade(dados: IAtividadeComplementar): Promise<AtividadeComplementar | null>;
    buscarAtividadesPorPlanoAula(aulaId: number): Promise<AtividadeComplementar[]>;
}
