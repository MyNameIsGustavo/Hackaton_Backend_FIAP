import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaLoginProfessor } from '../../../../useCases/professorUseCases/fabrica/fabricaLogin-professor';

export async function login(request: Request, response: Response) {
    try {
        const loginUsuarioSchemaBody = z.object({
            email: z.string().email("Email inválido"),
            senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
        });

        const resultadoValidacaoSchemaBody = loginUsuarioSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchemaBody.error,
            });
        }

        const tokenLogin = (await (await fabricaLoginProfessor()).processar(resultadoValidacaoSchemaBody.data))

        if (!tokenLogin) {
            return response.status(400).json({ message: "Credenciais inválidas" });
        }
        return response.status(201).json(tokenLogin);
    } catch (error) {
        throw new Error("Erro ao realizar o login: " + error);
    }
}