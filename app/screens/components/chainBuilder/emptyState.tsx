import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🔗</Text>
      <Text style={styles.emptyTitle}>Start Building Your Chain</Text>
      <Text style={styles.emptyText}>
        Add your first habit above to begin creating your personalized habit
        chain. Chain habits together to build powerful routines!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
});
