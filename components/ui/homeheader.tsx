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

  if (hour < 12) return `good morning, ${name}! ☀️`;
  if (hour < 17) return `good afternoon, ${name}! 🌤️`;
  return `good evening, ${name}! 🌙`;
};

const HomeGreetingCard = ({ selectedChain }: { selectedChain?: boolean }) => {
  return (
    <Animated.View entering={FadeIn.duration(600)}>
      <LinearGradient
        colors={["#0f0f0f", "#2d2d2d", "#6b7280"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.greetingRow}>
          <Animated.Text entering={FadeInUp.duration(400)} style={styles.emoji}>
            👋
          </Animated.Text>
          <Animated.Text
            entering={FadeInUp.delay(100).duration(400)}
            style={[styles.greeting, { color: "#ffffff" }]}
          >
            {getGreeting()}
          </Animated.Text>
        </View>

        <Animated.Text
          entering={FadeInUp.delay(300).duration(400)}
          style={[styles.subtext, { color: "#ffffff" }]}
        >
          {selectedChain
            ? "keep the momentum going!"
            : "ready to build some great habits?"}
        </Animated.Text>

        {userData?.goals?.length > 0 && (
          <Animated.View
            entering={FadeInUp.delay(500).duration(500)}
            style={styles.badgeContainer}
          >
            {userData.goals.map((goal, index) => (
              <Animated.View
                key={goal}
                entering={FadeInUp.delay(600 + index * 100).duration(300)}
                style={styles.badge}
              >
                <Text style={styles.badgeText}>{goal}</Text>
              </Animated.View>
            ))}
          </Animated.View>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    gap: 10,
    width: width - 32,
    alignSelf: "center",
    marginVertical: 25,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emoji: {
    fontSize: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "lowercase",
  },
  subtext: {
    fontSize: 14,
    textAlign: "center",
    textTransform: "lowercase",
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  badge: {
    backgroundColor: "#c7d2fe",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#4338ca",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "lowercase",
  },
});

export default HomeGreetingCard;
