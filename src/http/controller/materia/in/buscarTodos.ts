import type { Request, Response } from 'express';
import { fabricaBuscarTodasMateria } from '../../../../useCases/materiaUseCases/fabrica/fabricaBuscarTodos-materia';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const objFabricaBuscarTodasMaterias = await fabricaBuscarTodasMateria();

        const resultadoProcessado = await objFabricaBuscarTodasMaterias.processar();

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar de todas materias: ${error}`);
    }
}