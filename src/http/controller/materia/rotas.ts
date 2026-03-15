import { Application } from "express";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";
import { buscarPorID } from "./in/buscarPorID";
import { buscarTodos } from "./in/buscarTodos";
import { cadastro } from "./in/cadastro";
import { alterar } from "./in/alterar";

export async function materiasRotas(app: Application) {
    /**
     * @swagger
     * /materias/{id}:
     *   get:
     *     summary: Buscar matéria por ID
     *     tags: [Materias]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID da matéria
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Matéria encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Materia'
     *       400:
     *         description: ID inválido
     *       404:
     *         description: Matéria não encontrada
     *       401:
     *         description: Não autorizado
     */
    app.get("/materias/:id", autenticacaoMiddleware, buscarPorID);
    /**
     * @swagger
     * /materias:
     *   get:
     *     summary: Buscar todas as matérias
     *     tags: [Materias]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de matérias retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Materia'
     *       401:
     *         description: Não autorizado
     */
    app.get("/materias", autenticacaoMiddleware, buscarTodos);

    /**
     * @swagger
     * /materia:
     *   post:
     *     summary: Cadastrar nova matéria
     *     tags: [Materias]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MateriaCadastro'
     *           example:
     *             nome: "Matemática"
     *             areaConhecimento: "Ciências Exatas"
     *             isAtivo: true
     *             periodoId: 1
     *     responses:
     *       201:
     *         description: Matéria cadastrada com sucesso
     *       400:
     *         description: Erro de validação
     *       401:
     *         description: Não autorizado
     */
    app.post("/materia", autenticacaoMiddleware, cadastro);

    /**
     * @swagger
     * /materia/{id}:
     *   put:
     *     summary: Atualizar matéria
     *     tags: [Materias]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID da matéria
     *         schema:
     *           type: integer
     *           example: 1
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MateriaCadastro'
     *           example:
     *             nome: "Matemática Avançada"
     *             areaConhecimento: "Ciências Exatas"
     *             isAtivo: true
     *             periodoId: 2
     *     responses:
     *       200:
     *         description: Matéria atualizada com sucesso
     *       400:
     *         description: Erro de validação
     *       404:
     *         description: Matéria não encontrada
     *       401:
     *         description: Não autorizado
     */
    app.put("/materia/:id", autenticacaoMiddleware, alterar);
}