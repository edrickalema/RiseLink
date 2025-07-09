// import Button from "@/components/ui/button";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "expo-router";
// import { ArrowLeft } from "lucide-react-native";
// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   Animated,
//   Dimensions,
//   Modal,
//   Pressable,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width, height } = Dimensions.get("window");

// interface Habit {
//   id: string;
//   name: string;
//   duration: number;
//   completed: boolean;
//   color: string;
//   animValue?: Animated.Value;
// }

// interface HabitChain {
//   id: string;
//   name: string;
//   description: string;
//   habits: Habit[];
//   isActive: boolean;
//   currentStreak: number;
//   completionRate: number;
// }

// interface ChainBuilderProps {
//   onSave: (chain: HabitChain) => void;
// }

// interface CurrentHabit {
//   name: string;
//   duration: number;
// }

// interface HabitItemProps {
//   habit: Habit;
//   index: number;
// }

// const ChainBuilder: React.FC<ChainBuilderProps> = ({ onSave }) => {
//   const naviagtion = useNavigation();
//   useEffect(() => {
//     naviagtion.setOptions({
//       headerShown: false,
//     });
//   }, []);
//   const [chainName, setChainName] = useState<string>("");
//   const [chainDescription, setChainDescription] = useState<string>("");
//   const [habits, setHabits] = useState<Habit[]>([]);
//   const [currentHabit, setCurrentHabit] = useState<CurrentHabit>({
//     name: "",
//     duration: 5,
//   });
//   const [notificationtime, setnotificationtime] = useState("08:00");
//   const [showtimepicker, setshowtimepicker] = useState(false);

//   // Animation states
//   const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));
//   const [slideAnim] = useState<Animated.Value>(new Animated.Value(50));

//   const colors: string[] = [
//     "#10b981",
//     "#2563eb",
//     "#f59e0b",
//     "#8b5cf6",
//     "#ef4444",
//     "#06b6d4",
//     "#f97316",
//     "#84cc16",
//     "#ec4899",
//     "#6366f1",
//   ];

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, slideAnim]);

//   const addHabit = (): void => {
//     if (currentHabit.name.trim()) {
//       const newHabit: Habit = {
//         id: Date.now().toString(),
//         name: currentHabit.name,
//         duration: currentHabit.duration,
//         completed: false,
//         color: colors[habits.length % colors.length],
//         animValue: new Animated.Value(0),
//       };

//       setHabits([...habits, newHabit]);
//       setCurrentHabit({ name: "", duration: 5 });

//       // Animate new habit entry
//       if (newHabit.animValue) {
//         Animated.spring(newHabit.animValue, {
//           toValue: 1,
//           tension: 100,
//           friction: 8,
//           useNativeDriver: true,
//         }).start();
//       }
//     }
//   };

//   // Handlers for input changes and time selection
//   const handledurationchange = (text: string) => {
//     const duration = parseInt(text) || 1;
//     setCurrentHabit({ ...currentHabit, duration });
//   };

//   const handlehabitnamechange = (text: string) => {
//     setCurrentHabit({ ...currentHabit, name: text });
//   };

//   const handletimeselect = (time: string) => {
//     setnotificationtime(time);
//     setshowtimepicker(false);
//   };

//   const totalduration = habits.reduce((acc, h) => acc + h.duration, 0);

//   const removeHabit = (id: string): void => {
//     const habitToRemove = habits.find((h) => h.id === id);
//     if (habitToRemove && habitToRemove.animValue) {
//       Animated.timing(habitToRemove.animValue, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => {
//         setHabits(habits.filter((h) => h.id !== id));
//       });
//     }
//   };

//   const moveHabit = (index: number, direction: "up" | "down"): void => {
//     const newHabits = [...habits];
//     const targetIndex = direction === "up" ? index - 1 : index + 1;

//     if (targetIndex >= 0 && targetIndex < habits.length) {
//       [newHabits[index], newHabits[targetIndex]] = [
//         newHabits[targetIndex],
//         newHabits[index],
//       ];
//       setHabits(newHabits);
//     }
//   };

