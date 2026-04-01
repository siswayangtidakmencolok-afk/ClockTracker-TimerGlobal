import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CityKey = "Jakarta" | "Tokyo" | "London" | "New York" | "Sydney" | "Dubai" | "Singapore" | "Paris";

const CITIES: Record<CityKey, string> = {
  Jakarta:   "Asia/Jakarta",
  Tokyo:     "Asia/Tokyo",
  London:    "Europe/London",
  "New York": "America/New_York",
  Sydney:    "Australia/Sydney",
  Dubai:     "Asia/Dubai",
  Singapore: "Asia/Singapore",
  Paris:     "Europe/Paris",
};

const CITY_FLAGS: Record<CityKey, string> = {
  Jakarta:   "🇮🇩",
  Tokyo:     "🇯🇵",
  London:    "🇬🇧",
  "New York": "🇺🇸",
  Sydney:    "🇦🇺",
  Dubai:     "🇦🇪",
  Singapore: "🇸🇬",
  Paris:     "🇫🇷",
};

export default function WorldClock() {
  const [city, setCity] = useState<CityKey>("Jakarta");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const tz = CITIES[city];
  const now = moment().tz(tz);
  const timeStr = now.format("HH:mm:ss");
  const dateStr = now.format("dddd, D MMMM YYYY");
  const utcOffset = now.format("Z");
  const hour = now.hour();
  const isDay = hour >= 6 && hour < 18;

  // Sky gradient based on time of day
  const skyColor = (() => {
    if (hour >= 5 && hour < 7)   return "#1a3a5c";   // dawn
    if (hour >= 7 && hour < 17)  return "#0c3b6e";   // day
    if (hour >= 17 && hour < 19) return "#5c3317";   // dusk
    return "#0a0f1a";                                  // night
  })();

  return (
    <ScrollView style={[styles.root, { backgroundColor: skyColor }]} contentContainerStyle={styles.content}>

      {/* Header */}
      <Text style={styles.title}>🌍  WORLD CLOCK</Text>

      {/* Main Display */}
      <View style={styles.mainCard}>
        <Text style={styles.flagText}>{CITY_FLAGS[city]}</Text>
        <Text style={styles.cityName}>{city}</Text>
        <Text style={styles.utcLabel}>UTC {utcOffset}</Text>

        <Text style={styles.timeDisplay}>{timeStr}</Text>
        <Text style={styles.dateDisplay}>{dateStr}</Text>

        <View style={styles.dayNightBadge}>
          <Text style={styles.dayNightText}>
            {isDay ? "☀️  Siang" : "🌙  Malam"}
          </Text>
        </View>
      </View>

      {/* All cities current time */}
      <Text style={styles.sectionLabel}>SEMUA ZONA WAKTU</Text>
      <View style={styles.allCitiesGrid}>
        {(Object.keys(CITIES) as CityKey[]).map((c) => {
          const cTime = moment().tz(CITIES[c]).format("HH:mm:ss");
          const cHour = moment().tz(CITIES[c]).hour();
          const cIsDay = cHour >= 6 && cHour < 18;
          const isActive = city === c;
          return (
            <TouchableOpacity
              key={c}
              style={[styles.cityCard, isActive && styles.cityCardActive]}
              onPress={() => setCity(c)}
              activeOpacity={0.7}
            >
              <Text style={styles.cityCardFlag}>{CITY_FLAGS[c]}</Text>
              <Text style={[styles.cityCardName, isActive && styles.cityCardNameActive]}>{c}</Text>
              <Text style={[styles.cityCardTime, isActive && styles.cityCardTimeActive]}>{cTime}</Text>
              <Text style={styles.cityCardDayNight}>{cIsDay ? "☀️" : "🌙"}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { alignItems: "center", paddingTop: 56, paddingBottom: 40, paddingHorizontal: 16 },
  title: { color: "#94a3b8", fontSize: 13, fontWeight: "700", letterSpacing: 4, marginBottom: 24 },

  mainCard: {
    backgroundColor: "#ffffff10",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffffff20",
    marginBottom: 32,
  },
  flagText: { fontSize: 48, marginBottom: 8 },
  cityName: { color: "white", fontSize: 22, fontWeight: "700", marginBottom: 2 },
  utcLabel: { color: "#64748b", fontSize: 12, letterSpacing: 1, marginBottom: 16 },
  timeDisplay: { color: "white", fontSize: 64, fontWeight: "bold", letterSpacing: 3 },
  dateDisplay: { color: "#94a3b8", fontSize: 14, marginTop: 6, marginBottom: 16 },
  dayNightBadge: {
    backgroundColor: "#ffffff15",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  dayNightText: { color: "white", fontSize: 14, fontWeight: "600" },

  sectionLabel: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    alignSelf: "flex-start",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  allCitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  cityCard: {
    backgroundColor: "#ffffff08",
    borderRadius: 14,
    padding: 14,
    width: "48%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ffffff10",
    alignItems: "center",
  },
  cityCardActive: {
    backgroundColor: "#1E88E520",
    borderColor: "#1E88E5",
  },
  cityCardFlag: { fontSize: 22, marginBottom: 4 },
  cityCardName: { color: "#94a3b8", fontSize: 12, fontWeight: "600", marginBottom: 2 },
  cityCardNameActive: { color: "#1E88E5" },
  cityCardTime: { color: "white", fontSize: 20, fontWeight: "bold" },
  cityCardTimeActive: { color: "#1E88E5" },
  cityCardDayNight: { fontSize: 12, marginTop: 2 },
});