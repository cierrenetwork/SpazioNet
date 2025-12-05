import { GoogleGenAI } from "@google/genai";
import { ArticleSuggestion } from "../types";

const parseJSONFromMarkdown = (text: string): any => {
  try {
    // Try simple parse first
    return JSON.parse(text);
  } catch (e) {
    // Attempt to extract JSON from markdown code blocks
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (err) {
        console.error("Failed to parse extracted JSON block", err);
      }
    }
    // Attempt to find array brackets if no markdown
    const arrayMatch = text.match(/\[([\s\S]*)\]/);
    if (arrayMatch) {
      try {
        return JSON.parse(arrayMatch[0]);
      } catch (err) {
        console.error("Failed to parse array structure", err);
      }
    }
    return null;
  }
};

export const fetchSuggestions = async (teamName: string, verticalId: string): Promise<ArticleSuggestion[]> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // More precise date context for the "14 hours" constraint
  const now = new Date();
  const dateString = now.toLocaleDateString('it-IT', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const prompt = `
    Sei il Caporedattore di un importante network sportivo italiano che copre le notizie su: ${teamName}.
    
    Data e Ora corrente: ${dateString}.
    
    Obiettivo: Usa Google Search per trovare le ultimissime notizie, risultati, voci di calciomercato e polemiche riguardanti ${teamName}.
    
    VINCOLO CRITICO: Concentrati strettamente su notizie ed eventi accaduti o pubblicati nelle ULTIME 14 ORE. Ignora notizie più vecchie a meno che non ci sia un aggiornamento significativo nelle ultime 14 ore.
    
    Basandoti sui risultati della ricerca, genera 9 idee uniche per articoli.
    
    TUTTO IL CONTENUTO RESTITUITO DEVE ESSERE RIGOROSAMENTE IN ITALIANO.
    
    Per ogni idea, fornisci un oggetto JSON con queste proprietà:
    1. "topic": Argomento principale (in Italiano).
    2. "description": Breve descrizione del contenuto e dei fatti (in Italiano).
    3. "seoTitle": Titolo ottimizzato SEO (secco, keyword-focused, in Italiano).
    4. "discoverTitle": Titolo per Google Discover (emozionale, click-worthy ma onesto, curiosity gap, in Italiano).
    5. "category": 'Trending' (breaking news) o 'Evergreen' (approfondimento/storia).
    6. "score": Punteggio potenziale virale da 0 a 100 (numero intero).
    7. "reasoning": Spiegazione del perché questo articolo funzionerà (in Italiano).
    
    Restituisci SOLAMENTE un array JSON puro. Nessun markdown, nessun testo introduttivo.
    Esempio struttura:
    [
      { "topic": "...", "description": "...", "seoTitle": "...", "discoverTitle": "...", "category": "Trending", "score": 85, "reasoning": "..." }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    
    console.log("Raw Gemini Response:", text);

    const data = parseJSONFromMarkdown(text);

    if (!Array.isArray(data)) {
      throw new Error("Invalid response format from AI");
    }

    return data.map((item: any, index: number) => ({
      id: `${verticalId}-${Date.now()}-${index}`,
      topic: item.topic || "Argomento sconosciuto",
      description: item.description || "Nessuna descrizione disponibile.",
      seoTitle: item.seoTitle || "Titolo non disponibile",
      discoverTitle: item.discoverTitle || "Titolo non disponibile",
      category: (item.category === 'Trending' || item.category === 'Evergreen') ? item.category : 'Trending',
      score: typeof item.score === 'number' ? item.score : 50,
      reasoning: item.reasoning || "Nessuna motivazione disponibile.",
      sourceUrl: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.[0]?.web?.uri
    }));

  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};