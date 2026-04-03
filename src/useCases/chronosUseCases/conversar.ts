import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatRepository } from "../../repositories/pg/chat.repository";

export class ConversarUseCase {
    private genAI: GoogleGenerativeAI;

    constructor(private chatRepository: ChatRepository) {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    }

    async processar(aulaId: number, professorId: number, mensagemUsuario: string, conversaId?: number): Promise<any> {
        const conversa = await this.chatRepository.buscarOuCriarConversa(aulaId, professorId, conversaId);

        // 2. Busca histórico para o Gemini (Memória Contextual)
        const historicoBanco = await this.chatRepository.buscarHistorico(conversa.id);
        
        // Mapeia o role do seu banco ('assistant') para o esperado pelo Gemini ('model')
        const historyMap = historicoBanco.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.conteudo }]
        }));

        // 3. Configura o modelo
        const model = this.genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: "Tu és o Agente Chronos. Teu objetivo é ajudar o professor com esta aula específica, sugerindo dinâmicas e tirando dúvidas BNCC."
        });

        const chatIA = model.startChat({ history: historyMap });

        await this.chatRepository.salvarMensagem(conversa.id, 'user', mensagemUsuario);

        const result = await chatIA.sendMessage(mensagemUsuario);
        const respostaIA = result.response.text();

        await this.chatRepository.salvarMensagem(conversa.id, 'assistant', respostaIA);

        return {
            conversaId: conversa.id,
            resposta: respostaIA
        };
    }
}
