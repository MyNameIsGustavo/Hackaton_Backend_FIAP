import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarAtividadesChronos } from '../../../../useCases/chronosUseCases/fabrica/fabricaBuscarAtividades-chronos';

export async function buscarAtividades(request: Request, response: Response) {
    try {
        const schema = z.object({
            aulaId: z.coerce.number().int().positive("O ID da aula deve ser positivo"),
        });

        const validacao = schema.safeParse(request.params);

        if (!validacao.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: validacao.error
            });
        }

        const { aulaId } = validacao.data;

        const useCase = await fabricaBuscarAtividadesChronos();
        const atividades = await useCase.processar(aulaId);

        return response.status(200).json(atividades);

    } catch (error) {
        return response.status(500).json({
            mensagem: "Erro ao buscar atividades",
            erro: String(error)
        });
    }
}
