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
     *     parameters:
     *       - in: query
     *         name: materia
     *         required: false
     *         description: Nome da matéria para filtro
     *         schema:
     *           type: string
     *           example: Matemática
     *       - in: query
     *         name: pagina
     *         required: false
     *         description: Número da página
     *         schema:
     *           type: integer
     *           example: 1
     *       - in: query
     *         name: limite
     *         required: false
     *         description: Quantidade de registros por página
     *         schema:
     *           type: integer
     *           example: 10
     *       - in: query
     *         name: ordenaPor
     *         required: false
     *         description: Campo usado para ordenação
     *         schema:
     *           type: string
     *           example: nome
     *       - in: query
     *         name: ordem
     *         required: false
     *         description: Direção da ordenação
     *         schema:
     *           type: string
     *           enum: [asc, desc]
     *           example: asc
     *     responses:
     *       200:
     *         description: Lista de matérias retornada com sucesso
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