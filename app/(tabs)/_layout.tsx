import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import { ChartColumn, House, Settings } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 72,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 8,
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: 13,
          paddingBottom: 6,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarItemStyle: {
          transitionDuration: "300ms",
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='analytics'
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => <ChartColumn size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
