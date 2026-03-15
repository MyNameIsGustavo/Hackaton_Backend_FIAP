import { Application } from "express";
import { buscarTodos } from "./in/buscarTodos";
import { buscarPorID } from "./in/buscarPorID";
import { cadastro } from "./in/cadastrar";
import { alterar } from "./in/alterar";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";

export async function periodosRotas(app: Application) {
    app.get("/periodos", autenticacaoMiddleware, buscarTodos)
    app.get("/periodo/:id", autenticacaoMiddleware, buscarPorID)
    app.post("/periodo", autenticacaoMiddleware, cadastro)
    app.put("/periodo/:id", autenticacaoMiddleware, alterar)
}