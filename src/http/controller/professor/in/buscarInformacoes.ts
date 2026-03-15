import type { Request, Response } from 'express';
import { fabricaBuscarProfessorPorID } from '../../../../useCases/professorUseCases/fabrica/fabricaBuscarPorID-professor';

export async function buscarInformacoes(request: Request, response: Response) {
    try {
        const usuarioId = (request as any).usuario.id;

        const objFabricaBuscarPorIDProfessor = await fabricaBuscarProfessorPorID();

        const resultadoProcessado = await objFabricaBuscarPorIDProfessor.processar(usuarioId);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID do professor: ${error}`);
    }
}