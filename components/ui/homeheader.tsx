import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const userData = {
  name: "Alex",
  goals: ["Read 20 books", "Run a marathon", "Learn React Native"],
};

const getGreeting = () => {
  const hour = new Date().getHours();
  const name = userData?.name || "there";

  if (hour < 12) return `Good morning, ${name}! ☀️`;
  if (hour < 17) return `Good afternoon, ${name}! 🌤️`;
  return `Good evening, ${name}! 🌙`;
};

const HomeGreetingCard = ({ selectedChain }: { selectedChain?: boolean }) => {
  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.wrapper}>
      {/* Background decorative shapes */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={[styles.decorativeCircle, styles.circle1]}
      />
      <Animated.View
        entering={FadeIn.delay(400).duration(1000)}
        style={[styles.decorativeCircle, styles.circle2]}
      />

      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Animated.View
            entering={FadeInUp.duration(600)}
            style={styles.emojiContainer}
          >
            <Text style={styles.emoji}>👋</Text>
          </Animated.View>

          <Animated.Text
            entering={FadeInUp.delay(200).duration(600)}
            style={styles.greeting}
          >
            {getGreeting()}
          </Animated.Text>
        </View>

        {/* Subtitle */}
        <Animated.Text
          entering={FadeInUp.delay(400).duration(600)}
          style={styles.subtext}
        >
          {selectedChain
            ? "Keep the momentum going!"
            : "Ready to build some great habits?"}
        </Animated.Text>

        {/* Bottom accent line */}
        <Animated.View
          entering={FadeIn.delay(1000).duration(800)}
          style={styles.accentLine}
        />
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: width - 24,
    alignSelf: "center",
    marginVertical: 20,
    position: "relative",
  },
  decorativeCircle: {
    position: "absolute",
    borderRadius: 50,
    opacity: 0.1,
  },
  circle1: {
    width: 80,
    height: 80,
    backgroundColor: "#64b5f6",
    top: -20,
    right: 20,
  },
  circle2: {
    width: 60,
    height: 60,
    backgroundColor: "#81c784",
    bottom: -15,
    left: 15,
  },
  container: {
    padding: 28,
    borderRadius: 24,
    alignItems: "center",
    minHeight: 200,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  headerSection: {
    alignItems: "center",
    gap: 16,
  },
  emojiContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  emoji: {
    fontSize: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#ffffff",
    letterSpacing: 0.5,
    textTransform: "lowercase",
  },
  subtext: {
    fontSize: 16,
    textAlign: "center",
    color: "#e0e7ff",
    marginVertical: 8,
    fontWeight: "400",
    letterSpacing: 0.3,
    textTransform: "lowercase",
  },
  goalsSection: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  goalsTitle: {
    fontSize: 14,
    color: "#a5b4fc",
    fontWeight: "600",
    textTransform: "lowercase",
    letterSpacing: 1,
  },

  //   paddingHorizontal: 12,
  //   alignItems: "center",
  // },
  // badgeSeparator: {
  //   width: 12,
  // },
  // badgeContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "center",
  //   gap: 12,
  //   maxWidth: "100%",
  // },
  // badge: {
  //   backgroundColor: "rgba(255, 255, 255, 0.95)",
  //   paddingHorizontal: 16,
  //   paddingVertical: 10,
  //   borderRadius: 25,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 8,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  // },
  // badgeIcon: {
  //   width: 6,
  //   height: 6,
  //   borderRadius: 3,
  //   backgroundColor: "#4f46e5",
  // },
  // badgeText: {
  //   color: "#1e293b",
  //   fontSize: 13,
  //   fontWeight: "600",
  //   textTransform: "lowercase",
  // },
  accentLine: {
    width: 60,
    height: 3,
    backgroundColor: "#64b5f6",
    borderRadius: 2,
    marginTop: 8,
    opacity: 0.7,
  },
});

export default HomeGreetingCard;
