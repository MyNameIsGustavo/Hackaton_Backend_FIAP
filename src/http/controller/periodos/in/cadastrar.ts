import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaCadastroPeriodos } from '../../../../useCases/periodoUseCases/fabrica/fabricaCadastro-periodo';

export async function cadastro(request: Request, response: Response) {
    const horarioRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    try {
        const periodoSchemaBody = z.object({
            nome: z.string().min(3, "O nome deve ter mínimo 3 caracteres"),
            horarioInicio: z.string().regex(horarioRegex, "O horário de início deve estar no formato HH:MM"),
            horarioFim: z.string().regex(horarioRegex, "O horário de fim deve estar no formato HH:MM"),
        });

        const resultadoValidacaoSchemaBody = periodoSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) { return response.status(400).json({ mensagem: 'Erro de validação', erros: resultadoValidacaoSchemaBody.error, }) }

        const professorCadastrado = (await (await fabricaCadastroPeriodos()).processar(resultadoValidacaoSchemaBody.data))

        return response.status(201).json(professorCadastrado);
    } catch (error) {
        throw new Error("Erro ao realizar o login: " + error);
    }
}