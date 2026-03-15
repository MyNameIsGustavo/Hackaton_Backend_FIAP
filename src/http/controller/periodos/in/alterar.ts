import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaAlterarPeriodo } from "../../../../useCases/periodoUseCases/fabrica/alterar-periodo";

export async function alterar(request: Request, response: Response) {
    try {
        const fbrEditarPeriodo = await fabricaAlterarPeriodo();
        const horarioRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        const editarPeriodoSchemaParametro = z.object({ id: z.coerce.number().int().positive() });
        const editarPeriodoSchemaBody = z.object({
            nome: z.string().min(3, "O nome deve ter mínimo 3 caracteres"),
            horarioInicio: z.string().regex(horarioRegex, "O horário de início deve estar no formato HH:MM"),
            horarioFim: z.string().regex(horarioRegex, "O horário de fim deve estar no formato HH:MM"),

        });

        const resultadoValidacaoSchemaParametro = editarPeriodoSchemaParametro.safeParse(request.params);
        if (!resultadoValidacaoSchemaParametro.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchemaParametro.error,
            });
        }

        const resultadoValidacaoSchemaBody = editarPeriodoSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchemaBody.error,
            });
        }

        const { id } = resultadoValidacaoSchemaParametro.data;

        const resultadoProcessado = await fbrEditarPeriodo.processar(resultadoValidacaoSchemaBody.data, id);
        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: 'Periodo não encontrado' });
        }

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a edição de periodo: ${error}`);
    }
}