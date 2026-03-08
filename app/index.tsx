import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function WorldClock() {

  const [city, setCity] = useState("Asia/Jakarta");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {

    const interval = setInterval(() => {

      const zone = moment.tz.zone(city);

      if (zone) {
        setTime(moment().tz(city).format("HH:mm:ss"));
        setError("");
      } else {
        setError("Timezone tidak ditemukan");
      }

    }, 1000);

    return () => clearInterval(interval);

  }, [city]);

  return (

    <View style={styles.container}>

      <Text style={styles.title}>🌍 World Clock</Text>

      <TextInput
        style={styles.input}
        placeholder="Contoh: Asia/Jakarta"
        placeholderTextColor="#888"
        value={city}
        onChangeText={setCity}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <Text style={styles.time}>{time}</Text>
      )}

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "#0D1B2A"
  },

  title: {
    fontSize: 30,
    color: "white",
    marginBottom: 30,
    fontWeight: "bold"
  },

  input: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 12,
    width: 220,
    marginBottom: 20,
    borderRadius: 10,
    color: "white",
    textAlign: "center"
  },

  time: {
    fontSize: 60,
    color: "#00E5FF",
    fontWeight: "bold",
    letterSpacing: 3
  },

  error: {
    color: "red",
    marginTop: 10
  }

});