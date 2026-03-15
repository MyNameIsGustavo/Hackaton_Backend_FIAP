import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarProfessorPorEmail } from '../../../../useCases/professorUseCases/fabrica/fabricaBuscarPorEmail-professor';

export async function buscarPorEmail(request: Request, response: Response) {
    try {
        const buscarProfessorPorEmail = z.object({ email: z.string().email() });

        const objFabricaBuscarProfessorPorEmail = await fabricaBuscarProfessorPorEmail();

        const resultadoValidacaoSchema = buscarProfessorPorEmail.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({ mensagem: 'Deve ser fornecido um e-mail válido', erros: resultadoValidacaoSchema.error, });
        }

        const { email } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaBuscarProfessorPorEmail.processar(email);
        if (!resultadoProcessado) return response.status(404).json({ messagem: "Nenhum professor com o email fornecido" });

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por email do professor: ${error}`);
    }
}