import { prisma } from "../../prismaClient";
import bcrypt from "bcrypt";

export async function seedUsuarios() {
    const usuarios = [
        {
            nomeCompleto: "Professor Gustavo",
            email: "gustavo.professor@fiap.com.br",
            telefone: "15332234712",
            senha: await bcrypt.hash("docente123", 10),
            idade: 23,
            formacao: "Desenvolvedor de sistemas",
            especialidade: "Programação Full Stack",
            dataCadastro: new Date(),
            isAtivo: true,
        },
        {
            nomeCompleto: "Professor Chris",
            email: "chris.professor@fiap.com.br",
            telefone: "15332234712",
            senha: await bcrypt.hash("docente123", 10),
            idade: 23,
            formacao: "Desenvolvedor de sistemas",
            especialidade: "Programação Full Stack",
            dataCadastro: new Date(),
            isAtivo: true,
        },
        {
            nomeCompleto: "Professor Adriano",
            email: "adriano.professor@fiap.com.br",
            telefone: "15332234712",
            senha: await bcrypt.hash("docente123", 10),
            idade: 23,
            formacao: "Desenvolvedor de sistemas",
            especialidade: "Programação Full Stack",
            dataCadastro: new Date(),
            isAtivo: true,
        },
        {
            nomeCompleto: "Professora Gisele",
            email: "gisele.professor@fiap.com.br",
            telefone: "15332234712",
            senha: await bcrypt.hash("docente123", 10),
            idade: 23,
            formacao: "Desenvolvedora de sistemas",
            especialidade: "Programação Full Stack",
            dataCadastro: new Date(),
            isAtivo: true,
        },
    ];

    for (const usuario of usuarios) {
        const existente = await prisma.professor.findFirst({
            where: { email: usuario.email }
        });

        if (!existente) {
            await prisma.professor.create({
                data: usuario
            });
        }
    }

    console.log("Seed de professores concluído!");
}