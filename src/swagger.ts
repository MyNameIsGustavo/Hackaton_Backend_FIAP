import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === 'PRODUCAO' ? '.env' : '.env.dev';
dotenv.config({ path: envFile });

export function configuracaoSwagger(app: Express) {
    const apis =
        process.env.NODE_ENV === "PRODUCAO"
            ? [`${process.cwd()}/dist/http/controller/**/*.js`]
            : [`${process.cwd()}/src/http/controller/**/*.ts`];
    const configuracaoSwagger = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Backend do Hackaton FIAP",
                version: "1.0.0",
                description: "Documentação da API Backend do Hackaton FIAP Swagger",
            },
            servers: [
                {
                    url: "http://localhost:9090",
                },
                {
                    url: "https://hackaton-backend-fiap.onrender.com",
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
        apis
    };

    const specs = swaggerJsdoc(configuracaoSwagger);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}