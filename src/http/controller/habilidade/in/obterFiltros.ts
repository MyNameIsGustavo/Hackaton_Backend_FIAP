// obterFiltros.ts
import { Request, Response } from 'express';
import { fabricaObterFiltrosHabilidade } from '../../../../useCases/habilidadeUseCases/fabrica/fabricaHabilidades';

export async function obterFiltros(req: Request, res: Response) {
    const useCase = await fabricaObterFiltrosHabilidade();
    const result = await useCase.processar();
    return res.status(200).json(result);
}