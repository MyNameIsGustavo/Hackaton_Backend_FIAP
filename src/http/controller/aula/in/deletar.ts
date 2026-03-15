import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaDeletarAula } from '../../../../useCases/aulaUseCases/fabrica/fabricaDeletar-aula';

export async function deletar(request: Request, response: Response) {

    try {
        const deletarAula = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaDeletarAula = await fabricaDeletarAula();

        const resultadoValidacaoSchema = deletarAula.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaDeletarAula.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a deleção da aula: ${error}`);
    }
}