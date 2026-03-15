import { IMateria } from "../entities/interfaces/IMateria";

export interface IMateriaRepository {
    cadastrarMateria(dados: IMateria): Promise<IMateria | null>
    buscarTodasMaterias(): Promise<IMateria[] | []>
    buscarMateriaPorID(id: number): Promise<IMateria | null>;
    alterarMateria(dados: IMateria, id: number): Promise<IMateria | null>;
}