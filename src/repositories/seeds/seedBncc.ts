// src/repositories/seeds/seedBncc.ts
import { prisma } from "../../prismaClient";

export async function seedBncc() {
    console.log("\n🚀 IMPORTAÇÃO FINAL (SEM UPSERT) - BNCC...");

    const endpoints = [
        { etapa: "Educação Infantil", url: "https://cientificar1992.pythonanywhere.com/bncc_infantil/" },
        { etapa: "Ensino Fundamental", url: "https://cientificar1992.pythonanywhere.com/bncc_fundamental/" },
        { etapa: "Ensino Médio", url: "https://cientificar1992.pythonanywhere.com/bncc_medio/" }
    ];

    const periodo = await prisma.periodo.findFirst() || { id: 1 };
    let totalSalvo = 0;

    for (const api of endpoints) {
        try {
            console.log(`\n📡 Conectando à Etapa: ${api.etapa}...`);
            const res = await fetch(api.url);
            const rawData: any = await res.json();

            for (const chaveDisciplina in rawData) {
                const disciplina = rawData[chaveDisciplina];
                const nomeMateria = disciplina.nome_disciplina || chaveDisciplina;

                // 1. Matéria
                let matDb = await prisma.materia.findFirst({ where: { nome: nomeMateria } });
                if (!matDb) {
                    matDb = await prisma.materia.create({
                        data: {
                            nome: nomeMateria,
                            areaConhecimento: api.etapa,
                            periodoId: periodo.id,
                            isAtivo: true,
                            dataCadastro: new Date()
                        }
                    });
                }

                const anos = disciplina.ano || [];
                for (const dadosAno of anos) {
                    const textoAno = String(dadosAno.nome_ano?.[0] || "1");
                    const anoNumerico = parseInt(textoAno.replace(/\D/g, "")) || 1;

                    for (const dadosUnidade of (dadosAno.unidades_tematicas || [])) {
                        const nomeUnidade = dadosUnidade.nome_unidade || "Geral";

                        // 2. Unidade
                        let unidadeDb = await prisma.unidadeTematica.findFirst({
                            where: { nome: nomeUnidade, materiaId: matDb.id }
                        });
                        if (!unidadeDb) {
                            unidadeDb = await prisma.unidadeTematica.create({
                                data: { nome: nomeUnidade, materiaId: matDb.id }
                            });
                        }

                        for (const dadosObjeto of (dadosUnidade.objeto_conhecimento || [])) {
                            const nomeObjeto = dadosObjeto.nome_objeto || "Geral";

                            // 3. Objeto
                            let objetoDb = await prisma.objetoConhecimento.findFirst({
                                where: { nome: nomeObjeto, unidadeTematicaId: unidadeDb.id }
                            });
                            if (!objetoDb) {
                                objetoDb = await prisma.objetoConhecimento.create({
                                    data: { nome: nomeObjeto, descricao: "BNCC", unidadeTematicaId: unidadeDb.id }
                                });
                            }

                            for (const dadosHab of (dadosObjeto.habilidades || [])) {
                                const textoCompleto = dadosHab.nome_habilidade;
                                if (!textoCompleto) continue;

                                const match = textoCompleto.match(/\((.*?)\)\s*(.*)/);
                                const codigo = match ? match[1] : `ID-${totalSalvo}`;
                                const descricao = match ? match[2] : textoCompleto;

                                try {
                                    // 4. Habilidade - BUSCA MANUAL
                                    const existe = await prisma.habilidadeBNCC.findFirst({
                                        where: { codigo: String(codigo) }
                                    });

                                    if (!existe) {
                                        await prisma.habilidadeBNCC.create({
                                            data: {
                                                codigo: String(codigo),
                                                descricao: String(descricao),
                                                anoEscolar: anoNumerico,
                                                objetoConhecimentoId: objetoDb.id
                                            }
                                        });
                                        totalSalvo++;
                                    }
                                } catch (e) {
                                    // Pula duplicados ou erros bobos
                                }
                            }
                        }
                    }
                }
                console.log(`   ✅ ${nomeMateria} finalizada.`);
            }
        } catch (e: any) {
            console.error(`❌ Erro na etapa ${api.etapa}:`, e.message);
        }
    }

    console.log(`\n✨ SUCESSO! Total real gravado no banco: ${totalSalvo}`);
}