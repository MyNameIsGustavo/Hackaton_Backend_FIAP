import { Application } from "express";
import { buscarTodos } from "./in/buscarTodos";
import { buscarPorID } from "./in/buscarPorID";
import { cadastro } from "./in/cadastrar";
import { alterar } from "./in/alterar";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";

export async function periodosRotas(app: Application) {
    /**
     * @swagger
     * /periodos:
     *   get:
     *     summary: Buscar todos os períodos
     *     tags: [Períodos]
     *     security:
     *       - bearerAuth: []
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
     *                   isAtivo:
     *                     type: boolean
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
}