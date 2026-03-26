import { HabilidadeRepository } from "../../../repositories/pg/habilidade.repository";
import { PlanoAulaRepository } from "../../../repositories/pg/planoAula.repository";
import { GerarPlanoUseCase } from "../gerarPlano";

export async function fabricaGerarPlanoChronos() {
    return new GerarPlanoUseCase(
        new HabilidadeRepository(), 
        new PlanoAulaRepository()
    );
}