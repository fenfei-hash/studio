"use server";

import { generateRoomDescription } from "@/ai/flows/dynamic-hospital-descriptions";

export async function getDynamicDescription(previousChoices: string[], currentScenario: string) {
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
