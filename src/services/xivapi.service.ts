import XivApiClient from "../client/xivapi.client";
import { Ingredient } from "../models/IngredientModel";
import { Recipe } from "../models/RecipeModel";
import { buscarReceitaLocal, salvarReceita,limparBanco } from "../repositories/recipe.repository";

export default class XivApiService {
  private client = new XivApiClient();

  async buscarReceita(itens: string[]): Promise<Recipe[]> {
    const todas: Recipe[] = [];

    for (const nome of itens) {
      const receita = await this.buscarReceitaComCache(nome);
      if (receita) todas.push(receita);
    }

    return todas;
  }

  private async buscarReceitaComCache(nome: string, quantidade: number = 1): Promise<Recipe | null> {    

    const local = buscarReceitaLocal(nome);
    
    if (local) return local;

    const data = await this.client.buscarReceita(nome);
    if (!data || data.length === 0) return null;

    const result = data[0].fields;
    const ingredients: Ingredient[] = [];
    const ingredientFields = result.Ingredient ?? [];
    const amountList: number[] = result.AmountIngredient ?? [];

    for (let i = 0; i < ingredientFields.length; i++) {
      const ingName = ingredientFields[i]?.fields?.Name;
      const ingDesc = ingredientFields[i]?.fields?.Description ?? "";
      const ingAmount = amountList[i] ?? 0;

      if (ingName) {
        const subRecipe = await this.buscarReceitaComCache(ingName, ingAmount * quantidade);
        ingredients.push(
          new Ingredient(ingName, ingAmount * quantidade, ingDesc, subRecipe ?? undefined)
        );
      }
    }

    const receita = new Recipe(result.ItemResult?.fields?.Name ?? nome, ingredients);
    console.log("antes de salvar no banco");
    salvarReceita(receita);
    console.log("apos salvar no banco");
    return receita;
  }
  public limparBanco() {
    limparBanco();
  }
}
