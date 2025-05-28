const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../db/recipes.db');

function creteDb() {
  // Abre o banco (cria se não existir)
const db = new Database(dbPath);

// Cria tabelas se ainda não existirem
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE
  );

  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    result_item_name TEXT UNIQUE
  );

  CREATE TABLE IF NOT EXISTS recipe_ingredients (
    recipe_id INTEGER,
    item_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
  );
`);
}

module.exports = {creteDb}