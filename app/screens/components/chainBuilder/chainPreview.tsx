import React from "react";
import { StyleSheet, Text, View } from "react-native";


import { HabitItem } from "./habitItem";
import { Habit } from "@/types";

interface ChainPreviewProps {
  habits: Habit[];
  totalDuration: number;
  onRemoveHabit: (id: string) => void;
  onMoveHabit: (index: number, direction: "up" | "down") => void;
}

export const ChainPreview: React.FC<ChainPreviewProps> = ({
  habits,
  totalDuration,
  onRemoveHabit,
  onMoveHabit,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.previewHeader}>
        <Text style={styles.sectionTitle}>chain preview</Text>
        <View style={styles.previewStats}>
          <Text style={styles.statsText}>
            {habits.length} habits • {totalDuration} min total
          </Text>
        </View>
      </View>

      <View style={styles.habitsContainer}>
        {habits.map((habit, index) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            index={index}
            totalHabits={habits.length}
            onRemove={onRemoveHabit}
            onMove={onMoveHabit}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  previewStats: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statsText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  habitsContainer: {
    // Individual habit items have their own margin
  },
});
