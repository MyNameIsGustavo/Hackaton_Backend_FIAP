import { IMateria, IMateriaComRelacoes } from "../entities/interfaces/IMateria";

export interface IMateriaRepository {
    cadastrarMateria(dados: IMateria): Promise<IMateria | null>
    buscarTodasMaterias(filtro?: { nomeMateria?: string; pagina?: number; limite?: number; ordenaPor?: string; ordem?: "asc" | "desc"; }): Promise<IMateriaComRelacoes[]>
    buscarMateriaPorID(id: number): Promise<IMateria | null>;
    alterarMateria(dados: Omit<IMateria, "dataCadastro">, id: number): Promise<IMateria | null>;
}