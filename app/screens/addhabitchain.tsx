import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

import { CurrentHabit, Habit, HabitChain } from "@/types";
import { AddHabitForm } from "./components/chainBuilder/addHabitForm";
import { ChainDetailsForm } from "./components/chainBuilder/chainDetailsForm";
import { ChainHeader } from "./components/chainBuilder/chainHeader";
import { ChainPreview } from "./components/chainBuilder/chainPreview";
import { EmptyState } from "./components/chainBuilder/emptyState";
import { NotificationButton } from "./components/chainBuilder/notificationButton";
import { SaveChainButton } from "./components/chainBuilder/saveChainButton";
import { TimePicker } from "./components/chainBuilder/timePicker";

interface ChainBuilderProps {
  onSave: (chain: HabitChain) => void;
}

const ChainBuilder: React.FC<ChainBuilderProps> = ({ onSave }) => {
  const navigation = useNavigation();

  // State
  const [chainName, setChainName] = useState<string>("");
  const [chainDescription, setChainDescription] = useState<string>("");
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentHabit, setCurrentHabit] = useState<CurrentHabit>({
    name: "",
    duration: 5,
  });
  const [notificationTime, setNotificationTime] = useState("08:00");
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Animation states
  const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));
  const [slideAnim] = useState<Animated.Value>(new Animated.Value(50));

  const colors: string[] = [
    "#10b981",
    "#2563eb",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#06b6d4",
    "#f97316",
    "#84cc16",
    "#ec4899",
    "#6366f1",
  ];

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const addHabit = (): void => {
    if (currentHabit.name.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: currentHabit.name,
        duration: currentHabit.duration,
        completed: false,
        color: colors[habits.length % colors.length],
        animValue: new Animated.Value(0),
      };

      setHabits([...habits, newHabit]);
      setCurrentHabit({ name: "", duration: 5 });

      // Animate new habit entry
      if (newHabit.animValue) {
        Animated.spring(newHabit.animValue, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const removeHabit = (id: string): void => {
    const habitToRemove = habits.find((h) => h.id === id);
    if (habitToRemove && habitToRemove.animValue) {
      Animated.timing(habitToRemove.animValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setHabits(habits.filter((h) => h.id !== id));
      });
    }
  };

  const moveHabit = (index: number, direction: "up" | "down"): void => {
    const newHabits = [...habits];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < habits.length) {
      [newHabits[index], newHabits[targetIndex]] = [
        newHabits[targetIndex],
        newHabits[index],
      ];
      setHabits(newHabits);
    }
  };

  const saveChain = (): void => {
    if (chainName.trim() && habits.length > 0) {
      const newChain: HabitChain = {
        id: Date.now().toString(),
        name: chainName,
        description: chainDescription,
        habits: habits.map(({ animValue, ...habit }) => habit),
        isActive: false,
        currentStreak: 0,
        completionRate: 0,
      };

      onSave(newChain);

      // Reset with animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setChainName("");
        setChainDescription("");
        setHabits([]);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });

      Alert.alert("Success!", "Your habit chain has been saved successfully!");
    }
  };

  const handleTimeSelect = (time: string) => {
    setNotificationTime(time);
    setShowTimePicker(false);
  };

  const totalDuration = habits.reduce((acc, habit) => acc + habit.duration, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle='light-content' backgroundColor='#1e293b' />

      <ChainHeader
        navigation={navigation}
        fadeAnim={fadeAnim}
        slideAnim={slideAnim}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <ChainDetailsForm
          chainName={chainName}
          chainDescription={chainDescription}
          onNameChange={setChainName}
          onDescriptionChange={setChainDescription}
        />

        <AddHabitForm
          currentHabit={currentHabit}
          onHabitChange={setCurrentHabit}
          onAddHabit={addHabit}
        />

        {habits.length > 0 ? (
          <ChainPreview
            habits={habits}
            totalDuration={totalDuration}
            onRemoveHabit={removeHabit}
            onMoveHabit={moveHabit}
          />
        ) : (
          <EmptyState />
        )}

        <SaveChainButton
          onSave={saveChain}
          disabled={!chainName.trim() || habits.length === 0}
        />

        <NotificationButton
          notificationTime={notificationTime}
          onPress={() => setShowTimePicker(true)}
        />
      </Animated.View>

      <TimePicker
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onSelect={handleTimeSelect}
        initialTime={notificationTime}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
});

export default ChainBuilder;
