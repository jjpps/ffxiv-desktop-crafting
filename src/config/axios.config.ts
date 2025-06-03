import axios, { AxiosInstance } from "axios";

export default class AxiosConfig{
    static xivAPI: AxiosInstance = axios.create({
        baseURL:"https://v2.xivapi.com"
    });
}