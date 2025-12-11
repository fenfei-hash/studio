"use server";

import { generateRoomDescription } from "@/ai/flows/dynamic-hospital-descriptions";
import { ai } from "@/ai/genkit";

export async function getDynamicDescription(previousChoices: string[], currentScenario: string) {
  // Check if the AI plugin is configured. If not, return a fallback.
  if (ai.listPlugins().length === 0) {
    console.warn("AI features are disabled. Missing GEMINI_API_KEY. Please add it to your .env file.");
    return "The air is thick with the smell of antiseptic and dread. Every shadow seems to writhe with a life of its own, and a profound sense of being watched sends shivers down your spine.";
  }

  try {
    const result = await generateRoomDescription({
      previousChoices,
      currentScenario,
    });
    return result.description;
  } catch (error) {
    console.error("Error generating dynamic description:", error);
    // Return a fallback description in case of AI error
    return "The air is thick with the smell of antiseptic and dread. Every shadow seems to writhe with a life of its own, and a profound sense of being watched sends shivers down your spine.";
  }
}
