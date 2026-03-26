import { IHabilidadeRepository } from "../../repositories/habilidade.repository.interface";

export class BuscarHabilidadesUseCase {
    constructor(private repo: IHabilidadeRepository) {}
    async processar(params: any) { return await this.repo.listarComFiltros(params); }
}