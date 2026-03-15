import type { ILogin } from "../../entities/interfaces/ICredenciais";
import type { IProfessorRepository } from "../../repositories/professor.repository.interface";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

const envFile = process.env.NODE_ENV === 'PRODUCAO' ? '.env' : '.env.dev';
dotenv.config({ path: envFile });

export class LoginProfessorUseCase {
    constructor(private usuarioRepository: IProfessorRepository) { }

    async processar(dadosLogin: ILogin): Promise<string | false> {
        const professorSolicitado = await this.usuarioRepository.buscarProfessorPorEmail(dadosLogin.email);
        if (!professorSolicitado) return false;

        const senhaConfere = await bcrypt.compare(dadosLogin.senha, professorSolicitado.senha);
        if (!senhaConfere) return false;

        const jsonWebToken = jwt.sign(
            { id: professorSolicitado.id, email: professorSolicitado.email },
            process.env.SECRET_KEY as string, { expiresIn: "1h" });

        return jsonWebToken;
    }
}