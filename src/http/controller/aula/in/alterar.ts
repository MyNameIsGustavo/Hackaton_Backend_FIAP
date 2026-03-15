import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaAlterarAula } from "../../../../useCases/aulaUseCases/fabrica/fabricaAlterar-aula";

export async function alterar(request: Request, response: Response) {
    try {
        const objFabricaAlterarAula = await fabricaAlterarAula();

        const editarAulaSchemaParametro = z.object({ id: z.coerce.number().int().positive() });
        const editarAulaSchemaBody = z.object({
            nome: z.string().min(3, "O nome deve ter mínimo 3 caracteres"),
            objetivosAprendizagem: z.string().min(5, "Os objetivos de aprendizagem devem ter no mínimo 5 caracteres"),
            dataAula: z.coerce.date({ error: "Data da aula inválida" }),
            isAtivo: z.boolean(),
            turmaId: z.number().int("O ID da turma deve ser um número inteiro").positive("O ID da turma deve ser positivo"),
            materiaId: z.number().int("O ID da matéria deve ser um número inteiro").positive("O ID da matéria deve ser positivo").optional(),
        });

        const resultadoValidacaoSchemaParametro = editarAulaSchemaParametro.safeParse(request.params);
        if (!resultadoValidacaoSchemaParametro.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchemaParametro.error,
            });
        }

        const resultadoValidacaoSchemaBody = editarAulaSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchemaBody.error,
            });
        }

        const { id } = resultadoValidacaoSchemaParametro.data;

        const resultadoProcessado = await objFabricaAlterarAula.processar(resultadoValidacaoSchemaBody.data, id);
        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: 'Aula não encontrada' });
        }

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a edição de aula: ${error}`);
    }
}