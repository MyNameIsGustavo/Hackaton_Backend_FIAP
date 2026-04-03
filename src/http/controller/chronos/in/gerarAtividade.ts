import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaGerarAtividadeChronos } from '../../../../useCases/chronosUseCases/fabrica/fabricaGerarAtividade-chronos';

export async function gerarAtividade(request: Request, response: Response) {
    try {
        const schema = z.object({
            aulaId: z.number().int().positive("O ID da aula deve ser positivo"),
            codigoHabilidade: z.string().min(1, "Código BNCC obrigatório"),
            tema: z.string().min(3, "O tema deve ter no mínimo 3 caracteres"),
            conversaId: z.number().int().positive().optional()
        });

        const validacao = schema.safeParse(request.body);
        
        if (!validacao.success) { 
            return response.status(400).json({ 
                mensagem: 'Erro de validação', 
                erros: validacao.error 
            });
        }

        const { aulaId, codigoHabilidade, tema, conversaId } = validacao.data;
        const professorId = (request as any).usuario.id;

        const useCase = await fabricaGerarAtividadeChronos();
        const resultado = await useCase.processar(aulaId, professorId, codigoHabilidade, tema, conversaId);

        if (!resultado) {
            return response.status(404).json({ mensagem: 'Habilidade BNCC não encontrada' });
        }

        return response.status(201).json(resultado);

    } catch (error) {
        return response.status(500).json({ 
            mensagem: "Erro ao gerar a atividade",
            erro: String(error)
        });
    }
}