//   const saveChain = (): void => {
//     if (chainName.trim() && habits.length > 0) {
//       const newChain: HabitChain = {
//         id: Date.now().toString(),
//         name: chainName,
//         description: chainDescription,
//         habits: habits.map(({ animValue, ...habit }) => habit),
//         isActive: false,
//         currentStreak: 0,
//         completionRate: 0,
//       };

//       onSave(newChain);

//       // Reset with animation
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => {
//         setChainName("");
//         setChainDescription("");
//         setHabits([]);
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }).start();
//       });

//       Alert.alert("Success!", "Your habit chain has been saved successfully!");
//     }
//   };

//   const handleDurationChange = (text: string): void => {
//     const parsedDuration = parseInt(text) || 1;
//     setCurrentHabit({ ...currentHabit, duration: parsedDuration });
//   };

//   const handleHabitNameChange = (text: string): void => {
//     setCurrentHabit({ ...currentHabit, name: text });
//   };

//   const totalDuration: number = habits.reduce(
//     (acc, habit) => acc + habit.duration,
//     0
//   );

//   const HabitItem: React.FC<HabitItemProps> = ({ habit, index }) => {
//     const scale = habit.animValue || new Animated.Value(1);

//     useEffect(() => {
//       if (habit.animValue) {
//         Animated.spring(habit.animValue, {
//           toValue: 1,
//           tension: 100,
//           friction: 8,
//           useNativeDriver: true,
//         }).start();
//       }
//     }, [habit.animValue]);

//     return (
//       <Animated.View
//         style={[
//           styles.habitItem,
//           {
//             transform: [{ scale }],
//             opacity: habit.animValue || 1,
//           },
//         ]}
//       >
//         <View style={[styles.habitColor, { backgroundColor: habit.color }]} />
//         <View style={styles.habitContent}>
//           <Text style={styles.habitName}>{habit.name}</Text>
//           <Text style={styles.habitDuration}>{habit.duration} minutes</Text>
//         </View>
//         <View style={styles.habitActions}>
//           <TouchableOpacity
//             style={[styles.actionBtn, { opacity: index === 0 ? 0.3 : 1 }]}
//             onPress={() => moveHabit(index, "up")}
//             disabled={index === 0}
//           >
//             <Text style={styles.actionText}>↑</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.actionBtn,
//               { opacity: index === habits.length - 1 ? 0.3 : 1 },
//             ]}
//             onPress={() => moveHabit(index, "down")}
//             disabled={index === habits.length - 1}
//           >
//             <Text style={styles.actionText}>↓</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.actionBtn, styles.deleteBtn]}
//             onPress={() => removeHabit(habit.id)}
//           >
//             <Text style={styles.deleteText}>×</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     );
//   };

//   interface timepickerprops {
//     visible: boolean;
//     onclose: () => void;
//     onselect: (time: string) => void;
//     initialtime: string;
//   }
//   // time picker component
//   const TimePicker: React.FC<timepickerprops> = ({
//     visible,
//     onclose,
//     onselect,
//     initialtime,
//   }) => {
//     const [hour, sethour] = useState(parseInt(initialtime.split(":")[0]));
//     const [minute, setminute] = useState(parseInt(initialtime.split(":")[1]));

//     const confirm = () => {
//       const formatted = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
//       onselect(formatted);
//     };

//     return (
//       <Modal
//         visible={visible}
//         transparent
//         animationType='slide'
//         onRequestClose={onclose}
//       >
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "#000000aa",
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: "#fff",
//               padding: 20,
//               borderRadius: 16,
//               width: "80%",
//             }}
//           >
//             <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
//               set time
//             </Text>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-around",
//                 marginBottom: 20,
//               }}
//             >
//               <TouchableOpacity onPress={() => sethour((hour + 23) % 24)}>
//                 <Text>-</Text>
//               </TouchableOpacity>
//               <Text>{hour.toString().padStart(2, "0")}</Text>
//               <TouchableOpacity onPress={() => sethour((hour + 1) % 24)}>
//                 <Text>+</Text>
//               </TouchableOpacity>

//               <Text>:</Text>

//               <TouchableOpacity onPress={() => setminute((minute + 55) % 60)}>
//                 <Text>-</Text>
//               </TouchableOpacity>
//               <Text>{minute.toString().padStart(2, "0")}</Text>
//               <TouchableOpacity onPress={() => setminute((minute + 5) % 60)}>
//                 <Text>+</Text>
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between" }}
//             >
//               <TouchableOpacity onPress={onclose}>
//                 <Text>cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={confirm}>
//                 <Text>set</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     );
//   };

