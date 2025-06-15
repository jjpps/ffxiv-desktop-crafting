import { app, BrowserWindow } from "electron";
import * as path from "path";
import "./db"; 
app.on("ready", () => {
  console.log("App is ready");

  const win = new BrowserWindow({
    width: 1024,
    height: 1300,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      contextIsolation: true,
      nodeIntegration: true,
    }
  });

  const indexHTML = path.join(__dirname + "/index.html");
  win
    .loadFile(indexHTML)
    .then(() => {
      // IMPLEMENT FANCY STUFF HERE
    })
    .catch((e: any) => console.error(e));
});
