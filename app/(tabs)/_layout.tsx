/**
 * TARUH DI: app/(tabs)/_layout.tsx
 */

import { Tabs } from "expo-router";
import { Text } from "react-native";

function Icon({ emoji, active }: { emoji: string; active: boolean }) {
  return <Text style={{ fontSize: 18, opacity: active ? 1 : 0.45 }}>{emoji}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#0a0f1a",
          borderTopColor: "#1e293b",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#1E88E5",
        tabBarInactiveTintColor: "#475569",
        headerStyle: { backgroundColor: "#0a0f1a" },
        headerTintColor: "#94a3b8",
        headerTitleStyle: { fontWeight: "700", letterSpacing: 1 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => <Icon emoji="⏱" active={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarLabel: "Explore",
          tabBarIcon: ({ focused }) => <Icon emoji="🌍" active={focused} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarLabel: "About",
          tabBarIcon: ({ focused }) => <Icon emoji="👤" active={focused} />,
        }}
      />
    </Tabs>
  );
}