import { CurrentHabit } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AddHabitFormProps {
  currentHabit: CurrentHabit;
  onHabitChange: (habit: CurrentHabit) => void;
  onAddHabit: () => void;
}

export const AddHabitForm: React.FC<AddHabitFormProps> = ({
  currentHabit,
  onHabitChange,
  onAddHabit,
}) => {
  const handleNameChange = (name: string) => {
    onHabitChange({ ...currentHabit, name });
  };

  const handleDurationChange = (text: string) => {
    const duration = parseInt(text) || 1;
    onHabitChange({ ...currentHabit, duration });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Add New Habit</Text>

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Habit Name</Text>
          <TextInput
            style={styles.input}
            value={currentHabit.name}
            onChangeText={handleNameChange}
            placeholder='e.g., Drink water, Meditate, Read'
            placeholderTextColor='#9ca3af'
          />
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.label}>Duration:</Text>
          <TextInput
            style={styles.durationInput}
            value={currentHabit.duration.toString()}
            onChangeText={handleDurationChange}
            keyboardType='numeric'
            maxLength={2}
          />
          <Text style={styles.durationLabel}>minutes</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddHabit}
          disabled={!currentHabit.name.trim()}
        >
          <LinearGradient
            colors={
              currentHabit.name.trim()
                ? ["#3b82f6", "#1d4ed8"]
                : ["#9ca3af", "#6b7280"]
            }
            style={styles.addButtonGradient}
          >
            <Text style={styles.addButtonText}>+ Add Habit</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1f2937",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  durationInput: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: "#1f2937",
    width: 60,
    textAlign: "center",
    marginHorizontal: 12,
  },
  durationLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  addButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  addButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
