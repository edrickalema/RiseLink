import { Dimensions } from "react-native";

export const introSteps = [
  {
    id: 0,
    title: "you think you're in control? 🤔",
    subtitle:
      "you scroll past hours of your day,\nmake promises you don’t keep,\nand call it a routine?\nlet’s be honest — **you’re not in control!**",
    showGlow: false,
  },
  {
    id: 1,
    title: "// feeling scattered and stuck? 😩",
    subtitle:
      "you **start strong**, but your routines ==fall apart==.\nyour habits feel **random**, disconnected, and hard to stick with.\nit’s frustrating to feel like you’re always starting over.",
    showGlow: false,
  },
  {
    id: 2,
    title: "// why most habit apps fail you. 😟",
    subtitle:
      "they focus on **checking boxes** — not real change.\ntracking habits in ==isolation== doesn’t build **momentum**.\nyou need ==structure==, not scattered lists.",
    showGlow: false,
  },
  {
    id: 3,
    title: " // riselink helps you design your life. ✨",
    subtitle:
      "instead of tracking habits alone, you’ll **build connected routines**\nthat support your **goals** and shape your ==identity==.\nit’s not just about habits — it’s about becoming **who you want to be**.",
    showGlow: false,
    isLastStep: true,
  },
];

// Get screen dimensions
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

// Predefined habits for the onboarding process
export const predefinedHabits = [
  { id: "fitness", label: "Fitness", emoji: "💪" },
  { id: "focus", label: "Deep Work", emoji: "🧠" },
  { id: "faith", label: "Prayer / Faith", emoji: "🙏" },
  { id: "health", label: "Mental Clarity", emoji: "🧘" },
  { id: "learning", label: "Learning", emoji: "📚" },
  { id: "custom", label: "Something Else", emoji: "✨" },
];
