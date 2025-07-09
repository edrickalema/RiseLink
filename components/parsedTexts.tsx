// // This file is part of RiseLink, a React Native application.

import { StyleSheet, Text } from "react-native";

export const parseStyledText = (text: string) => {
  const regex = /(\*\*.*?\*\*|==.*?==)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <Text key={index} style={styles.boldText}>
          {part.slice(2, -2)}
        </Text>
      );
    } else if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <Text key={index} style={styles.highlightText}>
          {part.slice(2, -2)}
        </Text>
      );
    } else {
      return <Text key={index}>{part}</Text>;
    }
  });
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  boldText: {
    fontWeight: "bold",
    color: "#111827",
  },
  highlightText: {
    backgroundColor: "#fef9c3", // soft yellow or use "#e0f2fe" for blue
    paddingHorizontal: 5,
    borderRadius: 4,
    fontWeight: "600",
    color: "#92400e", // orange-dark text or blue-dark
  },
});
