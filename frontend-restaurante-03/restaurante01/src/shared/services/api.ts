const API_URL = 'http://localhost:3000'; 

export const api = {
  async get(endpoint: string) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
};
