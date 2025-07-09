import { height, predefinedHabits, width } from "@/utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import { Bell } from "lucide-react-native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInUp, ZoomIn } from "react-native-reanimated";

interface OnboardingScreenProps {
  onComplete: (userData: { name: string; goals: string[] }) => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const requestNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === "granted") {
      setStep(2);
    } else {
      // Optional: Show a warning or fallback
      alert("Please enable notifications to get timely habit reminders.");
    }
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [step, setStep] = useState(0); // Start from step 0 (name input)
  const [name, setName] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { id: "health", label: "Health & Fitness", icon: "💪" },
    { id: "productivity", label: "Productivity", icon: "⚡" },
    { id: "mindfulness", label: "Mindfulness", icon: "🧘" },
    { id: "learning", label: "Learning", icon: "📚" },
    { id: "creativity", label: "Creativity", icon: "🎨" },
    { id: "relationships", label: "Relationships", icon: "❤️" },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((g) => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleComplete = () => {
    // Here you would typically save the user's data to your backend or state management
    // onComplete({ name, goals: selectedGoals });
    console.log("User Data:", { name, goals: selectedGoals });
    router.replace("/(tabs)"); // Navigate to home after completion
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#f8fafc", "#f1f5f9", "#f7f8f9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: height,
        }}
      >
        {/* Animated Background Elements */}
        <Animated.View
          style={{
            position: "absolute",
            top: height * 0.1,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "rgba(99, 102, 241, 0.1)",
          }}
        />

        <Animated.View
          style={{
            position: "absolute",
            bottom: height * 0.04,
            left: -20,
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: "rgba(168, 85, 247, 0.08)",
          }}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            {step === 0 && (
              <Animated.View
                entering={FadeIn.duration(600)}
                style={styles.stepContainer}
              >
                <View style={styles.textCenter}>
                  <Animated.Text
                    entering={FadeInUp.duration(500)}
                    style={styles.title}
                  >
                    what's your name? ✍️
                  </Animated.Text>
                  <Animated.Text
                    entering={FadeInUp.delay(200).duration(500)}
                    style={styles.subtitle}
                  >
                    let’s make this journey personal to you.
                  </Animated.Text>
                </View>

                <View style={styles.inputContainer}>
                  <Animated.View entering={FadeInUp.delay(400).duration(500)}>
                    <TextInput
                      style={[
                        styles.textInput,
                        name.length > 0 && styles.textInputActive,
                      ]}
                      value={name}
                      onChangeText={setName}
                      placeholder='type your name here...'
                      placeholderTextColor='#9ca3af'
                    />
                  </Animated.View>

                  <Animated.View entering={FadeInUp.delay(600).duration(500)}>
                    <Button
                    variant="default"
                    // @ts-ignore
                      style={[
                        styles.button,
                        !name.trim() && styles.buttonDisabled,
                      ]}
                      onPress={() => setStep(1)}
                      disabled={!name.trim()}
                      size="lg"
                    >
                      <Text style={styles.buttonText}>continue →</Text>
                    </Button>
                  </Animated.View>
                </View>
              </Animated.View>
            )}

            {step === 1 && (
              <Animated.View
                entering={FadeIn.duration(600)}
                style={styles.stepContainer}
              >
                <View style={styles.textCenter}>
                  <Animated.View
                    entering={FadeInUp.duration(500)}
                    style={styles.bellContainer}
                  >
                    <Bell size={36} color='#10b981' />
                  </Animated.View>
                  <Animated.Text
                    entering={FadeInUp.duration(500)}
                    style={styles.title}
                  >
                    Stay On Track
                  </Animated.Text>
                  <Animated.Text
                    entering={FadeInUp.delay(200).duration(500)}
                    style={styles.subtitle}
                  >
                    Enable notifications to get daily habit chain reminders
                  </Animated.Text>
                </View>

                <Animated.View entering={FadeInUp.delay(400).duration(500)}>
                  <Button onPress={requestNotifications}>
                    <Text style={styles.buttonText}>Allow Notifications</Text>
                  </Button>
                </Animated.View>
              </Animated.View>
            )}

            {step === 2 && (
              <Animated.View
                entering={FadeIn.duration(600)}
                style={styles.stepContainer}
              >
                <View style={styles.textCenter}>
                  <Animated.Text
                    entering={FadeInUp.duration(500)}
                    style={styles.title}
                  >
                    👋, {name}
                  </Animated.Text>
                  <Animated.Text
                    entering={FadeInUp.delay(200).duration(500)}
                    style={styles.title}
                  >
                    What are your goals?
                  </Animated.Text>
                  <Animated.Text
                    entering={FadeInUp.delay(400).duration(500)}
                    style={styles.subtitle}
                  >
                    Select areas you'd like to improve
                  </Animated.Text>
                </View>

                <View style={styles.goalsGrid}>
                  {predefinedHabits.map((goal, index) => (
                    <Animated.View
                      key={goal.id}
                      entering={ZoomIn.delay(index * 100).duration(400)}
                    >
                      <TouchableOpacity
                        onPress={() => toggleGoal(goal.id)}
                        style={[
                          styles.goalButton,
                          selectedGoals.includes(goal.id) &&
                            styles.goalButtonSelected,
                        ]}
                      >
                        <Text style={styles.goalIcon}>{goal.emoji}</Text>
                        <Text style={styles.goalLabel}>{goal.label}</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </View>

                <Animated.View entering={FadeInUp.delay(600).duration(500)}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      selectedGoals.length === 0 && styles.buttonDisabled,
                    ]}
                    onPress={handleComplete}
                    disabled={selectedGoals.length === 0}
                  >
                    <Text style={styles.buttonText}>
                      Start Building Habits →
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  content: {
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  stepContainer: {
    gap: 24,
  },
  textCenter: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  inputContainer: {
    gap: 16,
  },
  textInputActive: {
    borderColor: "#3b82f6",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  bellContainer: {
    backgroundColor: "#e0f7ef",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    flexDirection: "row",
    gap: 16,
    alignSelf: "center",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
    maxWidth: 340,
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
  button: {
    width: "100%",
    padding: 16,
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  goalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  goalButton: {
    width: (width - 56) / 2, // Responsive width accounting for padding and gap
    padding: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  goalButtonSelected: {
    borderColor: "#3b82f6",
    backgroundColor: "#dbeafe",
    transform: [{ scale: 1.02 }],
  },
  goalIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
  },
});

export default OnboardingScreen;
