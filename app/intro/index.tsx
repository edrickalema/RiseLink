import Button from "@/components/ui/button";
import { introSteps } from "@/utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, Text, View } from "react-native";

// Mock storage
const mockStorage: Record<string, string> = {
  "@breakfree:intro_complete": "true", // Change to "true" to simulate
};

const INTRO_COMPLETE_KEY = "@breakfree:intro_complete";

const { width, height } = Dimensions.get("window");

export default function IntroScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.8);
  const glowAnim = new Animated.Value(0);
  const pulseAnim = new Animated.Value(1);
  const rotateAnim = new Animated.Value(0);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Animate in content when step changes
  useEffect(() => {
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    scaleAnim.setValue(0.8);

    // Animate in
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
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  // Glow animation for steps that should glow
  useEffect(() => {
    if (introSteps[currentStep].showGlow) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [currentStep]);

  // Pulse animation for dots
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Continuous rotation for background elements
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleNext = () => {
    if (currentStep < introSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Simulate setting value in mock storage
      mockStorage[INTRO_COMPLETE_KEY] = "true";
      router.replace("/onboarding");
    }
  };

  const step = introSteps[currentStep];

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className='flex-1'>
      {/* Background Gradient */}
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
      />

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
          transform: [{ rotate: spin }],
        }}
      />

      <Animated.View
        style={{
          position: "absolute",
          bottom: height * 0.2,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: "rgba(168, 85, 247, 0.08)",
          transform: [{ rotate: spin }],
        }}
      />

      {/* Main Content */}
      <View className='flex-1 items-center justify-center px-6'>
        {/* Glow Effect for Title */}
        {step.showGlow && (
          <Animated.View
            style={{
              position: "absolute",
              top: "35%",
              left: "50%",
              width: 300,
              height: 100,
              marginLeft: -150,
              marginTop: -50,
              borderRadius: 50,
              backgroundColor: "rgba(59, 130, 246, 0.3)",
              opacity: glowAnim,
              transform: [
                {
                  scale: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.2],
                  }),
                },
              ],
            }}
          />
        )}

        {/* Title */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          }}
        >
          <Text className='text-[28px] leading-[36px] mb-[24px] max-w-[90%] text-center font-bold text-gray-800'>
            {step.title}
          </Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text
            className='leading-[26px] text-[18px] text-center max-w-[85%] text-gray-600'
            style={{ marginVertical: 20 }}
          >
            {step.subtitle}
          </Text>
        </Animated.View>

        {/* Progress Dots */}
        <Animated.View
          style={{
            flexDirection: "row",
            marginBottom: 40,
            opacity: fadeAnim,
          }}
        >
          {introSteps.map((_, idx) => (
            <Animated.View
              key={idx}
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor:
                  idx === currentStep ? "#4f46e5" : "rgba(107, 114, 128, 0.3)",
                marginHorizontal: 6,
                transform: [
                  {
                    scale: idx === currentStep ? pulseAnim : 1,
                  },
                ],
                shadowColor: idx === currentStep ? "#4f46e5" : "transparent",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: idx === currentStep ? 4 : 0,
              }}
            />
          ))}
        </Animated.View>

        {/* Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Button
            variant='default'
            size='lg'
            onPress={handleNext}
            style={{
              shadowColor: "#4f46e5",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            {step.isLastStep ? "Begin Your Journey" : "Continue"}
          </Button>
        </Animated.View>

        {/* Floating Particles */}
        <Animated.View
          style={{
            position: "absolute",
            top: "20%",
            left: "20%",
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "rgba(99, 102, 241, 0.4)",
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 50],
                  outputRange: [0, -20],
                }),
              },
            ],
          }}
        />

        <Animated.View
          style={{
            position: "absolute",
            top: "60%",
            right: "25%",
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: "rgba(168, 85, 247, 0.4)",
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 50],
                  outputRange: [0, 15],
                }),
              },
            ],
          }}
        />
      </View>
    </View>
  );
}
