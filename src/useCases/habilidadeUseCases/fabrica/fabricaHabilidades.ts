import { HabilidadeRepository } from "../../../repositories/pg/habilidade.repository";
import { BuscarHabilidadesUseCase } from "../buscarHabilidades";
import { ObterFiltrosHabilidadeUseCase } from "../obterFiltros";

const repo = new HabilidadeRepository();

export async function fabricaBuscarHabilidades() { return new BuscarHabilidadesUseCase(repo); }
export async function fabricaObterFiltrosHabilidade() { return new ObterFiltrosHabilidadeUseCase(repo); }