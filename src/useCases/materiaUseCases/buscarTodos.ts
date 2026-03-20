import type { IMateriaRepository } from "../../repositories/materia.repository.interface";
import { IMateria, IMateriaComRelacoes } from "../../entities/interfaces/IMateria";

type FiltroMateria = {
    nomeMateria?: string;
    pagina?: number;
    limite?: number;
    ordenaPor?: string;
    ordem?: "asc" | "desc"
};

export class BuscarTodasMateriasUseCase {
    constructor(private materiaRepository: IMateriaRepository) { }

    async processar(filtro?: FiltroMateria): Promise<IMateriaComRelacoes[]> {
        return await this.materiaRepository.buscarTodasMaterias(filtro);
    }
}