
export interface HomeRun {
  playerName: string;
  team: string;
  opponent: string;
  date: string;
  distance: number | null;
  details: string;
}

export interface Source {
  // FIX: Made the `web` property optional to align with the Gemini API's `GroundingChunk` type, which may not always contain it. This resolves the type error.
  web?: {
    uri?: string;
    title?: string;
  };
}
