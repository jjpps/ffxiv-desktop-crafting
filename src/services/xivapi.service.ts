import XivApiClient from "../client/xivapi.client";
import { Ingredient } from "../models/IngredientModel";
import { Recipe } from "../models/RecipeModel";

export default class XivApiService {
  private client = new XivApiClient();

  // Função pública chamada pelo preload
  async buscarReceita(itens: string[]): Promise<Recipe[]> {
    const todasReceitas: Recipe[] = [];

    for (const nome of itens) {
      const receitas = await this.buscarReceitaRecursiva(nome);
      if(receitas)
        todasReceitas.push(receitas);
    }

    return todasReceitas;
  }

  private async buscarReceitaRecursiva(
    nome: string,
    quantidade: number = 1
  ): Promise<Recipe | null> {    

    const data = await this.client.buscarReceita(nome);
    if (!data || data.length === 0) {
      return null; // material base, sem receita
    }

    const result = data[0].fields;
    const ingredientFields = result.Ingredient ?? [];
    const amountList: number[] = result.AmountIngredient ?? [];
    const ingredientes: Ingredient[] = [];

    for (let i = 0; i < ingredientFields.length; i++) {
      const ingName = ingredientFields[i]?.fields?.Name;
      const ingDesc = ingredientFields[i]?.fields?.Description ?? "";
      const ingAmount = amountList[i] ?? 0;

      if (ingName) {
        const subRecipe = await this.buscarReceitaRecursiva(ingName, ingAmount * quantidade);
        ingredientes.push(
          new Ingredient(ingName, ingAmount * quantidade, ingDesc, subRecipe ?? undefined)
        );
      }
    }

    return new Recipe(result.ItemResult?.fields?.Name ?? nome, ingredientes);
  }
}
