import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SkyBackground from "../../components/SkyBackground";

type CityKey =
  | "Jakarta"
  | "Tokyo"
  | "London"
  | "New York"
  | "Sydney";

const cities: Record<CityKey, string> = {
  Jakarta: "Asia/Jakarta",
  Tokyo: "Asia/Tokyo",
  London: "Europe/London",
  "New York": "America/New_York",
  Sydney: "Australia/Sydney",
};

export default function WorldClock() {

  const [city, setCity] = useState<CityKey>("Jakarta");
  const [time, setTime] = useState("");

  useEffect(() => {

    const interval = setInterval(() => {

      const tz = cities[city];
      const currentTime = moment().tz(tz).format("HH:mm:ss");

      setTime(currentTime);

    }, 1000);

    return () => clearInterval(interval);

  }, [city]);

  const hour = moment().tz(cities[city]).hour();

  return (

    <SkyBackground hour={hour}>

      <View style={styles.container}>

        <Text style={styles.title}>🌍 World Clock</Text>

        <Text style={styles.city}>{city}</Text>

        <Text style={styles.time}>{time}</Text>

        <View style={styles.cityContainer}>

          {(Object.keys(cities) as CityKey[]).map((c) => (

            <Pressable
              key={c}
              style={[
                styles.cityButton,
                city === c && styles.activeCity
              ]}
              onPress={() => setCity(c)}
            >
              <Text style={styles.cityText}>{c}</Text>
            </Pressable>

          ))}

        </View>

      </View>

    </SkyBackground>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  city: {
    fontSize: 22,
    color: "white",
  },

  time: {
    fontSize: 72,
    fontWeight: "bold",
    color: "white",
    marginVertical: 20,
  },

  cityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  cityButton: {
    backgroundColor: "#ffffff30",
    padding: 10,
    margin: 6,
    borderRadius: 10,
  },

  activeCity: {
    backgroundColor: "#1E88E5",
  },

  cityText: {
    color: "white",
    fontSize: 14,
  },

});