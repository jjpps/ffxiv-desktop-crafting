import db from "../db";
import { Ingredient } from "../models/IngredientModel";
import { Recipe } from "../models/RecipeModel";

export function salvarReceita(recipe: Recipe) {   
  const insertReceita = db.prepare("INSERT OR IGNORE INTO receitas (nome) VALUES (?)");
  const getReceitaId = db.prepare("SELECT id FROM receitas WHERE nome = ?");
  const insertIngrediente = db.prepare(`
    INSERT INTO ingredientes (receita_id, nome, quantidade)
    VALUES (?, ?, ?)
  `);

  insertReceita.run(recipe.resultName);
  const { id } = getReceitaId.get(recipe.resultName) as { id: number };

  for (const ing of recipe.ingredients) {
    console.log(ing);
    console.log(id);
    insertIngrediente.run(id, ing.name, ing.amount);

    if (ing.subRecipe) {
      salvarReceita(ing.subRecipe); // recursivo!
    }
  }
}
export function buscarReceitaLocal(nome: string): Recipe | null {
  const receitaRow = db
    .prepare("SELECT id, nome FROM receitas WHERE nome = ?")
    .get(nome)  as { id: number; nome: string };;

  if (!receitaRow) return null;

  const ingredientesRows = db
    .prepare("SELECT nome, quantidade, descricao FROM ingredientes WHERE receita_id = ?")
    .all(receitaRow.id);

  const ingredientes: Ingredient[] = ingredientesRows.map((row: any) => {
    const subRecipe = buscarReceitaLocal(row.nome); // tenta montar subRecipe recursivamente
    return new Ingredient(row.nome, row.quantidade, row.descricao, subRecipe ?? undefined);
  });

  return new Recipe(receitaRow.nome, ingredientes);
}
