import { IHabilidadeRepository } from "../../repositories/habilidade.repository.interface";
import { IAtividadeRepository } from "../../repositories/atividade.repository.interface";
import { IPlanoAulaRepository } from "../../repositories/planoAula.repository.interface";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AtividadeComplementar } from "../../entities/atividadeComplementar.entity";
import { ChatRepository } from "../../repositories/pg/chat.repository";

export class GerarAtividadeUseCase {
    private genAI: GoogleGenerativeAI;

    constructor(
        private habilidadeRepository: IHabilidadeRepository,
        private atividadeRepository: IAtividadeRepository,
        private planoAulaRepository: IPlanoAulaRepository,
        private chatRepository: ChatRepository
    ) {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    }

    async processar(
        aulaId: number,
        professorId: number,
        codigoHabilidade: string,
        tema: string,
        conversaId?: number
    ): Promise<(AtividadeComplementar & { conversaId: number }) | null> {
        const habilidade = await this.habilidadeRepository.buscarPorCodigo(codigoHabilidade);
        if (!habilidade) return null;

        const planoExistente = await this.planoAulaRepository.buscarPlanoPorAulaEProfessor(aulaId, professorId);

        if (!planoExistente) {
            await this.gerarPlanoBase(aulaId, professorId, codigoHabilidade, habilidade.descricao, tema);
        }

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

        const atividadeSalva = await this.atividadeRepository.salvarAtividade({
            aulaId,
            professorId,
            titulo: respostaIA.titulo,
            descricao: JSON.stringify({ instrucoes: respostaIA.instrucoes, exercicios: respostaIA.exercicios }),
            tipo: tema,
        });

        if (!atividadeSalva) {
            return null;
        }

        const conversa = await this.registrarAtividadeNaConversa(
            aulaId,
            professorId,
            codigoHabilidade,
            tema,
            respostaIA,
            conversaId
        );

        return {
            ...atividadeSalva,
            conversaId: conversa.id
        };
    }

    private async gerarPlanoBase(
        aulaId: number,
        professorId: number,
        codigoHabilidade: string,
        descricaoHabilidade: string,
        tema: string
    ) {
        const model = this.genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const promptPlano = `
            Você é o Agente Chronos. Gere um plano de aula baseado na BNCC.
            Habilidade: [${codigoHabilidade}] ${descricaoHabilidade}
            Tema: ${tema}

            Retorne EXATAMENTE este JSON:
            {
                "objetivo": "string descrevendo o objetivo",
                "metodologia": "string descrevendo o passo a passo",
                "recursosDidaticos": "string listando materiais",
                "avaliacao": "string descrevendo critérios de avaliação"
            }
        `;

        const resultPlano = await model.generateContent(promptPlano);
        const respostaPlanoTexto = resultPlano.response.text();
        const planoIA = JSON.parse(respostaPlanoTexto);

        await this.planoAulaRepository.cadastrarPlano({
            aulaId,
            professorId,
            codigoHabilidade,
            objetivo: planoIA.objetivo,
            metodologia: planoIA.metodologia,
            recursosDidaticos: planoIA.recursosDidaticos,
            avaliacao: planoIA.avaliacao
        });
    }

    private async registrarAtividadeNaConversa(
        aulaId: number,
        professorId: number,
        codigoHabilidade: string,
        tema: string,
        respostaIA: any,
        conversaId?: number
    ) {
        const conversa = await this.chatRepository.buscarOuCriarConversa(aulaId, professorId, conversaId);
        const mensagemUsuario = `Gerar atividade sobre: **${tema}** (Habilidade: ${codigoHabilidade})`;
        const mensagemAssistente = this.formatarAtividadeComoMarkdown(respostaIA, tema);

        await this.chatRepository.salvarMensagem(conversa.id, 'user', mensagemUsuario);
        await this.chatRepository.salvarMensagem(conversa.id, 'assistant', mensagemAssistente);

        return conversa;
    }

    private formatarAtividadeComoMarkdown(respostaIA: any, tema: string) {
        let markdown = `# ${respostaIA.titulo || "Atividade complementar"}\n\n`;
        markdown += `**Tema:** ${tema}\n\n---\n\n`;

        if (respostaIA.instrucoes) {
            markdown += `### Instrucoes\n${respostaIA.instrucoes}\n\n`;
        }

        if (Array.isArray(respostaIA.exercicios) && respostaIA.exercicios.length > 0) {
            markdown += `### Exercicios\n\n`;

            respostaIA.exercicios.forEach((exercicio: any, index: number) => {
                markdown += `**${index + 1}. [${exercicio.tipo || "Questao"}]**\n`;
                markdown += `${exercicio.enunciado || ""}\n\n`;

                if (exercicio.respostaEsperada) {
                    const respostaFormatada = String(exercicio.respostaEsperada).replace(/\n/g, '\n> ');
                    markdown += `> **Resposta Esperada:**\n> ${respostaFormatada}\n\n`;
                }
            });
        }

        return markdown.trim();
    }
}
