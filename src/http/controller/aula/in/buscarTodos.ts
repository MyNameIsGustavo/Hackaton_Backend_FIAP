import type { Request, Response } from 'express';
import { fabricaBuscarTodasAulas } from '../../../../useCases/aulaUseCases/fabrica/fabricaBuscarTodos-aula';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const objFabricaBuscarTodasAulas = await fabricaBuscarTodasAulas();

        const resultadoProcessado = await objFabricaBuscarTodasAulas.processar();

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar de todas aulas: ${error}`);
    }
}