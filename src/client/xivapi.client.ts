import AxiosConfig from "../config/axios.config";

export default class XivApiClient {
  public async buscarReceita(nome: string): Promise<any> {
    const params = {
      query: `ItemResult.Name="${nome}"`,
      sheets: "Recipe",
      fields:
        "Ingredient[].Name,Ingredient[].Description,AmountIngredient,ItemResult.Name",
    };
    const response = await AxiosConfig.xivAPI.get("/api/search", {
      params: params,
    });
    const data = response.data;
    if (!data?.results || data.results.length === 0) {     
      console.log('resultao do cliente',data);
      return data;
    }
  }
}
