
import { GoogleGenAI } from "@google/genai";
import type { HomeRun, Source } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function fetchWeeklyHomeRuns(): Promise<{ homeRuns: HomeRun[], sources: Source[] }> {
  try {
    const prompt = `
      List all notable MLB home runs hit this week, using today's date as the reference for "this week". For each home run, provide the following details:
      - Player's full name
      - The player's team (full name, e.g., 'New York Yankees')
      - The opposing team (full name)
      - The date of the game in 'Month Day, Year' format.
      - The estimated distance of the home run in feet. If the distance is not reported or unavailable, this field can be null.
      - A brief summary of the situation, like the inning, score, or if it was a significant moment (e.g., 'A 2-run shot in the bottom of the 8th to take the lead.').

      Return ONLY a valid JSON array of objects. Do not include markdown ticks, surrounding text, or explanations. The JSON schema should be: [{ "playerName": "string", "team": "string", "opponent": "string", "date": "string", "distance": number | null, "details": "string" }]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const jsonText = response.text.trim();
    
    // The model might wrap the JSON in markdown, so we need to clean it.
    let cleanedJsonText = jsonText;
    if (cleanedJsonText.startsWith('```json')) {
        cleanedJsonText = cleanedJsonText.substring(7, cleanedJsonText.length - 3).trim();
    } else if (cleanedJsonText.startsWith('```')) {
      cleanedJsonText = cleanedJsonText.substring(3, cleanedJsonText.length - 3).trim();
    }


    try {
        const data = JSON.parse(cleanedJsonText);
        return { homeRuns: data as HomeRun[], sources };
    } catch(parseError) {
        console.error("Error parsing JSON response from Gemini API:", parseError);
        console.error("Original response text:", jsonText);
        throw new Error("Failed to parse AI response. The data might be in an unexpected format.");
    }

  } catch (error) {
    console.error("Error fetching home run data from Gemini API:", error);
     if (error instanceof Error && error.message.startsWith("Failed to parse")) {
        throw error;
    }
    throw new Error("Failed to retrieve home run data. The AI may be busy or an error occurred.");
  }
}