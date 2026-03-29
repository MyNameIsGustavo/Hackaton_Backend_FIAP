import { Request, Response } from 'express';
import { fabricaBuscarTodasConversasChronos } from '../../../../useCases/chronosUseCases/fabrica/fabricaBuscarTodasConversas-chronos';

export async function buscarTodasConversas(request: Request, response: Response) {
    try {
        const professorId = (request as any).usuario.id;

        const useCase = await fabricaBuscarTodasConversasChronos();
        const resultado = await useCase.processar(professorId);

        return response.status(200).json(resultado);
    } catch (error) {
        return response.status(500).json({ 
            mensagem: "Erro ao buscar o histórico completo", 
            erro: String(error) 
        });
    }
}