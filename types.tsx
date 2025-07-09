import { Animated } from "react-native";

export interface Habit {
  id: string;
  name: string;
  duration: number;
  completed: boolean;
  color: string;
  animValue?: Animated.Value;
}

export interface HabitChain {
  id: string;
  name: string;
  description: string;
  habits: Habit[];
  isActive: boolean;
  currentStreak: number;
  completionRate: number;
}

export interface CurrentHabit {
  name: string;
  duration: number;
}

export interface HabitItemProps {
  habit: Habit;
  index: number;
  totalHabits: number;
  onRemove: (id: string) => void;
  onMove: (index: number, direction: "up" | "down") => void;
}
