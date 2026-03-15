import type { IProfessorRepository } from "../../repositories/professor.repository.interface";
import { IProfessor } from "../../entities/interfaces/IProfessor";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'PRODUCAO' ? '.env' : '.env.dev';
dotenv.config({ path: envFile });

export class CadastroProfessorUseCase {
    constructor(private professorRepository: IProfessorRepository) { }

    async processar(dados: IProfessor): Promise<IProfessor | null> {
        dados.senha = await bcrypt.hash(dados.senha, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

        return await this.professorRepository.cadastrarProfessor(dados);
    }
}