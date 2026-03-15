import type { Request, Response } from 'express';
import { fabricaBuscarTodosPeriodos } from '../../../../useCases/periodoUseCases/fabrica/fabricaBuscarTodos-periodo';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const objFabricaBuscarTodosPeriodos = await fabricaBuscarTodosPeriodos();

        const resultadoProcessado = await objFabricaBuscarTodosPeriodos.processar();

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar todos periodos: ${error}`);
    }
}