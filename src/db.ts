import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Cria pasta /data se não existir
const dbPath = path.join(__dirname, "data");
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath);
}

const db = new Database(path.join(dbPath, "crafting.sqlite"));

// Criação das tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS receitas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT UNIQUE
  );

  CREATE TABLE IF NOT EXISTS ingredientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    receita_id INTEGER,
    nome TEXT,
    quantidade INTEGER,
    descricao TEXT,
    FOREIGN KEY (receita_id) REFERENCES receitas(id)
  );
`);

export default db;
