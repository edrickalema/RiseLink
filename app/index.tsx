import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, Text, View } from "react-native";

// Mock AsyncStorage
const mockStorage: Record<string, string> = {
  "@breakfree:intro_complete": "false", // toggle this for testing
};

const WelcomeScreen = () => {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isOnboardingComplete = false; // mock value

  // Router for navigation
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      const introComplete = mockStorage["@breakfree:intro_complete"];
      const hasSeenIntro = introComplete === "true";

      console.log(hasSeenIntro);
      setIsIntroComplete(hasSeenIntro);

      if (!hasSeenIntro) {
        router.replace("/intro");
      } else if (hasSeenIntro && isOnboardingComplete) {
        router.replace("/(tabs)");
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    router.push("/onboarding");
  };

  if (isLoading || isIntroComplete === null) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (!isIntroComplete) {
    return null;
  }

  return (
    <View>
      <Image
        source={{ uri: "https://via.placeholder.com/300x200" }}
        style={{ width: 300, height: 200 }}
      />
      <Text>💡 Reclaim Your Power</Text>
      <Text>
        You’re not broken. You’re just stuck in a cycle—and this is your way
        out.
      </Text>
      <Button title='Begin Your Journey' onPress={handleContinue} />
    </View>
  );
};

export default WelcomeScreen;
