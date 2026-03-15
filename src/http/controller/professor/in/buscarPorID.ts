import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarProfessorPorID } from '../../../../useCases/professorUseCases/fabrica/fabricaBuscarPorID-professor';

export async function buscarPorID(request: Request, response: Response) {
    try {
        const buscarProfessorPorID = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaBuscarPorIDUsuario = await fabricaBuscarProfessorPorID();

        const resultadoValidacaoSchema = buscarProfessorPorID.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({ mensagem: 'ID deve ser número inteiro positivo', erros: resultadoValidacaoSchema.error, });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaBuscarPorIDUsuario.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID do professor: ${error}`);
    }
}