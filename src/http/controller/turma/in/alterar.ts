import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaAlterarTurma } from "../../../../useCases/turmaUseCases/fabrica/fabricaAlterar-turma";

export async function alterar(request: Request, response: Response) {
    try {
        const objFabricaAlterarTurma = await fabricaAlterarTurma();

        const editarTurmaSchemaParametro = z.object({ id: z.coerce.number().int().positive() });
        const editarTurmaSchemaBody = z.object({
            nome: z.string().min(3, "O nome da turma deve ter no mínimo 3 caracteres"),
            anoEscolar: z.number().int("O ano escolar deve ser um número inteiro").min(1, "O ano escolar deve ser no mínimo 1"),
            anoLetivo: z.number().int("O ano letivo deve ser um número inteiro").min(2000, "Ano letivo inválido"),
            isAtivo: z.boolean(),
            periodoId: z.number().int("O ID do período deve ser um número inteiro").positive("O ID do período deve ser positivo"),
        });

        const resultadoValidacaoSchemaParametro = editarTurmaSchemaParametro.safeParse(request.params);
        if (!resultadoValidacaoSchemaParametro.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchemaParametro.error,
            });
        }

        const resultadoValidacaoSchemaBody = editarTurmaSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchemaBody.error,
            });
        }

        const { id } = resultadoValidacaoSchemaParametro.data;

        const resultadoProcessado = await objFabricaAlterarTurma.processar(resultadoValidacaoSchemaBody.data, id);
        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: 'Turma não encontrada' });
        }

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a edição de turma: ${error}`);
    }
}