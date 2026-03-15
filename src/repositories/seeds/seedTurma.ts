import { prisma } from "../../prismaClient";

export async function seedTurmas() {

    const turmas = [
        {
            nome: "1º Ano A",
            anoEscolar: 1,
            anoLetivo: 2026,
            isAtivo: true,
            periodoId: 1
        },
        {
            nome: "2º Ano A",
            anoEscolar: 2,
            anoLetivo: 2026,
            isAtivo: true,
            periodoId: 2
        },
        {
            nome: "3º Ano A",
            anoEscolar: 3,
            anoLetivo: 2026,
            isAtivo: true,
            periodoId: 3
        }
    ];

    for (const turma of turmas) {
        const existente = await prisma.turma.findFirst({
            where: {
                nome: turma.nome,
                anoLetivo: turma.anoLetivo
            }
        });

        if (!existente) {
            await prisma.turma.create({
                data: turma
            });
        }
    }

    console.log("Seed de turmas concluído!");
}