export class Ingredient {
  name: string;
  description?: string;
  amount: number;

  constructor(name: string, amount: number, description?: string) {
    this.name = name;
    this.amount = amount;
    this.description = description;
  }
}
