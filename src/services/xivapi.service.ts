import XivApiClient from "../client/xivapi.client";
import { Ingredient } from "../models/IngredientModel";
import { Recipe } from "../models/RecipeModel";

export default class XivApiService {
  private client = new XivApiClient();
  //Metodo que buscar receitas e todos os seus ingredientes
  async buscarReceita(itens: string[]): Promise<Recipe[]> {
    const ingredientes: Ingredient[] = [];
    const recipes: Recipe[]=[];
    for (const nome of itens) {
      const data = await this.client.buscarReceita("Iron Labrys");
      if (data) {
        console.log("Resultado do data no service:", data);
        const ingredientFields = data[0].fields.Ingredient ?? [];
        console.log("Resultado do ingredientFields no service:", ingredientFields);
        const amountList: number[] = data[0].fields.AmountIngredient ?? [];
        for (let i = 0; i < ingredientFields.length; i++) {
          const name = ingredientFields[i]?.fields?.Name;
          const desc = ingredientFields[i]?.fields?.Description ?? "";
          const amount = amountList[i] ?? 0;

          if (name) {
            ingredientes.push(new Ingredient(name, amount, desc));
          }
        }
        const recipe =  new Recipe(data[0].fields.ItemResult?.fields.Name ?? nome, ingredientes);
        recipes.push(recipe);
      }
    }   
    console.log("resultado da receitas no service",recipes);
    return recipes; 
  }
}
