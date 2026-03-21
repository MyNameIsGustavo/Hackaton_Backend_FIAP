import { Application } from "express";
import { buscarTodos } from "./in/buscarTodos";
import { buscarPorID } from "./in/buscarPorID";
import { cadastro } from "./in/cadastrar";
import { alterar } from "./in/alterar";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";
import { deletar } from "./in/deletar";

export async function periodosRotas(app: Application) {
    /**
     * @swagger
     * /periodos:
     *   get:
     *     summary: Buscar todos os períodos
     *     tags: [Períodos]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: periodo
     *         required: false
     *         description: Nome do período (pode enviar múltiplos)
     *         schema:
     *           type: array
     *           items:
     *             type: string
     *           example: ["manha", "tarde"]
     *         style: form
     *         explode: true
     *       - in: query
     *         name: page
     *         required: false
     *         description: Número da página
     *         schema:
     *           type: integer
     *           example: 1
     *       - in: query
     *         name: limit
     *         required: false
     *         description: Quantidade de registros por página
     *         schema:
     *           type: integer
     *           example: 10
     *       - in: query
     *         name: orderBy
     *         required: false
     *         description: Campo para ordenação
     *         schema:
     *           type: string
     *           example: nome
     *       - in: query
     *         name: order
     *         required: false
     *         description: Direção da ordenação
     *         schema:
     *           type: string
     *           enum: [asc, desc]
     *           example: asc
     *     responses:
     *       200:
     *         description: Lista de períodos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   nome:
     *                     type: string
     *                   horarioInicio:
     *                     type: string
     *                     example: "07:00"
     *                   horarioFim:
     *                     type: string
     *                     example: "12:00"
     *                   turmas:
     *                     type: array
     *                     items:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: integer
     *                         nome:
     *                           type: string
     *                         anoEscolar:
     *                           type: integer
     *                   materias:
     *                     type: array
     *                     items:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: integer
     *                         nome:
     *                           type: string
     *                         areaConhecimento:
     *                           type: string
     */
    app.get("/periodos", autenticacaoMiddleware, buscarTodos)

    /**
     * @swagger
     * /periodo/{id}:
     *   get:
     *     summary: Buscar período pelo ID
     *     tags: [Períodos]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: ID do período
     *     responses:
     *       200:
     *         description: Período encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 nome:
     *                   type: string
     *                 horarioInicio:
     *                   type: string
     *                   example: "07:00"
     *                 horarioFim:
     *                   type: string
     *                   example: "12:00"
     *                 isAtivo:
     *                   type: boolean
     *       400:
     *         description: ID inválido
     *       404:
     *         description: Período não encontrado
     */
    app.get("/periodo/:id", autenticacaoMiddleware, buscarPorID)
    /**
     * @swagger
     * /periodo:
     *   post:
     *     summary: Cadastrar um novo período
     *     tags: [Períodos]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - nome
     *               - horarioInicio
     *               - horarioFim
     *               - isAtivo
     *             properties:
     *               nome:
     *                 type: string
     *                 example: "Manhã"
     *               horarioInicio:
     *                 type: string
     *                 example: "07:00"
     *               horarioFim:
     *                 type: string
     *                 example: "12:00"
     *               isAtivo:
     *                 type: boolean
     *                 example: true
     *     responses:
     *       201:
     *         description: Período cadastrado com sucesso
     *       400:
     *         description: Erro de validação
     */
    app.post("/periodo", autenticacaoMiddleware, cadastro)

    /**
     * @swagger
     * /periodo/{id}:
     *   put:
     *     summary: Alterar um período existente
     *     tags: [Períodos]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: ID do período a ser alterado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 example: "Tarde"
     *               horarioInicio:
     *                 type: string
     *                 example: "13:00"
     *               horarioFim:
     *                 type: string
     *                 example: "18:00"
     *               isAtivo:
     *                 type: boolean
     *                 example: true
     *     responses:
     *       200:
     *         description: Período alterado com sucesso
     *       400:
     *         description: ID inválido ou erro de validação
     *       404:
     *         description: Período não encontrado
     */
    app.put("/periodo/:id", autenticacaoMiddleware, alterar)


    /**
     * @swagger
     * /periodo/{id}:
     *   delete:
     *     summary: Deletar uma periodo por ID
     *     tags: [Períodos]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID da periodo
     *         schema:
     *           type: integer
     *           example: 1
     *     responses:
     *       200:
     *         description: periodo deletada com sucesso
     *       400:
     *         description: ID inválido
     *       404:
     *         description: periodo não encontrada
     *       401:
     *         description: Não autorizado
     */
    app.delete("/periodo/:id", autenticacaoMiddleware, deletar)
}