import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaCadastroProfessor } from '../../../../useCases/professorUseCases/fabrica/fabricaCadastro-professor';

export async function cadastro(request: Request, response: Response) {
    try {
        const loginProfessorSchemaBody = z.object({
            nomeCompleto: z.string().min(2, "O nome deve ter mínimo 2 caracteres"),
            email: z.string().email("Deve ser um e-mail válido"),
            senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
            telefone: z.string().length(11, "O telefone deve ter exatamente 11 caracteres"),
            dataNascimento: z.date().min(18, "O professor deve ter mínimo 18 anos"),
            formacao: z.string().min(3, "A formação deve ter no mínimo 3 caracteres"),
            especialidade: z.string().min(3, "A especialidade deve ter no mínimo 3 caracteres"),
            isAtivo: z.boolean(),
        });

        const resultadoValidacaoSchemaBody = loginProfessorSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) { return response.status(400).json({ mensagem: 'Erro de validação', erros: resultadoValidacaoSchemaBody.error, }) }
        const dadosValidados = {
            ...resultadoValidacaoSchemaBody.data,
            dataCadastro: new Date(),
        };
        const professorCadastrado = (await (await fabricaCadastroProfessor()).processar(dadosValidados))

        return response.status(201).json(professorCadastrado);
    } catch (error) {
        throw new Error("Erro ao realizar o login: " + error);
    }
}