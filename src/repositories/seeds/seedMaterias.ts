import { prisma } from "../../prismaClient";

export async function seedMaterias() {

    const materias = [
        {
            nome: "Matemática",
            areaConhecimento: "Ciências Exatas",
            dataCadastro: new Date(),
            isAtivo: true,
            periodoId: 1
        },
        {
            nome: "Português",
            areaConhecimento: "Linguagens",
            dataCadastro: new Date(),
            isAtivo: true,
            periodoId: 1
        },
        {
            nome: "História",
            areaConhecimento: "Ciências Humanas",
            dataCadastro: new Date(),
            isAtivo: true,
            periodoId: 2
        },
        {
            nome: "Biologia",
            areaConhecimento: "Ciências da Natureza",
            dataCadastro: new Date(),
            isAtivo: true,
            periodoId: 3
        }
    ];

    for (const materia of materias) {
        const existente = await prisma.materia.findFirst({
            where: {
                nome: materia.nome,
                areaConhecimento: materia.areaConhecimento
            }
        });

        if (!existente) {
            await prisma.materia.create({
                data: materia
            });
        }
    }

    console.log("Seed de matérias concluído!");
}