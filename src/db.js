// src/db.js
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../db/recipes.db'));

function getRecipe(itemName) {
  const stmt = db.prepare(`
    SELECT i.name, ri.quantity
    FROM recipes r
    JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    JOIN items i ON i.id = ri.item_id
    WHERE r.result_item_name = ?
  `);
  return stmt.all(itemName);
}

module.exports = { getRecipe };
