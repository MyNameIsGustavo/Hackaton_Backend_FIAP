import { IHabilidadeRepository } from "../../repositories/habilidade.repository.interface";
import { IPlanoAulaRepository } from "../../repositories/planoAula.repository.interface";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GerarPlanoUseCase {
    private genAI: GoogleGenerativeAI;

    constructor(
        private habilidadeRepository: IHabilidadeRepository,
        private planoAulaRepository: IPlanoAulaRepository
    ) {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    }

    async processar(aulaId: number, professorId: number, codigoHabilidade: string, tema: string): Promise<any> {
        await this.planoAulaRepository.validarProfessorNaAula(professorId, aulaId);

        const habilidade = await this.habilidadeRepository.buscarPorCodigo(codigoHabilidade);
        if (!habilidade) return null;

        // 2. Configura o Gemini para JSON
        const model = this.genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        // Prompt ultra-específico para evitar campos vazios
        const prompt = `
            Você é o Agente Chronos. Gere um plano de aula baseado na BNCC.
            Habilidade: [${codigoHabilidade}] ${habilidade.descricao}
            Tema: ${tema}

            Retorne EXATAMENTE este JSON:
            {
                "objetivo": "string descrevendo o objetivo",
                "metodologia": "string descrevendo o passo a passo",
                "recursosDidaticos": "string listando materiais",
                "avaliacao": "string descrevendo critérios de avaliação"
            }
        `;

        try {
            const result = await model.generateContent(prompt);
            const respostaTexto = result.response.text();
            
            // 3. Parse do JSON vindo da IA
            const planoIA = JSON.parse(respostaTexto);

            const planoSalvo = await this.planoAulaRepository.cadastrarPlano({
                aulaId: Number(aulaId),
                professorId,
                codigoHabilidade: codigoHabilidade,
                objetivo: planoIA.objetivo,
                metodologia: planoIA.metodologia,
                recursosDidaticos: planoIA.recursosDidaticos,
                avaliacao: planoIA.avaliacao
            });

            return planoSalvo;
        } catch (error) {
            console.error("Erro no processamento do Agente Chronos:", error);
            throw new Error(`Falha ao gerar/salvar plano: ${error}`);
        }
    }
}
