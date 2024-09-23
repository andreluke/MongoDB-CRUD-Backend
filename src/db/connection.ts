import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()

const uri = process.env.DB_URI || 'TESTE';

const db = mongoose;

export function connect() {
    db.connect(uri, {
        maxPoolSize: 10,
    })
    .then(() => console.log("Conectando ao MongoDB"))
    .catch((e) => {
        console.error("Erro ao conectar ao MongoDB:", e.message);
    });

    process.on("SIGINT", async () => {
        try{
            console.log("Conexão com o MongoDB fechada");
            await mongoose.connection.close();
            process.exit(0);
        } catch(error) {
            console.error("Erro ao fechar a conexão com o MongoDB:", error);
            process.exit(1);
        }
    });
}

export async function disconnect() {
    console.log("Conexão com o MongoDB encerrada");
    await db.disconnect();
}