import { Dimensions } from "react-native";

export const introSteps = [
  {
    id: 0,
    title: "// losing control? 📱",
    subtitle:
      "you scroll through hours of your day,\nput things off, and forget what matters most.\nit’s not that you’re lazy — you just need ==clarity and direction==.",
    showGlow: false,
  },
  {
    id: 1,
    title: "// feeling stuck and scattered? 🌀",
    subtitle:
      "**random habits** and **broken routines**\nleave you feeling ==drained== and ==frustrated==.\nit’s exhausting to keep starting over without progress.",
    showGlow: false,
  },
  {
    id: 2,
    title: "// why habit apps fail you ❌",
    subtitle:
      "most apps focus on **tracking tasks**, not transformation.\nwhen habits are isolated, there’s no system, no momentum.\nyou need ==structure==, not just streaks.",
    showGlow: false,
  },
  {
    id: 3,
    title: "// build your real life 💡",
    subtitle:
      "**RiseLink** helps you **connect habits into routines**\nthat align with your goals and values.\nbit by bit, you’ll become the person you’re ==meant to be.==",
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
