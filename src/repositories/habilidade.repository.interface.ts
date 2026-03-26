import { HabilidadeBNCC } from "../entities/habilidadeBNCC.entity";

export interface IHabilidadeRepository {
    buscarPorCodigo(codigo: string): Promise<HabilidadeBNCC | null>;

    // Busca para popular os Selects do Front-end
    buscarFiltrosDisponiveis(): Promise<{ anos: number[], materias: { id: number, nome: string }[] }>;
    
    // Listagem paginada e filtrada para a seleção do professor
    listarComFiltros(params: { 
        busca?: string, 
        materiaId?: number, 
        anoEscolar?: number, 
        pagina: number, 
        limite: number 
    }): Promise<{ habilidades: HabilidadeBNCC[], total: number }>;
}