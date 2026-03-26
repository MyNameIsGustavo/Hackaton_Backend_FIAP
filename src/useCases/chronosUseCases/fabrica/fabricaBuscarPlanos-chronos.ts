import { PlanoAulaRepository } from "../../../repositories/pg/planoAula.repository";
import { BuscarPlanosUseCase } from "../buscarPlanos";

export async function fabricaBuscarPlanosChronos() {
    return new BuscarPlanosUseCase(new PlanoAulaRepository());
}