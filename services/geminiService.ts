
import { GoogleGenAI, Type } from "@google/genai";
import type { HomeRun } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function fetchWeeklyHomeRuns(): Promise<HomeRun[]> {
  try {
    const prompt = `
      List all notable MLB home runs hit this week. For each home run, provide the following details:
      - Player's full name
      - The player's team (full name, e.g., 'New York Yankees')
      - The opposing team (full name)
      - The date of the game in 'Month Day, Year' format.
      - The estimated distance of the home run in feet.
      - A brief summary of the situation, like the inning, score, or if it was a significant moment (e.g., 'A 2-run shot in the bottom of the 8th to take the lead.').

      Return at least 5 home runs, but no more than 20. If there are few home runs this week (e.g., All-Star break), just return the ones you can find.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              playerName: {
                type: Type.STRING,
                description: "Full name of the player who hit the home run."
              },
              team: {
                type: Type.STRING,
                description: "The full team name of the player."
              },
              opponent: {
                type: Type.STRING,
                description: "The opposing team's full name."
              },
              date: {
                type: Type.STRING,
                description: "Date of the game, e.g., 'July 20, 2024'."
              },
              distance: {
                type: Type.INTEGER,
                description: "Estimated distance of the home run in feet."
              },
              details: {
                type: Type.STRING,
                description: "A brief summary of the game situation for the home run."
              }
            },
            required: ["playerName", "team", "opponent", "date", "distance", "details"]
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    return data as HomeRun[];

  } catch (error) {
    console.error("Error fetching home run data from Gemini API:", error);
    throw new Error("Failed to retrieve home run data. The AI may be busy or an error occurred.");
  }
}
