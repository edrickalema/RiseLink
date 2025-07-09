import ScreenWrapper from "@/components/ui/wrapper";
import { height } from "@/utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScreenWrapper>
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
      <Text>Welcome</Text>
    </ScreenWrapper>
  );
}
