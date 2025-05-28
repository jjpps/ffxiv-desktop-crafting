const path = require("path");
const Database = require("better-sqlite3");
const fs = require("fs");

const dbPath = path.join(__dirname, "crafting.db");
const db = new Database(dbPath);
// Cria tabela de receitas
db.prepare(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

`).run();

// Cria tabela de ingredientes de cada receita
db.prepare(`
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    result_item_name TEXT NOT NULL UNIQUE
  );
`).run();

// Cria tabela para armazenar materiais básicos sem receita (como shards, logs, ores)
db.prepare(`
 CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(recipe_id) REFERENCES recipes(id),
    FOREIGN KEY(item_id) REFERENCES items(id)
  );
`).run();

// Se quiser popular com alguns dados iniciais
// const stmt = db.prepare("INSERT OR IGNORE INTO recipes (item_name, amount_result) VALUES (?, ?)");
// stmt.run("Iron Ingot", 1);

console.log("Banco de dados configurado com sucesso!");
