import XivApiClient from "../client/xivapi.client";

export default class XivApiService {
  private client = new XivApiClient();

  async buscarItem(itens: string[]): Promise<void> {
    for (const nome of itens) {
      const data = await this.client.buscarReceita(nome);
      console.log("Resultado do service:", data);
    }
  }
}
