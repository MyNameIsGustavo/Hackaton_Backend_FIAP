import { prisma } from "../../prismaClient";
import { IPlanoAulaRepository } from "../planoAula.repository.interface";
import { PlanoAula } from "../../entities/planoAula.entity";

export class PlanoAulaRepository implements IPlanoAulaRepository {
    async cadastrarPlano(dados: any): Promise<PlanoAula | null> {
        try {
            // 1. Buscamos a habilidade para obter o ID real (já que 'codigo' não é unique no schema)
            const habilidadeExistente = await prisma.habilidadeBNCC.findFirst({
                where: { codigo: dados.codigoHabilidade }
            });

            if (!habilidadeExistente) {
                throw new Error(`Habilidade BNCC ${dados.codigoHabilidade} não encontrada.`);
            }

            // 2. Criamos o plano usando o ID encontrado
            const planoCriado = await prisma.planoAula.create({
                data: {
                    aulaId: dados.aulaId,
                    objetivo: dados.objetivo,
                    metodologia: dados.metodologia,
                    recursosDidaticos: dados.recursosDidaticos,
                    avaliacao: dados.avaliacao,
                    dataCadastro: new Date(),
                    habilidadesBNCC: {
                        connect: { id: habilidadeExistente.id } // Usamos 'id' que é o campo único obrigatório
                    }
                }
            });

            return planoCriado as unknown as PlanoAula;
        } catch (error) {
            throw new Error(`Erro ao salvar Plano de Aula no banco: ${error}`);
        }
    }

    async buscarPlanosPorProfessor(
        professorId: number, 
        pagina: number, 
        limite: number, 
        termoBusca?: string
    ) {
        const skip = (pagina - 1) * limite;

        // Filtro: Planos vinculados a aulas que possuem o professor logado
        const whereClause: any = {
            aula: {
                professores: {
                    some: { id: professorId }
                }
            }
        };

        // Adiciona busca por termo no objetivo ou metodologia
        if (termoBusca) {
            whereClause.OR = [
                { objetivo: { contains: termoBusca, mode: 'insensitive' } },
                { metodologia: { contains: termoBusca, mode: 'insensitive' } }
            ];
        }

        const [planos, total] = await Promise.all([
            prisma.planoAula.findMany({
                where: whereClause,
                skip,
                take: limite,
                orderBy: { dataCadastro: 'desc' },
                include: {
                    aula: true,
                    habilidadesBNCC: true
                }
            }),
            prisma.planoAula.count({ where: whereClause })
        ]);

        return { 
            planos: planos as unknown as PlanoAula[], 
            total 
        };
    }
}