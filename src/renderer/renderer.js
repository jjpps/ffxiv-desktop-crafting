// src/renderer/renderer.js
async function buscar() {
  const nome = document.getElementById("itemName").value;
  const ingredientes = await window.electronAPI.buscarReceita(nome);
  if (ingredientes) {
    const out = ingredientes.map((i) => `${i.quantity}x ${i.name}`).join("\n");
    document.getElementById("saida").innerText = out;
  } else {
    document.getElementById("saida").innerText = "Não encontrei Nada";
  }
}
