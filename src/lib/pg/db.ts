import { Pool, type PoolClient } from 'pg';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'PRODUCAO' ? '.env' : '.env.dev';
dotenv.config({ path: envFile });

class Database {
    private pool: Pool;
    private client: PoolClient | null = null;

    constructor() {
        let connectionString: string = "";

        connectionString = `${process.env.DB_CONNECTION}`;
        
        if (!connectionString) {
            throw new Error('Variaveis não definida no .env');
        }

        const sslConfig = process.env.NODE_ENV === 'PRODUCAO' ? { rejectUnauthorized: true } : false;

        this.pool = new Pool({ connectionString, ssl: sslConfig, });
    }

    async conectar(): Promise<void> {
        try {
            this.client = await this.pool.connect();
            console.log('Conexão com o banco estabelecida!');
        } catch (error: any) {
            throw new Error(`Erro ao conectar ao banco de dados: ${error}`);
        }
    }

    async desconectar(): Promise<void> {
        try {
            await this.client?.release();
            await this.pool.end();
        } catch (error: any) {
            throw new Error('Erro ao desconectar do banco de dados', error);
        }
    }
}

export const bancoDeDados = new Database();