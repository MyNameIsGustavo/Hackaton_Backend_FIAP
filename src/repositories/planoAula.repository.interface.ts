import { PlanoAula } from "../entities/planoAula.entity";

export interface IPlanoAulaRepository {
    cadastrarPlano(dados: any): Promise<PlanoAula | null>;

    buscarPlanosPorProfessor(
        professorId: number, 
        pagina: number, 
        limite: number, 
        termoBusca?: string
    ): Promise<{ planos: PlanoAula[], total: number }>;
}