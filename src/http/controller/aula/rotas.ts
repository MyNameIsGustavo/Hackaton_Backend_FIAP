import { Application } from "express";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";
import { buscarPorID } from "./in/buscarPorID";
import { buscarTodos } from "./in/buscarTodos";
import { deletar } from "./in/deletar";
import { cadastro } from "./in/cadastro";

export async function aulaRotas(app: Application) {
    /**
     * @swagger
     * /aulas/{id}:
     *   get:
     *     summary: Buscar aula por ID
     *     tags: [Aulas]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID da aula
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Aula encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Aula'
     *       400:
     *         description: ID inválido
     *       404:
     *         description: Aula não encontrada
     */
    app.get("/aulas/:id", autenticacaoMiddleware, buscarPorID);
    /**
     * @swagger
     * /aulas:
     *   get:
     *     summary: Buscar todas as aulas
     *     tags: [Aulas]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de aulas retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Aula'
     *       401:
     *         description: Não autorizado
     */
    app.get("/aulas", autenticacaoMiddleware, buscarTodos);
    /**
     * @swagger
     * /aula/{id}:
     *   delete:
     *     summary: Deletar aula por ID
     *     tags: [Aulas]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID da aula
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Aula deletada com sucesso
     *       404:
     *         description: Aula não encontrada
     *       401:
     *         description: Não autorizado
     */
    app.delete("/aula/:id", autenticacaoMiddleware, deletar);
    /**
     * @swagger
     * /aula:
     *   post:
     *     summary: Cadastrar nova aula
     *     tags: [Aulas]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/AulaCadastro'
     *     responses:
     *       201:
     *         description: Aula cadastrada com sucesso
     *       400:
     *         description: Erro de validação
     */
    app.post("/aula", autenticacaoMiddleware, cadastro);
}