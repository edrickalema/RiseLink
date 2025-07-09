import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";

export const introSteps = [
  {
    id: 1,
    title: "Feel scattered and stuck?",
    subtitle: "Random habits and broken routines\nleaving you frustrated?",
    showGlow: false,
  },
  {
    id: 2,
    title: "Most habit apps fail you.",
    subtitle: "They track individual habits\ninstead of building life systems.",
    showGlow: false,
  },
  {
    id: 3,
    title: "Design your ideal life.",
    subtitle:
      "Build connected routines that stack together\nand transform who you become.",
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

