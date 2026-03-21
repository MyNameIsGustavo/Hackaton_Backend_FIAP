import { Application } from "express";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";
import { buscarPorID } from "./in/buscarPorID";
import { buscarTodos } from "./in/buscarTodos";
import { deletar } from "./in/deletar";
import { cadastro } from "./in/cadastro";
import { alterar } from "./in/alterar";

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
     *     description: Retorna uma lista paginada de aulas com filtros opcionais
     *     tags: [Aulas]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: aulas
     *         schema:
     *           type: string
     *         required: false
     *         description: Nome da aula para filtro (busca parcial)
     *
     *       - in: query
     *         name: pagina
     *         schema:
     *           type: integer
     *           example: 1
     *         required: false
     *         description: Número da página
     *
     *       - in: query
     *         name: limite
     *         schema:
     *           type: integer
     *           example: 10
     *         required: false
     *         description: Quantidade de registros por página
     *
     *       - in: query
     *         name: ordenaPor
     *         schema:
     *           type: string
     *           example: nome
     *         required: false
     *         description: Campo para ordenação
     *
     *       - in: query
     *         name: ordem
     *         schema:
     *           type: string
     *           enum: [asc, desc]
     *           example: asc
     *         required: false
     *         description: Ordem da classificação
     *
     *     responses:
     *       200:
     *         description: Lista de aulas retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 pagina:
     *                   type: integer
     *                   example: 1
     *                 limite:
     *                   type: integer
     *                   example: 10
     *                 total:
     *                   type: integer
     *                   example: 100
     *                 dados:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/AulaComRelacoes'
     *
     *       401:
     *         description: Não autorizado
     *
     *       500:
     *         description: Erro interno do servidor
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
     *           example:
     *             nome: "Introdução às Frações"
     *             objetivosAprendizagem: "Compreender o conceito de frações"
     *             dataAula: "2026-03-20"
     *             isAtivo: true
     *             turmaId: 1
     *             materiaId: 2
     *     responses:
     *       201:
     *         description: Aula cadastrada com sucesso
     *       400:
     *         description: Erro de validação
     */
    app.post("/aula", autenticacaoMiddleware, cadastro);

    /**
     * @swagger
     * /aula/{id}:
     *   put:
     *     summary: Atualizar aula
     *     tags: [Aulas]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *               objetivosAprendizagem:
     *                 type: string
     *               dataAula:
     *                 type: string
     *                 format: date
     *               isAtivo:
     *                 type: boolean
     *               turmaId:
     *                 type: integer
     *               materiaId:
     *                 type: integer
     *     responses:
     *       200:
     *         description: Aula atualizada com sucesso
     */
    app.put("/aula/:id", autenticacaoMiddleware, alterar);
}