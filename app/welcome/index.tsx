import Button from "@/components/ui/button";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import { Clock, Link, Target, TrendingUp, Zap } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const [pulseAnim] = useState(new Animated.Value(1));

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

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
    router.replace("/onboarding");
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["#f8fafc", "#f1f5f9", "#f7f8f9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
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

      {/* Scrollable Central Content */}
      <View
        style={styles.scrollContainer}
        // showsVerticalScrollIndicator={false}
      >
        {/* Animated Welcome Section */}
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
            styles.centered,
          ]}
        >
          <Animated.View style={{ marginBottom: 16 }}>
            <View className='rounded-full p-4 shadow-lg'>
              <Link size={50} color='#0f172a' />
            </View>
          </Animated.View>

          <Text className='text-[28px] font-bold text-slate-800'>welcome</Text>
          <Text className='text-muted-foreground text-[16px] text-center mt-2'>
            build better habits, one chain at a time
          </Text>
        </Animated.View>

        {/* Features Grid */}
        <Animated.View
          style={[
            styles.featureGrid,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.featureCard}>
            <Target size={32} color='#3b82f6' />
            <Text style={styles.featureText}>habit tracking</Text>
          </View>
          <View style={styles.featureCard}>
            <TrendingUp size={32} color='#22c55e' />
            <Text style={styles.featureText}>analytics</Text>
          </View>
          <View style={styles.featureCard}>
            <Zap size={32} color='#eab308' />
            <Text style={styles.featureText}>smart timer</Text>
          </View>
          <View style={styles.featureCard}>
            <Clock size={32} color='#a855f7' />
            <Text style={styles.featureText}>streak building</Text>
          </View>
        </Animated.View>

        {/* Get Started Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            width: "100%",
            marginTop: 20,
          }}
        >
          <Button variant='default' size='lg' onPress={handleGetStarted}>
            <Text className='text-white text-lg font-semibold'>
              get started
            </Text>
          </Button>
        </Animated.View>
      </View>

      {/* Floating Decorative Dots */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: "100%",
  },
  centered: {
    alignItems: "center",
    marginBottom: 32,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  featureCard: {
    width: (width - 56) / 2, // Responsive width accounting for padding and gap
    padding: 16,
    borderWidth: 1,
    borderColor: "transparent",
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
  featureText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
