import { Application } from "express";
import { buscarPorID } from "./in/buscarPorID";
import { buscarTodos } from "./in/buscarTodos";
import { cadastro } from "./in/cadastro";
import { alterar } from "./in/alterar";
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
     *     parameters:
     *       - in: query
     *         name: nomeTurma
     *         required: false
     *         description: Nome da turma para filtro
     *         schema:
     *           type: string
     *           example: "1º Ano"
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
     *         description: Campo para ordenação
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
     *         description: Lista de turmas retornada com sucesso
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
     *                   anoEscolar:
     *                     type: integer
     *                   anoLetivo:
     *                     type: integer
     *                   isAtivo:
     *                     type: boolean
     *                   periodoId:
     *                     type: integer
     *                   periodo:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: integer
     *                       nome:
     *                         type: string
     *                       horarioInicio:
     *                         type: string
     *                         example: "07:00"
     *                       horarioFim:
     *                         type: string
     *                         example: "12:00"
     *                   aulas:
     *                     type: array
     *                     items:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: integer
     *                         nome:
     *                           type: string
     *                         objetivosAprendizagem:
     *                           type: string
     *                         dataAula:
     *                           type: string
     *                           format: date-time
     *                         isAtivo:
     *                           type: boolean
     *                         turmaId:
     *                           type: integer
     *                         materiaId:
     *                           type: integer
     *                           nullable: true
     *                   avaliacaos:
     *                     type: array
     *                     items:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: integer
     *                         nome:
     *                           type: string
     *                         dataAvaliacao:
     *                           type: string
     *                           format: date-time
     *                         tipo:
     *                           type: string
     *                         isAtivo:
     *                           type: boolean
     *                         turmaId:
     *                           type: integer
     *                         materiaId:
     *                           type: integer
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
     *           example:
     *             nome: "1º Ano A"
     *             anoEscolar: 1
     *             anoLetivo: 2026
     *             isAtivo: true
     *             periodoId: 1
     *     responses:
     *       201:
     *         description: Turma cadastrada com sucesso
     *       400:
     *         description: Erro de validação
     *       401:
     *         description: Não autorizado
     */
    app.post("/turmas", autenticacaoMiddleware, cadastro);

    /**
     * @swagger
     * /turma/{id}:
     *   put:
     *     summary: Atualizar turma
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
     *           example: 1
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             nome: "2º Ano A"
     *             anoEscolar: 2
     *             anoLetivo: 2026
     *             isAtivo: true
     *             periodoId: 1
     *     responses:
     *       200:
     *         description: Turma atualizada com sucesso
     *       400:
     *         description: Erro de validação
     *       404:
     *         description: Turma não encontrada
     *       401:
     *         description: Não autorizado
     */
    app.put("/turma/:id", autenticacaoMiddleware, alterar);
}