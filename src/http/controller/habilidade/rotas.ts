import { Application } from "express";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";
import { buscarHabilidades } from "./in/buscarHabilidades";
import { obterFiltros } from "./in/obterFiltros";

export async function habilidadeRotas(app: Application) {
    /**
     * @swagger
     * /habilidades/filtros:
     *   get:
     *     summary: Obter filtros (Matérias e Anos) para seleção da BNCC
     *     description: Retorna as matérias e anos disponíveis para filtrar as habilidades da BNCC.
     *     tags:
     *       - Habilidades BNCC
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Filtros obtidos com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 materias:
     *                   type: array
     *                   items:
     *                     type: string
     *                 anos:
     *                   type: array
     *                   items:
     *                     type: string
     *       401:
     *         description: Não autorizado
     */
    app.get("/habilidades/filtros", autenticacaoMiddleware, obterFiltros);

    /**
     * @swagger
     * /habilidades:
     *   get:
     *     summary: Listar habilidades filtradas para seleção do professor
     *     description: Retorna as habilidades da BNCC conforme os filtros aplicados (matéria, ano, etc.).
     *     tags:
     *       - Habilidades BNCC
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: materia
     *         schema:
     *           type: string
     *         description: Matéria para filtrar as habilidades
     *       - in: query
     *         name: ano
     *         schema:
     *           type: string
     *         description: Ano para filtrar as habilidades
     *       # adicione outros parâmetros de query conforme sua implementação
     *     responses:
     *       200:
     *         description: Lista de habilidades retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Habilidade'  # se você tiver um schema definido
     *       400:
     *         description: Parâmetros de filtro inválidos
     *       401:
     *         description: Não autorizado
     */
    app.get("/habilidades", autenticacaoMiddleware, buscarHabilidades);
}