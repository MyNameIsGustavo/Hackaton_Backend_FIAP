import type { Request, Response } from 'express';
import { fabricaBuscarTodasAulas } from '../../../../useCases/aulaUseCases/fabrica/fabricaBuscarTodos-aula';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const { aulas, pagina, limite, ordenaPor, ordem } = request.query;

        const objFabricaBuscarTodasAulas = await fabricaBuscarTodasAulas();

        const resultadoProcessado = await objFabricaBuscarTodasAulas.processar({
            nomeAula: typeof aulas === "string" ? aulas : undefined,
            pagina: Number(pagina) || 1,
            limite: Number(limite) || 10,
            ordenaPor: typeof ordenaPor === "string" ? ordenaPor : "nome",
            ordem: ordem === "desc" ? "desc" : "asc"
        });

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar de todas aulas: ${error}`);
    }
}