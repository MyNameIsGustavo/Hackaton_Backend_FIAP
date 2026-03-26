import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaDeletarMateria } from '../../../../useCases/materiaUseCases/fabrica/fabricaDeletar-materia';

export async function deletar(request: Request, response: Response) {

    try {
        const deletarMateria = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaDeletarMateria = await fabricaDeletarMateria();

        const resultadoValidacaoSchema = deletarMateria.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaDeletarMateria.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a deleção da materia: ${error}`);
    }
}