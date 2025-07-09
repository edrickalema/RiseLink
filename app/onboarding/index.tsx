import Button from "@/components/ui/button";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import { Link } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const [pulseAnim] = useState(new Animated.Value(1));

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Animate in content when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Pulse animation for thumbs up icon
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleGetStarted = () => {
    // @ts-ignore
    router.replace("/questions");
  };

  return (
    <View className='flex-1 flex justify-center relative p-4 '>
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

      {/* Decorative Background Elements */}
      <View
        style={{
          position: "absolute",
          top: height * 0.1,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "rgba(251, 146, 60, 0.1)",
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: height * 0.15,
          left: -30,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "rgba(245, 158, 11, 0.08)",
        }}
      />

      {/* Main Content */}
      <View className='flex-1'>
        {/* Trophy and Laurel Wreath Section */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          }}
          className='items-center mb-8'
        >
          {/* Thumbs Up Icon with Pulse Animation */}
          <Animated.View className='mb-4'>
            <View className='bg-white rounded-full p-4 shadow-lg'>
              <Link className='text-6xl' size={48} />
            </View>
          </Animated.View>

          <Text className='text-3xl font-bold  bg-clip-text'>Welcome</Text>

          <Text className='text-muted-foreground text-lg'>
            Build better habits, one link at a time
          </Text>
        </Animated.View>

        {/* Main Message */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className='mb-12'
        >
          <Text className='text-2xl font-bold text-gray-800 text-center leading-8 mb-4'>
            Let's start with some
          </Text>
          <Text className='text-2xl font-bold text-gray-800 text-center leading-8 mb-4'>
            questions to get your
          </Text>
          <Text className='text-2xl font-bold text-gray-800 text-center leading-8'>
            customized plan!
          </Text>
        </Animated.View>

        {/* Get Started Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className='w-full px-4'
        >
          <Button
            variant='default'
            size='lg'
            onPress={handleGetStarted}
            className='bg-slate-800 rounded-full py-4 shadow-lg'
          >
            <Text className='text-white text-lg font-semibold'>
              Get Started
            </Text>
          </Button>
        </Animated.View>

        {/* Decorative Dots */}
        <Animated.View
          style={{
            position: "absolute",
            top: "25%",
            left: "15%",
            opacity: fadeAnim,
          }}
        >
          <View className='w-2 h-2 bg-orange-400 rounded-full' />
        </Animated.View>

        <Animated.View
          style={{
            position: "absolute",
            top: "70%",
            right: "20%",
            opacity: fadeAnim,
          }}
        >
          <View className='w-3 h-3 bg-yellow-400 rounded-full' />
        </Animated.View>

        <Animated.View
          style={{
            position: "absolute",
            bottom: "30%",
            left: "25%",
            opacity: fadeAnim,
          }}
        >
          <View className='w-2 h-2 bg-orange-300 rounded-full' />
        </Animated.View>
      </View>
    </View>
  );
}
