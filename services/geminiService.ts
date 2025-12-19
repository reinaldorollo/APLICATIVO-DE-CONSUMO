
import { GoogleGenAI } from "@google/genai";
import { FuelEntry } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFuelAnalysis = async (entries: FuelEntry[]) => {
  if (entries.length === 0) return "Adicione seu primeiro abastecimento para receber dicas!";

  const lastEntry = entries[0];
  const prompt = `Analise este registro de consumo de combustível e forneça uma dica rápida (máximo 2 frases) em português:
  - KM rodados: ${lastEntry.distance}km
  - Consumo: ${lastEntry.kmPerLiter.toFixed(2)} km/l
  - Custo por km: R$ ${lastEntry.costPerKm.toFixed(2)}
  Contexto: O usuário quer economizar combustível e manter o carro eficiente.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Continue monitorando seu consumo para melhores insights.";
  } catch (error) {
    console.error("Erro ao obter análise do Gemini:", error);
    return "Mantenha a calibragem dos pneus em dia para economizar até 3% de combustível.";
  }
};
