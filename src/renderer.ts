const itens: string[] = [];

const addButton = document.getElementById("addItem") as HTMLButtonElement;
const searchButton = document.getElementById("search") as HTMLButtonElement;
const resetButton = document.getElementById("limparBanco") as HTMLButtonElement;

window.addEventListener("DOMContentLoaded", () => {
  addButton?.addEventListener("click", () => {
    const itemName = document.getElementById("itemName") as HTMLInputElement;
    if (itemName.value) {
      const table = document.getElementById("myTable") as HTMLTableElement;
      const row = table.insertRow(1);
      const name = row.insertCell(0);      
      name.innerHTML = itemName.value;     
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
  resetButton?.addEventListener("click", async()=>{
    const confirmar = confirm("Tem certeza que deseja limpar todos os dados locais?");
    if (confirmar) {
      window.api.limparBanco();
      alert("Banco de dados local foi limpo com sucesso.");
      location.reload();
    }
  });
});
