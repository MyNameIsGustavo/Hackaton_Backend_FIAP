import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaDeletarProfessor } from '../../../../useCases/professorUseCases/fabrica/fabricaDeletarProfessor-professor';

export async function deletar(request: Request, response: Response) {

    try {
        const deletarProfessor = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaDeletarProfessor = await fabricaDeletarProfessor();

        const resultadoValidacaoSchema = deletarProfessor.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaDeletarProfessor.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a deleção da professor: ${error}`);
    }
}