import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft } from "lucide-react-native";

interface ChainHeaderProps {
  navigation: any;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export const ChainHeader: React.FC<ChainHeaderProps> = ({
  navigation,
  fadeAnim,
  slideAnim,
}) => {
  return (
    <LinearGradient
      colors={["#1e293b", "#334155", "#000"]}
      style={styles.header}
    >
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft color='#fff' size={24} />
      </Pressable>

      <Animated.View
        style={[
          styles.headerContent,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>🔗 Chain Builder</Text>
        <Text style={styles.subtitle}>Create your perfect habit chain</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 10,
    borderRadius: 8,
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5e1",
    opacity: 0.9,
  },
});
