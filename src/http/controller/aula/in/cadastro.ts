import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaCadastroAula } from '../../../../useCases/aulaUseCases/fabrica/fabricaCadastro-aula';

export async function cadastro(request: Request, response: Response) {
    try {
        const aulaSchema = z.object({
            nome: z.string().min(3, "O nome da aula deve ter no mínimo 3 caracteres"),
            objetivosAprendizagem: z.string().min(5, "Os objetivos de aprendizagem devem ter no mínimo 5 caracteres"),
            dataAula: z.coerce.date({ error: "Data da aula inválida" }),
            isAtivo: z.boolean(),
            turmaId: z.number().int("O ID da turma deve ser um número inteiro").positive("O ID da turma deve ser positivo"),
            materiaId: z.number().int("O ID da matéria deve ser um número inteiro").positive("O ID da matéria deve ser positivo").optional(),
        });

        const resultadoValidacaoSchemaBody = aulaSchema.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) { return response.status(400).json({ mensagem: 'Erro de validação', erros: resultadoValidacaoSchemaBody.error, }) }
        const dadosValidados = {
            ...resultadoValidacaoSchemaBody.data
        };
        const aulaCadastrada = (await (await fabricaCadastroAula()).processar(dadosValidados))

        return response.status(201).json(aulaCadastrada);
    } catch (error) {
        throw new Error("Erro ao o cadastro da aula: " + error);
    }
}