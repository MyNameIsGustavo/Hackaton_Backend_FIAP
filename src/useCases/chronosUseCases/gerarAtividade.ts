import { IHabilidadeRepository } from "../../repositories/habilidade.repository.interface";
import { IAtividadeRepository } from "../../repositories/atividade.repository.interface";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AtividadeComplementar } from "../../entities/atividadeComplementar.entity";

export class GerarAtividadeUseCase {
    private genAI: GoogleGenerativeAI;

    constructor(
        private habilidadeRepository: IHabilidadeRepository,
        private atividadeRepository: IAtividadeRepository
    ) {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    }

    async processar(aulaId: number, codigoHabilidade: string, tema: string): Promise<AtividadeComplementar | null> {
        const habilidade = await this.habilidadeRepository.buscarPorCodigo(codigoHabilidade);
        if (!habilidade) return null;

        const model = this.genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `
            Você é o Agente Chronos, um especialista educacional.
            Gere uma atividade complementar para os alunos baseada nesta habilidade da BNCC e tema:
            Habilidade: [${codigoHabilidade}] ${habilidade.descricao}
            Tema: ${tema}

            Retorne EXATAMENTE este JSON:
            {
                "titulo": "Título criativo da atividade",
                "instrucoes": "Instruções claras de como o aluno deve realizar a tarefa",
                "exercicios": [
                    {
                        "tipo": "Múltipla escolha ou Dissertativa",
                        "enunciado": "Texto da questão",
                        "respostaEsperada": "Gabarito ou expectativa de resposta para o professor"
                    }
                ]
            }
        `;

        const result = await model.generateContent(prompt);
        const respostaTexto = result.response.text();
        const respostaIA = JSON.parse(respostaTexto);

        return await this.atividadeRepository.salvarAtividade({
            aulaId,
            titulo: respostaIA.titulo,
            descricao: JSON.stringify({ instrucoes: respostaIA.instrucoes, exercicios: respostaIA.exercicios }),
            tipo: tema,
        });
    }
}
