import { contextBridge } from "electron";
import XivApiService from "./services/xivapi.service";

const service = new XivApiService();

contextBridge.exposeInMainWorld("api", {
  buscar: async (itens: string[]) => {
    try {
      const data = await service.buscarReceita(itens);      
      return data;
    } catch (err) {
      console.error("Erro ao buscar itens:", err);
      throw err;
    }
  }
});
