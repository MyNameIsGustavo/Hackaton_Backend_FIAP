import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatRepository } from "../../repositories/pg/chat.repository";

export class ConversarUseCase {
    private genAI: GoogleGenerativeAI;

    constructor(private chatRepository: ChatRepository) {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    }

    async processar(aulaId: number, mensagemUsuario: string): Promise<any> {
        // 1. Garante a existência da conversa vinculada à Aula
        const conversa = await this.chatRepository.buscarOuCriarConversa(aulaId);

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

        // 4. Envia mensagem
        const result = await chatIA.sendMessage(mensagemUsuario);
        const respostaIA = result.response.text();

        // 5. Salva no banco (Persistência conforme seu novo schema)
        await this.chatRepository.salvarMensagem(conversa.id, 'user', mensagemUsuario);
        await this.chatRepository.salvarMensagem(conversa.id, 'assistant', respostaIA);

        return {
            conversaId: conversa.id,
            resposta: respostaIA
        };
    }
}