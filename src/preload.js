// src/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  buscarReceita: (nome) => ipcRenderer.invoke('buscar-receita', nome)
});
contextBridge.executeInMainWorld('electronAPI',{
  createLocalDB:() => ipcRenderer.invoke('create-db')
});
