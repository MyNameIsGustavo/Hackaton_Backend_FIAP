import { IPlanoAulaRepository } from "../../repositories/planoAula.repository.interface";

export class BuscarPlanosUseCase {
    constructor(private planoAulaRepository: IPlanoAulaRepository) { }

    async processar(professorId: number, pagina: number = 1, limite: number = 10, busca?: string) {
        return await this.planoAulaRepository.buscarPlanosPorProfessor(
            professorId, 
            pagina, 
            limite, 
            busca
        );
    }
}