import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaCadastroMateria } from '../../../../useCases/materiaUseCases/fabrica/fabricaCadastro-materia';

export async function cadastro(request: Request, response: Response) {
    try {
        const materiaSchema = z.object({
            nome: z.string().min(3, "O nome da materia deve ter no mínimo 3 caracteres"),
            areaConhecimento: z.string().min(7, "O nome da area de conhecimento deve ter no mínimo 7 caracteres"),
            isAtivo: z.boolean(),
            periodoId: z.number().int("O ID do período deve ser um número inteiro").positive("O ID do período deve ser positivo"),
        });

        const resultadoValidacaoSchemaBody = materiaSchema.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) { return response.status(400).json({ mensagem: 'Erro de validação', erros: resultadoValidacaoSchemaBody.error, }) }
        const dadosValidados = {
            ...resultadoValidacaoSchemaBody.data,
            dataCadastro: new Date()
        };
        const materiaCadastrada = (await (await fabricaCadastroMateria()).processar(dadosValidados))

        return response.status(201).json(materiaCadastrada);
    } catch (error) {
        throw new Error("Erro ao o cadastro de materia: " + error);
    }
}