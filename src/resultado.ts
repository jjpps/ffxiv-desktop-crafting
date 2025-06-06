function renderIngrediente(ing: any): HTMLElement {
  const li = document.createElement("li");
  li.textContent = `${ing.amount}x ${ing.name}`;

  if (ing.subRecipe) {
    const subUl = renderReceita(ing.subRecipe);
    li.appendChild(subUl);
  }

  return li;
}

function renderReceita(recipe: any): HTMLUListElement {
  const ul = document.createElement("ul");

  const title = document.createElement("li");
  title.innerHTML = `<strong>${recipe.resultName}</strong>`;
  ul.appendChild(title);

  for (const ing of recipe.ingredients) {
    ul.appendChild(renderIngrediente(ing));
  }

  return ul;
}

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("resultado")!;
  const receitasJson = localStorage.getItem("receitas");
  

  if (receitasJson) {
    const receitas = JSON.parse(receitasJson);
    console.log(receitas);

    for (const recipe of receitas) {
      const tree = renderReceita(recipe);
      container.appendChild(tree);
    }
  } else {
    container.textContent = "Nenhum dado de receita encontrado.";
  }
});
