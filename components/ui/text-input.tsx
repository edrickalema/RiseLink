import React from "react";
import { StyleSheet, TextInput } from "react-native";

type TextInputFieldProps = {
  chainDescription: string;
  placeholder?: string;
  setChainDescription: (description: string) => void;
  placeholderTextColor?: string;
};
export default function TextInputField({
  chainDescription,
  setChainDescription,
  placeholder = "e.g., Start your day with energy",
  placeholderTextColor,
}: TextInputFieldProps) {
  return (
    <TextInput
      style={styles.input}
      value={chainDescription}
      onChangeText={setChainDescription}
      placeholderTextColor={placeholderTextColor || "#9ca3af"}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
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
