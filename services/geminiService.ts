import { GoogleGenAI, Type } from "@google/genai";
import { GameScenario } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScenario = async (): Promise<GameScenario> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    Generate a deep-dive historical financial comparison scenario for an educational game based on "The Intelligent Investor".
    
    1. Pick a specific year between 1970 and 2015 (ensuring at least a 10-year gap from present day).
    2. Select two real public companies from that era.
       - DIVERSITY REQUIREMENT: Frequently select companies from DIFFERENT countries (e.g., USA vs Japan, Germany vs UK, China vs USA) and potentially DIFFERENT sectors if they were competing for investor capital at the time.
       - One should be a "Value" winner (long-term success) and the other a "Growth trap" or underperformer.
    3. Provide DETAILED financial stats for that specific year.
       - IMPORTANT: Convert ALL monetary values (Market Cap, Revenue, etc.) to USD (United States Dollar) for fair comparison, even if the company reported in local currency.
    4. Include roughly 20 distinct data points per company.
    5. CRITICAL: Provide 'marketSharePercent' as a number (0-100).
    6. Provide the stock performance outcome over the next 10 years.
    
    The explanation must use Benjamin Graham's value investing principles (Margin of Safety, earnings stability, tangible assets vs hype).
  `;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          year: { type: Type.INTEGER },
          theme: { type: Type.STRING },
          sector: { type: Type.STRING, description: "The primary industry/sector context" },
          companyA: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              ticker: { type: Type.STRING },
              country: { type: Type.STRING, description: "Country of origin e.g. 'Japan', 'USA', 'Germany'" },
              description: { type: Type.STRING },
              stockPrice: { type: Type.STRING, description: "Price in USD" },
              marketCap: { type: Type.STRING, description: "Value in USD" },
              peRatio: { type: Type.NUMBER },
              dividendYield: { type: Type.STRING },
              beta: { type: Type.NUMBER },
              revenue: { type: Type.STRING, description: "Value in USD" },
              netIncome: { type: Type.STRING, description: "Value in USD" },
              eps: { type: Type.STRING, description: "Value in USD" },
              grossMargin: { type: Type.STRING },
              operatingMargin: { type: Type.STRING },
              totalAssets: { type: Type.STRING, description: "Value in USD" },
              totalLiabilities: { type: Type.STRING, description: "Value in USD" },
              totalDebt: { type: Type.STRING, description: "Value in USD" },
              cashAndEquivalents: { type: Type.STRING, description: "Value in USD" },
              bookValuePerShare: { type: Type.STRING, description: "Value in USD" },
              roe: { type: Type.STRING },
              currentRatio: { type: Type.NUMBER },
              debtToEquity: { type: Type.NUMBER },
              marketSharePercent: { type: Type.NUMBER, description: "Percentage 0-100" },
              employees: { type: Type.STRING }
            },
            required: ["name", "ticker", "country", "description", "stockPrice", "marketCap", "peRatio", "dividendYield", "beta", "revenue", "netIncome", "eps", "grossMargin", "operatingMargin", "totalAssets", "totalLiabilities", "totalDebt", "cashAndEquivalents", "bookValuePerShare", "roe", "currentRatio", "debtToEquity", "marketSharePercent", "employees"]
          },
          companyB: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              ticker: { type: Type.STRING },
              country: { type: Type.STRING },
              description: { type: Type.STRING },
              stockPrice: { type: Type.STRING },
              marketCap: { type: Type.STRING },
              peRatio: { type: Type.NUMBER },
              dividendYield: { type: Type.STRING },
              beta: { type: Type.NUMBER },
              revenue: { type: Type.STRING },
              netIncome: { type: Type.STRING },
              eps: { type: Type.STRING },
              grossMargin: { type: Type.STRING },
              operatingMargin: { type: Type.STRING },
              totalAssets: { type: Type.STRING },
              totalLiabilities: { type: Type.STRING },
              totalDebt: { type: Type.STRING },
              cashAndEquivalents: { type: Type.STRING },
              bookValuePerShare: { type: Type.STRING },
              roe: { type: Type.STRING },
              currentRatio: { type: Type.NUMBER },
              debtToEquity: { type: Type.NUMBER },
              marketSharePercent: { type: Type.NUMBER, description: "Percentage 0-100" },
              employees: { type: Type.STRING }
            },
            required: ["name", "ticker", "country", "description", "stockPrice", "marketCap", "peRatio", "dividendYield", "beta", "revenue", "netIncome", "eps", "grossMargin", "operatingMargin", "totalAssets", "totalLiabilities", "totalDebt", "cashAndEquivalents", "bookValuePerShare", "roe", "currentRatio", "debtToEquity", "marketSharePercent", "employees"]
          },
          outcome: {
            type: Type.OBJECT,
            properties: {
              winnerTicker: { type: Type.STRING },
              percentageGrowthA: { type: Type.NUMBER },
              percentageGrowthB: { type: Type.NUMBER },
              explanation: { type: Type.STRING },
              stockPriceHistoryA: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    year: { type: Type.STRING },
                    price: { type: Type.NUMBER }
                  }
                }
              },
              stockPriceHistoryB: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    year: { type: Type.STRING },
                    price: { type: Type.NUMBER }
                  }
                }
              }
            },
            required: ["winnerTicker", "percentageGrowthA", "percentageGrowthB", "explanation", "stockPriceHistoryA", "stockPriceHistoryB"]
          }
        },
        required: ["year", "theme", "sector", "companyA", "companyB", "outcome"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as GameScenario;
  }
  
  throw new Error("Failed to generate scenario");
};