import { Recipe } from "./RecipeModel";

export class Ingredient {
  name: string;
  amount: number;
  description?: string;
  subRecipe?: Recipe; // 👈 encadeamento recursivo

  constructor(name: string, amount: number, description?: string, subRecipe?: Recipe) {
    this.name = name;
    this.amount = amount;
    this.description = description;
    this.subRecipe = subRecipe;
  }
}
