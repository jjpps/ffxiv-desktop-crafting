import { Ingredient } from "./IngredientModel";

export class Recipe {
  resultName: string;
  ingredients: Ingredient[];

  constructor(resultName: string, ingredients: Ingredient[]) {
    this.resultName = resultName;
    this.ingredients = ingredients;
  }
}
