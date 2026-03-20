import type { Request, Response } from 'express';
import { fabricaBuscarTodasMateria } from '../../../../useCases/materiaUseCases/fabrica/fabricaBuscarTodos-materia';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const { materia, pagina, limite, ordenaPor, ordem } = request.query;

        const objFabricaBuscarTodasMaterias = await fabricaBuscarTodasMateria();

        const resultadoProcessado = await objFabricaBuscarTodasMaterias.processar({
            nomeMateria: typeof materia === "string" ? materia : undefined,
            pagina: Number(pagina) || 1,
            limite: Number(limite) || 10,
            ordenaPor: typeof ordenaPor === "string" ? ordenaPor : "nome",
            ordem: ordem === "desc" ? "desc" : "asc"
        });

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar de todas materias: ${error}`);
    }
}