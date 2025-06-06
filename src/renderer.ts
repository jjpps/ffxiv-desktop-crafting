const itens: string[] = [];

const addButton = document.getElementById("addItem") as HTMLButtonElement;
const searchButton = document.getElementById("search") as HTMLButtonElement;

window.addEventListener("DOMContentLoaded", () => {
  addButton?.addEventListener("click", () => {
    const itemName = document.getElementById("itemName") as HTMLInputElement;
    if (itemName.value) {
      const table = document.getElementById("myTable") as HTMLTableElement;
      const row = table.insertRow(1);
      const name = row.insertCell(0);
      const qtd = row.insertCell(1);
      name.innerHTML = itemName.value;
      qtd.innerHTML = "1";
      itens.push(itemName.value);
      itemName.value = "";
      searchButton.style.display = "block";
    }
  });
  searchButton?.addEventListener("click", async () => {
    try {
      const resultado = await window.api.buscar(itens);      
      console.log("resultado no redner ",resultado);
      localStorage.setItem("receitas", JSON.stringify(resultado));
      window.location.href = "resultado.html"
    } catch (err) {
      console.error("Erro ao buscar no renderer:", err);
    }
  });
});
