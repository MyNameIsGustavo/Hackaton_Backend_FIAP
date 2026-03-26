import { prisma } from "../../prismaClient";
import { IHabilidadeRepository } from "../habilidade.repository.interface";
import { HabilidadeBNCC } from "../../entities/habilidadeBNCC.entity";

export class HabilidadeRepository implements IHabilidadeRepository {
    async buscarPorCodigo(codigo: string): Promise<HabilidadeBNCC | null> {
        try {
            const habilidade = await prisma.habilidadeBNCC.findFirst({
                where: { codigo: codigo },
                include: {
                    objetoConhecimento: {
                        include: {
                            unidadeTematica: {
                                include: { materia: true }
                            }
                        }
                    }
                }
            });

            return habilidade as unknown as HabilidadeBNCC;
        } catch (error) {
            throw new Error(`Erro ao buscar habilidade no Postgres: ${error}`);
        }
    }

    async buscarFiltrosDisponiveis() {
        // Pega todos os anos escolares distintos no banco
        const anosNoBanco = await prisma.habilidadeBNCC.findMany({
            select: { anoEscolar: true },
            distinct: ['anoEscolar'],
            orderBy: { anoEscolar: 'asc' }
        });

        // Pega as matérias disponíveis
        const materias = await prisma.materia.findMany({
            select: { id: true, nome: true },
            orderBy: { nome: 'asc' }
        });

        return {
            anos: anosNoBanco.map((a: any) => a.anoEscolar),
            materias
        };
    }

    async listarComFiltros(params: { 
        busca?: string, 
        materiaId?: number, 
        anoEscolar?: number, 
        pagina: number, 
        limite: number 
    }) {
        const skip = (params.pagina - 1) * params.limite;
        const whereClause: any = {};

        // Filtro por Matéria (navegando pela hierarquia do schema.prisma)
        if (params.materiaId) {
            whereClause.objetoConhecimento = {
                unidadeTematica: {
                    materiaId: params.materiaId
                }
            };
        }

        // Filtro por Ano Escolar
        if (params.anoEscolar) {
            whereClause.anoEscolar = params.anoEscolar;
        }

        // Busca textual no código ou na descrição da habilidade
        if (params.busca) {
            whereClause.OR = [
                { codigo: { contains: params.busca, mode: 'insensitive' } },
                { descricao: { contains: params.busca, mode: 'insensitive' } }
            ];
        }

        const [habilidades, total] = await Promise.all([
            prisma.habilidadeBNCC.findMany({
                where: whereClause,
                skip,
                take: params.limite,
                orderBy: { codigo: 'asc' },
                include: {
                    objetoConhecimento: {
                        include: {
                            unidadeTematica: {
                                include: { materia: true }
                            }
                        }
                    }
                }
            }),
            prisma.habilidadeBNCC.count({ where: whereClause })
        ]);

        return { 
            habilidades: habilidades as unknown as HabilidadeBNCC[], 
            total 
        };
    }
}