//   return (
//     <ScrollView
//       style={styles.scrollView}
//       // contentContainerStyle={styles.container}
//       showsVerticalScrollIndicator={false}
//     >
//       <StatusBar barStyle='light-content' backgroundColor='#1e293b' />

//       <LinearGradient
//         colors={["#1e293b", "#334155", "#000"]}
//         style={styles.header}
//       >
//         <Pressable
//           style={{
//             backgroundColor: "rgba(0, 0, 0, 0.3)",
//             marginRight: 10,
//             padding: 10,
//           }}
//           onPress={() => naviagtion.goBack()}
//         >
//           <ArrowLeft style={{}} color={"#fff"} />
//         </Pressable>

//         <Animated.View
//           style={[
//             styles.headerContent,
//             {
//               opacity: fadeAnim,
//               transform: [{ translateY: slideAnim }],
//             },
//           ]}
//         >
//           <Text style={styles.title}>🔗 chain builder</Text>
//           <Text style={styles.subtitle}>create your perfect habit chain</Text>
//         </Animated.View>
//       </LinearGradient>

//       <View

//       //
//       >
//         <Animated.View
//           style={[
//             styles.content,
//             {
//               opacity: fadeAnim,
//               transform: [{ translateY: slideAnim }],
//             },
//           ]}
//         >
//           {/* Chain Info */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>chain details</Text>
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>chain name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={chainName}
//                 onChangeText={setChainName}
//                 placeholder='e.g., Morning Routine'
//                 placeholderTextColor='#9ca3af'
//               />
//             </View>
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>description</Text>
//               <TextInput
//                 style={styles.input}
//                 value={chainDescription}
//                 onChangeText={setChainDescription}
//                 placeholder='e.g., start your day with energy'
//                 placeholderTextColor='#9ca3af'
//               />
//             </View>
//           </View>

//           {/* Add Habit */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>add new habit</Text>
//             <View style={styles.addHabitCard}>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.input}
//                   value={currentHabit.name}
//                   onChangeText={handleHabitNameChange}
//                   placeholder='Habit name (e.g., Drink water)'
//                   placeholderTextColor='#9ca3af'
//                 />
//               </View>
//               <View style={styles.durationContainer}>
//                 <Text style={styles.label}>Duration:</Text>
//                 <TextInput
//                   style={styles.durationInput}
//                   value={currentHabit.duration.toString()}
//                   onChangeText={handleDurationChange}
//                   keyboardType='numeric'
//                   maxLength={2}
//                 />
//                 <Text style={styles.durationLabel}>minutes</Text>
//               </View>
//               <TouchableOpacity style={styles.addButton} onPress={addHabit}>
//                 <LinearGradient
//                   colors={["#3b82f6", "#1d4ed8"]}
//                   style={styles.addButtonGradient}
//                 >
//                   <Text style={styles.addButtonText}>+ add habit</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Chain Preview */}
//           {habits.length > 0 && (
//             <View style={styles.section}>
//               <View style={styles.previewHeader}>
//                 <Text style={styles.sectionTitle}>chain preview</Text>
//                 <View style={styles.previewStats}>
//                   <Text style={styles.statsText}>
//                     {habits.length} habits • {totalDuration} min total
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.habitsContainer}>
//                 {habits.map((habit, index) => (
//                   <HabitItem key={habit.id} habit={habit} index={index} />
//                 ))}
//               </View>
//             </View>
//           )}

//           {/* Save Button */}
//           <TouchableOpacity
//             style={[
//               styles.saveButton,
//               {
//                 opacity: !chainName.trim() || habits.length === 0 ? 0.5 : 1,
//               },
//             ]}
//             onPress={saveChain}
//             disabled={!chainName.trim() || habits.length === 0}
//           >
//             <LinearGradient
//               colors={["#10b981", "#059669"]}
//               style={styles.saveButtonGradient}
//             >
//               <Text style={styles.saveButtonText}>💾 save chain</Text>
//             </LinearGradient>
//           </TouchableOpacity>

