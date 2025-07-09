import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TimePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (time: string) => void;
  initialTime: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  visible,
  onClose,
  onSelect,
  initialTime,
}) => {
  const [hour, setHour] = useState(parseInt(initialTime.split(":")[0]));
  const [minute, setMinute] = useState(parseInt(initialTime.split(":")[1]));

  const confirm = () => {
    const formatted = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    onSelect(formatted);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType='slide'
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Set Notification Time</Text>

          <View style={styles.timeContainer}>
            <View style={styles.timeSection}>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setHour((hour + 23) % 24)}
              >
                <Text style={styles.timeButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.timeValue}>
                {hour.toString().padStart(2, "0")}
              </Text>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setHour((hour + 1) % 24)}
              >
                <Text style={styles.timeButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.separator}>:</Text>

            <View style={styles.timeSection}>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setMinute((minute + 55) % 60)}
              >
                <Text style={styles.timeButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.timeValue}>
                {minute.toString().padStart(2, "0")}
              </Text>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setMinute((minute + 5) % 60)}
              >
                <Text style={styles.timeButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={confirm}>
              <Text style={styles.confirmText}>Set Time</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    width: "85%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 24,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  timeSection: {
    alignItems: "center",
  },
  timeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  timeButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
  },
  timeValue: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
    minWidth: 40,
    textAlign: "center",
  },
  separator: {
    fontSize: 24,
    fontWeight: "600",
    color: "#6b7280",
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6b7280",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
  },
});
