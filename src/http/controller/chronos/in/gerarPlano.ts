import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaGerarPlanoChronos } from '../../../../useCases/chronosUseCases/fabrica/fabricaGerarPlano-chronos';

export async function gerarPlano(request: Request, response: Response) {
    try {
        // Esquema de validação seguindo o padrão do projeto
        const chronosSchema = z.object({
            aulaId: z.number().int().positive("O ID da aula deve ser um número positivo"),
            codigoHabilidade: z.string().min(1, "O código da habilidade BNCC é obrigatório"),
            tema: z.string().min(3, "O tema deve ter no mínimo 3 caracteres"),
        });

        // Validação do corpo da requisição
        const resultadoValidacao = chronosSchema.safeParse(request.body);
        
        if (!resultadoValidacao.success) { 
            return response.status(400).json({ 
                mensagem: 'Erro de validação', 
                erros: resultadoValidacao.error 
            });
        }

        const { aulaId, codigoHabilidade, tema } = resultadoValidacao.data;
        const professorId = (request as any).usuario.id;

        const objGerarPlanoUseCase = await fabricaGerarPlanoChronos();
        const resultado = await objGerarPlanoUseCase.processar(aulaId, professorId, codigoHabilidade, tema);

        if (!resultado) {
            return response.status(404).json({ mensagem: 'Habilidade não encontrada ou erro na geração' });
        }

        // Retorno de sucesso seguindo o padrão de status 201 do projeto
        return response.status(201).json(resultado);

    } catch (error) {
        // Tratamento de erro centralizado
        return response.status(500).json({ 
            mensagem: "Erro ao processar a geração do plano pelo Agente Chronos",
            erro: String(error)
        });
    }
}
