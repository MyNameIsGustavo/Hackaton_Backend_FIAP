import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaAlterarMateria } from "../../../../useCases/materiaUseCases/fabrica/fabricaAlterar-materia";

export async function alterar(request: Request, response: Response) {
    try {
        const objFabricaAlterarMateria = await fabricaAlterarMateria();

        const editarMateriaSchemaParametro = z.object({ id: z.coerce.number().int().positive() });
        const editarMateriaSchemaBody = z.object({
            nome: z.string().min(3, "O nome da materia deve ter no mínimo 3 caracteres"),
            areaConhecimento: z.string().min(7, "O nome da area de conhecimento deve ter no mínimo 7 caracteres"),
            isAtivo: z.boolean(),
            periodoId: z.number().int("O ID do período deve ser um número inteiro").positive("O ID do período deve ser positivo"),
        });

        const resultadoValidacaoSchemaParametro = editarMateriaSchemaParametro.safeParse(request.params);
        if (!resultadoValidacaoSchemaParametro.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchemaParametro.error,
            });
        }

        const resultadoValidacaoSchemaBody = editarMateriaSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchemaBody.error,
            });
        }

        const { id } = resultadoValidacaoSchemaParametro.data;

        const resultadoProcessado = await objFabricaAlterarMateria.processar(resultadoValidacaoSchemaBody.data, id);
        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: 'Materia não encontrada' });
        }

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a edição de materia: ${error}`);
    }
}