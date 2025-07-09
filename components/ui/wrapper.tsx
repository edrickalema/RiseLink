import React from "react";
import { SafeAreaView } from "react-native";

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
        
        padding: 16,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
