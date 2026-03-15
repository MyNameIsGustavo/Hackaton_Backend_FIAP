import type { Request, Response } from 'express';
import { fabricaBuscarTodasTurmas } from '../../../../useCases/turmaUseCases/fabrica/fabricaBuscarTodos-turma';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const objFabricaBuscarTodasTurmas = await fabricaBuscarTodasTurmas();

        const resultadoProcessado = await objFabricaBuscarTodasTurmas.processar();

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar todas turmas: ${error}`);
    }
}