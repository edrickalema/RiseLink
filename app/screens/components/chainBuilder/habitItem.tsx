import { HabitItemProps } from "@/types";
import React, { useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  index,
  totalHabits,
  onRemove,
  onMove,
}) => {
  const scale = habit.animValue || new Animated.Value(1);

  useEffect(() => {
    if (habit.animValue) {
      Animated.spring(habit.animValue, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  }, [habit.animValue]);

  return (
    <Animated.View
      style={[
        styles.habitItem,
        {
          transform: [{ scale }],
          opacity: habit.animValue || 1,
        },
      ]}
    >
      <View style={[styles.habitColor, { backgroundColor: habit.color }]} />

      <View style={styles.habitContent}>
        <Text style={styles.habitName}>{habit.name}</Text>
        <Text style={styles.habitDuration}>{habit.duration} minutes</Text>
      </View>

      <View style={styles.habitActions}>
        <TouchableOpacity
          style={[styles.actionBtn, { opacity: index === 0 ? 0.3 : 1 }]}
          onPress={() => onMove(index, "up")}
          disabled={index === 0}
        >
          <Text style={styles.actionText}>↑</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtn,
            { opacity: index === totalHabits - 1 ? 0.3 : 1 },
          ]}
          onPress={() => onMove(index, "down")}
          disabled={index === totalHabits - 1}
        >
          <Text style={styles.actionText}>↓</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => onRemove(habit.id)}
        >
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  habitItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  habitContent: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 2,
  },
  habitDuration: {
    fontSize: 12,
    color: "#6b7280",
  },
  habitActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  actionText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
  deleteBtn: {
    backgroundColor: "#fef2f2",
    borderColor: "#fca5a5",
  },
  deleteText: {
    fontSize: 18,
    color: "#dc2626",
    fontWeight: "600",
  },
});
