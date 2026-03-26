import { IAula } from "./IAula"
import { IAvaliacao } from "./IAvaliacao"
import { IUnidadeTematica } from "./IUnidadeTematica"

export interface IMateria {
    nome: string
    areaConhecimento: string
    dataCadastro: Date
    isAtivo: boolean
    periodoId: number
}

export interface IMateriaComRelacoes extends IMateria {
    aulas: IAula[];
    avaliacaos: IAvaliacao[];
    unidadeTematicas: IUnidadeTematica[]
}