import { Application } from "express";
import { buscarPorID } from "./in/buscarPorID";
import { buscarTodos } from "./in/buscarTodos";
import { cadastro } from "./in/cadastro";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";

export async function turmaRotas(app: Application) {
    /**
     * @swagger
     * /turmas/{id}:
     *   get:
     *     summary: Buscar turma por ID
     *     tags: [Turmas]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID da turma
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Turma encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Turma'
     *       400:
     *         description: ID inválido
     *       404:
     *         description: Turma não encontrada
     *       401:
     *         description: Não autorizado
     */
    app.get("/turmas/:id", autenticacaoMiddleware, buscarPorID);
    /**
     * @swagger
     * /turmas:
     *   get:
     *     summary: Buscar todas as turmas
     *     tags: [Turmas]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de turmas retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Turma'
     *       401:
     *         description: Não autorizado
     */
    app.get("/turmas", autenticacaoMiddleware, buscarTodos);

    /**
     * @swagger
     * /turmas:
     *   post:
     *     summary: Cadastrar nova turma
     *     tags: [Turmas]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/TurmaCadastro'
     *     responses:
     *       201:
     *         description: Turma cadastrada com sucesso
     *       400:
     *         description: Erro de validação
     *       401:
     *         description: Não autorizado
     */
    app.post("/turmas", autenticacaoMiddleware, cadastro);
}