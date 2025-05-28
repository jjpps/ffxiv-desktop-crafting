// src/renderer/renderer.js
async function buscar() {
    const nome = document.getElementById('itemName').value;
    const ingredientes = await window.electronAPI.buscarReceita(nome);
  
    const out = ingredientes.map(i => `${i.quantity}x ${i.name}`).join('\n');
    document.getElementById('saida').innerText = out;
  }
async function criarDbLocal() {
  await window.electronAPI.createLocalDB();
  
}
  