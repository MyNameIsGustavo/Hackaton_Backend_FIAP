import type { IAulaRepository } from "../../repositories/aula.repository.interface";
import { IAula } from "../../entities/interfaces/IAula";

export class BuscarTodasAulasUseCase {
    constructor(private aulaRepository: IAulaRepository) { }

    async processar(): Promise<IAula[] | []> {
        return await this.aulaRepository.buscarTodasAulas();
    }
}