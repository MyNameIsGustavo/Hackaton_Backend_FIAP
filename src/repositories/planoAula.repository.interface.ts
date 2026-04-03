import { PlanoAula } from "../entities/planoAula.entity";

export interface IPlanoAulaRepository {
    cadastrarPlano(dados: any): Promise<PlanoAula | null>;
    buscarPlanoPorAulaEProfessor(aulaId: number, professorId: number): Promise<PlanoAula | null>;
    validarProfessorNaAula(professorId: number, aulaId: number): Promise<void>;

    buscarPlanosPorProfessor(
        professorId: number, 
        pagina: number, 
        limite: number, 
        termoBusca?: string
    ): Promise<{ planos: PlanoAula[], total: number }>;
}
