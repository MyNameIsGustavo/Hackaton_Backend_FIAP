import { Application } from "express";
import { login } from "./in/login";
import { cadastro } from "./in/cadastrar";
import { buscarPorID } from "./in/buscarPorID";
import { buscarPorEmail } from "./in/buscarPorEmail";
import { buscarInformacoes } from "./in/buscarInformacoes";
import { autenticacaoMiddleware } from "../../../middleware/autenticacao-middleware";

export async function professorRotas(app: Application) {
    app.post("/login", login);
    app.post("/professor/cadastro", autenticacaoMiddleware, cadastro);
    app.get("/professor/:id", autenticacaoMiddleware, buscarPorID)
    app.get("/professor/email/:email", autenticacaoMiddleware, buscarPorEmail)
    app.get("/professor", autenticacaoMiddleware, buscarInformacoes)
}