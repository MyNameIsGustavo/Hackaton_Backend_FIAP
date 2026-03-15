import { Materia } from "./materia.entity";
import { ObjetoConhecimento } from "./objetoConhecimento.entity";

export class UnidadeTematica {
    id: number;
    nome: string;

    materiaId: number;
    materia?: Materia;

    objetosConhecimento: ObjetoConhecimento[];

    constructor(
        id: number,
        nome: string,
        materiaId: number,
        objetosConhecimento: ObjetoConhecimento[] = [],
        materia?: Materia
    ) {
        this.id = id;
        this.nome = nome;
        this.materiaId = materiaId;
        this.objetosConhecimento = objetosConhecimento;
        this.materia = materia;
    }
}