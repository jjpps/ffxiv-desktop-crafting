// src/main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getRecipe } = require('./db');
const { creteDb } = require('./init-db');


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'renderer/index.html'));
}

ipcMain.handle('buscar-receita', (event, nome) => {
  return getRecipe(nome);
});

ipcMain.handle('create-db',(event)=>{
  return creteDb();
})

app.whenReady().then(createWindow);
