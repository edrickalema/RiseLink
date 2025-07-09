import Button from "@/components/ui/button";
import HomeGreetingCard from "@/components/ui/homeheader";
import ScreenWrapper from "@/components/ui/wrapper";
import { height } from "@/utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { Text, View } from "react-native";

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
      <HomeGreetingCard />
      <Button onPress={() => router.push("/screens/addhabitchain")}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Plus size={18} color='#ffffff' />
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              fontSize: 15,
              textTransform: "lowercase",
            }}
          >
            add new chain
          </Text>
        </View>
      </Button>
    </ScreenWrapper>
  );
}
