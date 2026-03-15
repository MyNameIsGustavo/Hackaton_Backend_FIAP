import { prisma } from "../../prismaClient";

export async function seedPeriodos() {
    const periodos = [
        {
            nome: "Manhã",
            horarioInicio: "07:00",
            horarioFim: "12:00",
        },
        {
            nome: "Tarde",
            horarioInicio: "13:00",
            horarioFim: "18:00",
        },
        {
            nome: "Noite",
            horarioInicio: "19:00",
            horarioFim: "22:30",
        },
    ];

    for (const periodo of periodos) {

        const existente = await prisma.periodo.findFirst({
            where: {
                nome: periodo.nome,
                horarioInicio: periodo.horarioInicio,
                horarioFim: periodo.horarioFim,
            }
        });

        if (!existente) {
            await prisma.periodo.create({
                data: periodo
            });
        }
    }

    console.log("Seed de períodos concluído!");
}