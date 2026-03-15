import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarMateriaPorID } from '../../../../useCases/materiaUseCases/fabrica/fabricaBuscarPorID-materia';

export async function buscarPorID(request: Request, response: Response) {
    try {
        const buscarMateriaPorID = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaBuscarMateriaPorID = await fabricaBuscarMateriaPorID();

        const resultadoValidacaoSchema = buscarMateriaPorID.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({ mensagem: 'ID deve ser número inteiro positivo', erros: resultadoValidacaoSchema.error, });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaBuscarMateriaPorID.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID da materia: ${error}`);
    }
}