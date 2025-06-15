function agruparMateriaisBaseMultiplos(receitas: any[]): Map<string, any> {
  const mapa = new Map<string, any>();

  function visitar(ingredientes: any[], multiplicador: number = 1) {
    for (const ing of ingredientes) {
      const total = ing.amount * multiplicador;

      if (!ing.subRecipe) {
        const existente = mapa.get(ing.name);
        if (existente) {
          existente.amount += total;
        } else {
          mapa.set(ing.name, {
            amount: total,
            description: ing.description
          });
        }
      } else {
        visitar(ing.subRecipe.ingredients, total);
      }
    }
  }

  for (const receita of receitas) {
    visitar(receita.ingredients, 1);
  }

  return mapa;
}
function gerarEtapasDeCraftMultiplos(receitas: any[]): string[] {
  const etapas: string[] = [];
  const criados = new Set<string>();

  function resolver(recipe: any) {
    for (const ing of recipe.ingredients) {
      if (ing.subRecipe && !criados.has(ing.subRecipe.resultName)) {
        resolver(ing.subRecipe);
        etapas.push(`Criar ${ing.subRecipe.resultName}`);
        criados.add(ing.subRecipe.resultName);
      }
    }
  }

  for (const receita of receitas) {
    resolver(receita);
    etapas.push(`Criar ${receita.resultName}`);
  }

  return etapas;
}
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("resultado")!;
  const receitasJson = localStorage.getItem("receitas");

  if (!receitasJson) {
    container.textContent = "Nenhum dado encontrado.";
    return;
  }

  const receitas: any[] = JSON.parse(receitasJson);

  // 1. Materiais base
  const materiais = agruparMateriaisBaseMultiplos(receitas);
  const titulo1 = document.createElement("h2");
  titulo1.textContent = "Materiais Base";
  container.appendChild(titulo1);

  const ulMateriais = document.createElement("ul");
  materiais.forEach(({ amount, description }, nome) => {
    const li = document.createElement("li");
    li.textContent = `${nome} x${amount}` + (description ? ` — ${description}` : "");
    ulMateriais.appendChild(li);
  });
  container.appendChild(ulMateriais);

  // 2. Etapas de Craft
  const titulo2 = document.createElement("h2");
  titulo2.textContent = "Ordens de Criação";
  container.appendChild(titulo2);

  const etapas = gerarEtapasDeCraftMultiplos(receitas);
  const ulEtapas = document.createElement("ul");
  etapas.forEach(etapa => {
    const li = document.createElement("li");
    li.textContent = etapa;
    ulEtapas.appendChild(li);
  });
  container.appendChild(ulEtapas);
});
