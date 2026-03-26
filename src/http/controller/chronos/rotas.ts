import { Application } from "express";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";
import { gerarPlano } from "./in/gerarPlano";
import { buscarTodos } from "./in/buscarTodos"; // Importe o novo controller
import { conversar } from "./in/conversar"; // Importe o controller de conversar
import { buscarHistorico } from "./in/buscarHistorico";
import { gerarAtividade } from "./in/gerarAtividade";
import { buscarAtividades } from "./in/buscarAtividades";

export async function chronosRotas(app: Application) {
    /**
     * @swagger
     * /chronos/gerar-plano:
     *   post:
     *     summary: Gerar plano de aula com base na habilidade BNCC e tema
     *     tags: [Planos de Aula]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               codigoHabilidade:
     *                 type: string
     *                 description: Código da habilidade BNCC
     *               tema:
     *                 type: string
     *                 description: Tema para o plano de aula
     *             required:
     *               - codigoHabilidade
     *               - tema
     *     responses:
     *       200:
     *         description: Plano de aula gerado com sucesso
     *       400:
     *         description: Requisição inválida
     *       404:
     *         description: Habilidade BNCC não encontrada
     *       500:
     *         description: Erro interno do servidor
     */
    app.post("/chronos/gerar-plano", autenticacaoMiddleware, gerarPlano);

    /**
     * @swagger
     * /chronos/planos:
     *   get:
     *     summary: Buscar todos os planos de aula gerados
     *     tags: [Planos de Aula]
     *     responses:
     *       200:
     *         description: Lista de planos de aula
     *       500:
     *         description: Erro interno do servidor
     */
    app.get("/chronos/planos", autenticacaoMiddleware, buscarTodos);
    

    /**
     * @swagger
     * /chronos/conversar:
     *   post:
     *     summary: Enviar mensagem para o Agente Chronos e receber resposta
     *     tags: [Agente Chronos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               aulaId:
     *                 type: integer
     *                 description: ID da aula para contexto da conversa
     *               mensagem:
     *                 type: string
     *                 description: Mensagem do usuário para o agente
     *             required:
     *               - aulaId
     *               - mensagem
     *     responses:
     *       200:
     *         description: Resposta do agente Chronos
     *       400:
     *         description: Requisição inválida
     *       500:
     *         description: Erro interno do servidor
     */
     app.post("/chronos/conversar", autenticacaoMiddleware, conversar);

    /**
     * @swagger
     * /chronos/conversar/{aulaId}:
     *   get:
     *     summary: Buscar histórico de conversas para uma aula específica
     *     tags: [Agente Chronos]
     *     parameters:
     *       - name: aulaId
     *         in: path
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Histórico de conversas
     *       400:
     *         description: Requisição inválida
     *       500:
     *         description: Erro interno do servidor
     */
    app.get("/chronos/conversar/:aulaId", autenticacaoMiddleware, buscarHistorico);

    /**
     * @swagger
     * /chronos/gerar-atividade:
     *   post:
     *     summary: Gerar atividade complementar com IA baseada na BNCC
     *     description: Gera uma atividade complementar personalizada utilizando inteligência artificial com base na BNCC (Base Nacional Comum Curricular).
     *     tags:
     *       - Agente Chronos
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - aulaId
     *               - codigoHabilidade
     *               - tema
     *             properties:
     *               aulaId:
     *                 type: integer
     *                 example: 245
     *                 description: ID da aula à qual a atividade será vinculada
     *               codigoHabilidade:
     *                 type: string
     *                 example: "EF02LP01"
     *                 description: Código da habilidade da BNCC
     *               tema:
     *                 type: string
     *                 example: "A importância da preservação do meio ambiente"
     *                 description: Tema ou contexto da atividade
     *     responses:
     *       201:
     *         description: Atividade complementar gerada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 atividade:
     *                   type: object
     *                   # aqui você pode detalhar melhor a estrutura da atividade se quiser
     *       400:
     *         description: Requisição inválida (dados obrigatórios ausentes ou inválidos)
     *       404:
     *         description: Habilidade BNCC não encontrada
     *       500:
     *         description: Erro interno do servidor
     */        
    app.post("/chronos/gerar-atividade", autenticacaoMiddleware, gerarAtividade);

    /**
     * @swagger
     * /chronos/atividades/{aulaId}:
     *   get:
     *     summary: Listar atividades complementares de um plano de aula
     *     description: Retorna todas as atividades complementares geradas para o plano de aula vinculado à aula informada.
     *     tags:
     *       - Agente Chronos
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: aulaId
     *         in: path
     *         required: true
     *         schema:
     *           type: integer
     *           example: 245
     *         description: ID da aula cujo plano de aula se deseja consultar
     *     responses:
     *       200:
     *         description: Lista de atividades complementares
     *       400:
     *         description: Requisição inválida
     *       500:
     *         description: Erro interno do servidor
     */
    app.get("/chronos/atividades/:aulaId", autenticacaoMiddleware, buscarAtividades);
}