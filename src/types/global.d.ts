export {}; // Marca como módulo

declare global {
  interface Window {
    api: {
      buscar: (itens: string[]) => void;
    };
  }
}
