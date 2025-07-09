import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SaveChainButtonProps {
  onSave: () => void;
  disabled: boolean;
}

export const SaveChainButton: React.FC<SaveChainButtonProps> = ({
  onSave,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.saveButton, { opacity: disabled ? 0.5 : 1 }]}
      onPress={onSave}
      disabled={disabled}
    >
      <LinearGradient
        colors={disabled ? ["#9ca3af", "#6b7280"] : ["#10b981", "#059669"]}
        style={styles.saveButtonGradient}
      >
        <Text style={styles.saveButtonText}>💾 save chain</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  saveButtonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
