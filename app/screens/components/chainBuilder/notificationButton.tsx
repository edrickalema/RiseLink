import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface NotificationButtonProps {
  notificationTime: string;
  onPress: () => void;
  disabled?: boolean;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({
  notificationTime,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.notificationButton}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#6366f1", "#4f46e5"]}
        style={styles.notificationGradient}
      >
        <Text style={styles.notificationText}>
          ⏰ Notify me at {notificationTime}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  notificationGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  notificationText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
