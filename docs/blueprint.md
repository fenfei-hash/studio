# **App Name**: The Ward: Eyeless Escape

## Core Features:

- Interactive Story Navigation: Navigate through the story by making choices at decision nodes. The outcome of each choice affects the progression.
- Timed Decisions: Implement a 10-second countdown timer for each decision node. Failure to choose in time leads to a 'Game Over'.
- Single Correct Path: Ensure that only one choice at each decision node leads to continued progression. All other choices trigger unique death scenes.
- Jump Scare Ending: Present a sudden and startling visual (jump scare video/GIF) upon reaching a 'Game Over', then transition to a promotional movie poster.
- Hospital Environment Generator: Utilize generative AI to dynamically describe room characteristics, influencing Sarah's options and success chances based on prior player choices. Acts as a tool to increase sense of realism.
- Score keeping: Keeps track of game session metrics using the Firestore database, such as the number of times each option was picked, time to make each decision, number of retries needed for successful completion.

## Style Guidelines:

- Primary color: Deep crimson (#8B0000), evoking danger and intensity.
- Background color: Dark gray (#222222) provides a somber backdrop.
- Accent color: Pale Yellow (#FAFAD2), suggesting a sickly glow from old lights, provides contrast for key UI elements.
- Body text: 'Literata', a serif font giving the narrative a classical, unsettling feel.
- Use minimalistic, slightly distorted icons for navigation and choices.
- Emphasize a claustrophobic feel with narrow text columns and limited screen space.
- Incorporate flickering and distorted effects to mimic failing lights and Sarah's decaying sanity.