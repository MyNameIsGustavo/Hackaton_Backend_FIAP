import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

export const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get('/', (req, res) => { res.send('Hackaton: Full Stack Development | FIAP.') });

const PORT = Number(process.env.PORT_APP) || 9999;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});