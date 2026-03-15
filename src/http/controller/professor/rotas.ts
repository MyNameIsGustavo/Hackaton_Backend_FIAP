import { Application } from "express";
import { login } from "./in/login";
import { cadastro } from "./in/cadastrar";
import { buscarPorID } from "./in/buscarPorID";
import { buscarPorEmail } from "./in/buscarPorEmail";
import { buscarInformacoes } from "./in/buscarInformacoes";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";

export async function professorRotas(app: Application) {
    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Login do professor
     *     tags: [Professores]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - senha
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               senha:
     *                 type: string
     *                 minLength: 6
     *     responses:
     *       200:
     *         description: Login realizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *       400:
     *         description: Credenciais inválidas ou erro de validação
     */
    app.post("/login", login);


    /**
     * @swagger
     * /professor/cadastro:
     *   post:
     *     summary: Cadastrar um novo professor
     *     tags: [Professores]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - nomeCompleto
     *               - email
     *               - senha
     *               - telefone
     *               - idade
     *               - formacao
     *               - especialidade
     *               - isAtivo
     *             properties:
     *               nomeCompleto:
     *                 type: string
     *               email:
     *                 type: string
     *                 format: email
     *               senha:
     *                 type: string
     *                 minLength: 6
     *               telefone:
     *                 type: string
     *                 description: Número com DDD, 11 dígitos
     *               idade:
     *                 type: integer
     *                 minimum: 18
     *               formacao:
     *                 type: string
     *               especialidade:
     *                 type: string
     *               isAtivo:
     *                 type: boolean
     *     responses:
     *       201:
     *         description: Professor cadastrado com sucesso
     *       400:
     *         description: Erro de validação
     */
    app.post("/professor/cadastro", autenticacaoMiddleware, cadastro);

    /**
     * @swagger
     * /professor/{id}:
     *   get:
     *     summary: Buscar professor pelo ID
     *     tags: [Professores]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *           minimum: 1
     *         required: true
     *         description: ID do professor
     *     responses:
     *       200:
     *         description: Professor encontrado
     *       400:
     *         description: ID inválido
     *       404:
     *         description: Professor não encontrado
     */
    app.get("/professor/:id", autenticacaoMiddleware, buscarPorID)
    /**
     * @swagger
     * /professor/email/{email}:
     *   get:
     *     summary: Buscar professor pelo email
     *     tags: [Professores]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: email
     *         schema:
     *           type: string
     *           format: email
     *         required: true
     *         description: Email do professor
     *     responses:
     *       200:
     *         description: Professor encontrado
     *       400:
     *         description: Email inválido
     *       404:
     *         description: Professor não encontrado
     */
    app.get("/professor/email/:email", autenticacaoMiddleware, buscarPorEmail)
    /**
     * @swagger
     * /professor:
     *   get:
     *     summary: Buscar informações do professor logado
     *     tags: [Professores]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de professores
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   nomeCompleto:
     *                     type: string
     *                   email:
     *                     type: string
     *                   telefone:
     *                     type: string
     *                   idade:
     *                     type: integer
     *                   formacao:
     *                     type: string
     *                   especialidade:
     *                     type: string
     *                   isAtivo:
     *                     type: boolean
     *                   dataCadastro:
     *                     type: string
     *                     format: date-time
     *       401:
     *         description: Não autorizado
     */
    app.get("/professor", autenticacaoMiddleware, buscarInformacoes)
}