// src/main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { getRecipe } = require("./db");
const db = require("./database/setup");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "renderer/index.html"));
}

ipcMain.handle("buscar-receita", (event, nome) => {
  const ingredientes = getRecipe(nome);
  if (ingredientes.length > 0) return ingredientes;
  else return null;
});

app.whenReady().then(createWindow);