//           <Button
//             onPress={() => setshowtimepicker(true)}
//             style={{ marginTop: 20 }}
//           >
//             <Text>⏰ notify me at {notificationtime}</Text>
//           </Button>

//           {/* Empty State */}
//           {habits.length === 0 && (
//             <View style={styles.emptyState}>
//               <Text style={styles.emptyIcon}>🔗</Text>
//               <Text style={styles.emptyText}>
//                 Add your first habit to start building your chain!
//               </Text>
//             </View>
//           )}
//         </Animated.View>
//       </View>

//       {/* time picker */}
//       <TimePicker
//         visible={showtimepicker}
//         onclose={() => setshowtimepicker(false)}
//         onselect={handletimeselect}
//         initialtime={notificationtime}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//   },
//   header: {
//     paddingTop: 50,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headerContent: {
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#ffffff",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#cbd5e1",
//     opacity: 0.9,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     padding: 20,
//   },
//   premiumCard: {
//     padding: 20,
//     borderRadius: 16,
//     marginBottom: 24,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   premiumHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   crownIcon: {
//     fontSize: 20,
//     marginRight: 8,
//   },
//   premiumTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#92400e",
//   },
//   premiumDescription: {
//     fontSize: 14,
//     color: "#78350f",
//     marginBottom: 16,
//     lineHeight: 20,
//   },
//   premiumTags: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   premiumTag: {
//     backgroundColor: "#fbbf24",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },
//   premiumTagText: {
//     fontSize: 12,
//     color: "#92400e",
//     fontWeight: "500",
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1f2937",
//     marginBottom: 16,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#374151",
//     marginBottom: 8,
//   },

//   addHabitCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   durationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   durationInput: {
//     backgroundColor: "#f9fafb",
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     fontSize: 16,
//     color: "#1f2937",
//     width: 60,
//     textAlign: "center",
//     marginHorizontal: 12,
//   },
//   durationLabel: {
//     fontSize: 14,
//     color: "#6b7280",
//   },
//   addButton: {
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   addButtonGradient: {
//     paddingVertical: 16,
//     alignItems: "center",
//   },
//   addButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   previewHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   previewStats: {
//     backgroundColor: "#e5e7eb",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },
//   statsText: {
//     fontSize: 12,
//     color: "#6b7280",
//     fontWeight: "500",
//   },
//   habitsContainer: {
//     gap: 12,
//   },
//   habitItem: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   habitColor: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   habitContent: {
//     flex: 1,
//   },
//   habitName: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#1f2937",
//     marginBottom: 2,
//   },
//   habitDuration: {
//     fontSize: 12,
//     color: "#6b7280",
//   },
//   habitActions: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   actionBtn: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     backgroundColor: "#f3f4f6",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//   },
//   actionText: {
//     fontSize: 14,
//     color: "#374151",
//     fontWeight: "600",
//   },
//   deleteBtn: {
//     backgroundColor: "#fef2f2",
//     borderColor: "#fca5a5",
//   },
//   deleteText: {
//     fontSize: 18,
//     color: "#dc2626",
//     fontWeight: "600",
//   },
//   saveButton: {
//     borderRadius: 12,
//     overflow: "hidden",
//     marginBottom: 20,
//   },
//   saveButtonGradient: {
//     paddingVertical: 18,
//     alignItems: "center",
//   },
//   saveButtonText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   emptyState: {
//     alignItems: "center",
//     paddingVertical: 40,
//   },
//   emptyIcon: {
//     fontSize: 32,
//     marginBottom: 12,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: "#6b7280",
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#ffffff",
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     fontSize: 16,
//     color: "#1f2937",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
// });

// export default ChainBuilder;

import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

// import { ChainHeader } from "./components/ChainHeader";
// import { ChainDetailsForm } from "./components/ChainDetailsForm";
// import { AddHabitForm } from "./components/AddHabitForm";
// import { ChainPreview } from "./components/ChainPreview";
// import { SaveChainButton } from "./components/SaveChainButton";
// import { NotificationButton } from "./components/NotificationButton";
// import { TimePicker } from "./components/TimePicker";
// import { EmptyState } from "./components/EmptyState";

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
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 20,
  },
});

export default ChainBuilder;
