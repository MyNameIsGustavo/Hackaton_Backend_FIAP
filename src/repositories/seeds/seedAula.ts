import { prisma } from "../../prismaClient";

export async function seedAulas() {

    const aulas = [
        {
            nome: "Introdução à Matemática",
            objetivosAprendizagem: "Compreender conceitos básicos de matemática",
            dataAula: new Date(),
            isAtivo: true,
            turmaNome: "1º Ano A",
            materiaNome: "Matemática",
            professoresEmails: ["gustavo.professor@fiap.com.br"]
        },
        {
            nome: "Gramática Básica",
            objetivosAprendizagem: "Aprender regras básicas da língua portuguesa",
            dataAula: new Date(),
            isAtivo: true,
            turmaNome: "2º Ano A",
            materiaNome: "Português",
            professoresEmails: ["chris.professor@fiap.com.br"]
        },
        {
            nome: "História do Brasil",
            objetivosAprendizagem: "Entender o período colonial",
            dataAula: new Date(),
            isAtivo: true,
            turmaNome: "3º Ano A",
            materiaNome: "História",
            professoresEmails: ["adriano.professor@fiap.com.br"]
        }
    ];

    for (const aula of aulas) {

        const turma = await prisma.turma.findFirst({
            where: { nome: aula.turmaNome }
        });

        const materia = await prisma.materia.findFirst({
            where: { nome: aula.materiaNome }
        });

        const professores = await prisma.professor.findMany({
            where: {
                email: {
                    in: aula.professoresEmails
                }
            }
        });

        if (!turma) {
            console.log(`Turma não encontrada: ${aula.turmaNome}`);
            continue;
        }

        const existente = await prisma.aula.findFirst({
            where: {
                nome: aula.nome,
                turmaId: turma.id
            }
        });

        if (!existente) {
            await prisma.aula.create({
                data: {
                    nome: aula.nome,
                    objetivosAprendizagem: aula.objetivosAprendizagem,
                    dataAula: aula.dataAula,
                    isAtivo: aula.isAtivo,
                    turmaId: turma.id,
                    materiaId: materia?.id,

                    professores: {
                        connect: professores.map(p => ({ id: p.id }))
                    }
                }
            });
        }
    }

    console.log("Seed de aulas concluído!");
}