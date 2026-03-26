import type { Request, Response } from 'express';
import { fabricaBuscarTodosPeriodos } from '../../../../useCases/periodoUseCases/fabrica/fabricaBuscarTodos-periodo';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const { periodo, pagina, limite, ordenaPor, ordem } = request.query;

        const objFabricaBuscarTodosPeriodos = await fabricaBuscarTodosPeriodos();

        const resultadoProcessado = await objFabricaBuscarTodosPeriodos.processar({
            nomePeriodo: typeof periodo === "string" ? periodo : undefined,
            pagina: Number(pagina) || 1,
            limite: Number(limite) || 10,
            ordenaPor: typeof ordenaPor === "string" ? ordenaPor : "nome",
            ordem: ordem === "desc" ? "desc" : "asc"
        });

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar todos periodos: ${error}`);
    }
}