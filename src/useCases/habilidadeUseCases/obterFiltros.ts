import { IHabilidadeRepository } from "../../repositories/habilidade.repository.interface";

export class ObterFiltrosHabilidadeUseCase {
    constructor(private repo: IHabilidadeRepository) {}
    async processar() { return await this.repo.buscarFiltrosDisponiveis(); }
}