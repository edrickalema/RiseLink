import React from "react";
import { StyleSheet, Text, View } from "react-native";

const card = ({
  title,
  description,
  icon,
  onPress,
  style,
  disabled = false,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  style?: object;
  disabled?: boolean;
}) => {
  return (
    <View style={styles.featureCard}>
      {icon}
      <Text style={styles.featureText}>{title}</Text>
      {description && <Text style={styles.featureText}>{description}</Text>}
      {onPress && (
        <Text
          style={[
            styles.featureText,
            { color: disabled ? "#9ca3af" : "#2563eb" },
          ]}
          onPress={disabled ? undefined : onPress}
        >
          {disabled ? "Disabled" : "Learn More"}
        </Text>
      )}
    </View>
  );
};

export default card;

const styles = StyleSheet.create({
  featureCard: {
    width: "47%",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  featureText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
