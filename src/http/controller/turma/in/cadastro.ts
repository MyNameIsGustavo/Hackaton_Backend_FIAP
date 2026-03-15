import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaCadastrarTurmas } from '../../../../useCases/turmaUseCases/fabrica/fabricaCadastro-turma';

export async function cadastro(request: Request, response: Response) {
    try {
        const turmaSchema = z.object({
            nome: z.string().min(3, "O nome da turma deve ter no mínimo 3 caracteres"),
            anoEscolar: z.number().int("O ano escolar deve ser um número inteiro").min(1, "O ano escolar deve ser no mínimo 1"),
            anoLetivo: z.number().int("O ano letivo deve ser um número inteiro").min(2000, "Ano letivo inválido"),
            isAtivo: z.boolean(),
            periodoId: z.number().int("O ID do período deve ser um número inteiro").positive("O ID do período deve ser positivo"),
        });

        const resultadoValidacaoSchemaBody = turmaSchema.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) { return response.status(400).json({ mensagem: 'Erro de validação', erros: resultadoValidacaoSchemaBody.error, }) }
        const dadosValidados = {
            ...resultadoValidacaoSchemaBody.data,
        };
        const professorCadastrado = (await (await fabricaCadastrarTurmas()).processar(dadosValidados))

        return response.status(201).json(professorCadastrado);
    } catch (error) {
        throw new Error("Erro ao realizar o login: " + error);
    }
}