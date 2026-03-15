import { IMateria } from "../entities/interfaces/IMateria";

export interface IMateriaRepository {
    cadastrarMateria(dados: IMateria): Promise<IMateria | null>
    buscarTodasMaterias(): Promise<IMateria[] | []>
    buscarMateriaPorID(id: number): Promise<IMateria | null>;
    alterarMateria(dados: Omit<IMateria, "dataCadastro">, id: number): Promise<IMateria | null>;
}