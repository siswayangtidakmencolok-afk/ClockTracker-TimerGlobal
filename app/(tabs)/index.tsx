import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TOOLS = [
  { href: "../(tools)/worldclock", icon: "🌍✈️", label: "World Clock",  sub: "Jam global semua zona" },
  { href: "../(tools)/stopwatch",  icon: "⏱",  label: "Stopwatch",    sub: "Hitung waktu & lap"   },
  { href: "../(tools)/timer",      icon: "⏳",  label: "Timer",        sub: "Countdown & Pomodoro" },
  { href: "../(tools)/alarm",      icon: "⏰",  label: "Alarm",        sub: "Set alarm harian"     },
];

export default function Home() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.headerBlock}>
        <Text style={styles.brand}>FhazTech</Text>
        <Text style={styles.title}>⏱ Time Tools</Text>
        <Text style={styles.subtitle}>Pilih alat waktu</Text>
      </View>

      {/* Tool Buttons */}
      <View style={styles.list}>
        {TOOLS.map((tool) => (
          <Link key={tool.href} href={tool.href as any} asChild>
            <TouchableOpacity style={styles.card} activeOpacity={0.75}>
              <Text style={styles.cardIcon}>{tool.icon}</Text>
              <View style={styles.cardText}>
                <Text style={styles.cardLabel}>{tool.label}</Text>
                <Text style={styles.cardSub}>{tool.sub}</Text>
              </View>
              <Text style={styles.cardArrow}>›</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <Text style={styles.footer}>© FhazTech 2025</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0f1a",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 20,
  },

  // Header
  headerBlock: {
    alignItems: "center",
    marginBottom: 40,
  },
  brand: {
    color: "#1E88E5",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    color: "white",
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    color: "#475569",
    fontSize: 14,
    letterSpacing: 1,
  },

  // Cards
  list: {
    width: "100%",
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  cardIcon: {
    fontSize: 26,
    marginRight: 16,
    width: 36,
    textAlign: "center",
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 2,
  },
  cardSub: {
    color: "#475569",
    fontSize: 12,
  },
  cardArrow: {
    color: "#334155",
    fontSize: 24,
    fontWeight: "300",
  },

  footer: {
    color: "#1e293b",
    fontSize: 11,
    textAlign: "center",
    marginTop: "auto",
    paddingTop: 20,
  },
});