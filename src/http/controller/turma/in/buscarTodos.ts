import type { Request, Response } from 'express';
import { fabricaBuscarTodasTurmas } from '../../../../useCases/turmaUseCases/fabrica/fabricaBuscarTodos-turma';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const { turmas, pagina, limite, ordenaPor, ordem } = request.query;

        const objFabricaBuscarTodasTurmas = await fabricaBuscarTodasTurmas();

        const resultadoProcessado = await objFabricaBuscarTodasTurmas.processar({
            nomeTurma: typeof turmas === "string" ? turmas : undefined,
            pagina: Number(pagina) || 1,
            limite: Number(limite) || 10,
            ordenaPor: typeof ordenaPor === "string" ? ordenaPor : "nome",
            ordem: ordem === "desc" ? "desc" : "asc"
        });

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar todas turmas: ${error}`);
    }
}