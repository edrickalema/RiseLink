import TextInputField from "@/components/ui/text-input";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChainDetailsFormProps {
  chainName: string;
  chainDescription: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
}

export const ChainDetailsForm: React.FC<ChainDetailsFormProps> = ({
  chainName,
  chainDescription,
  onNameChange,
  onDescriptionChange,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>chain details </Text>

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>chain Name </Text>

          <TextInputField
            value={chainName}
            placeholder='e.g., morning routine'
            placeholderTextColor='#9ca3af'
            onChangeText={onNameChange}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>description</Text>

          <TextInputField
            value={chainDescription}
            placeholder='e.g., start your day with energy'
            onChangeText={onDescriptionChange}
            placeholderTextColor='#9ca3af'
            style={styles.input}
            multiline
            numberOfLines={2}
          />
        </View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});
