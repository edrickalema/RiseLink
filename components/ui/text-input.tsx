import React from "react";
import { StyleSheet, TextInput } from "react-native";

type TextInputFieldProps = {
  chainDescription?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: object;
  placeholderTextColor?: string;
};
export default function TextInputField({
  placeholder = "e.g., Start your day with energy",
  placeholderTextColor,
  style,
  value = "",
  onChangeText = (text: string) => {},
}: TextInputFieldProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || "e.g., Drink water, Meditate, Read"}
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
  textInput: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    fontSize: 18,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
