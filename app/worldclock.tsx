import moment from "moment-timezone";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Globe3D from "../../components/Globe3D";

export default function WorldClock() {

  const [city, setCity] = useState("Asia/Jakarta");
  const [time, setTime] = useState(moment().tz("Asia/Jakarta").format("HH:mm:ss"));

  const cloudX = useRef(new Animated.Value(-200)).current;

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(moment().tz(city).format("HH:mm:ss"));
    }, 1000);

    Animated.loop(
      Animated.timing(cloudX, {
        toValue: 400,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    return () => clearInterval(interval);

  }, [city]);

  const hour = moment().tz(city).hour();

  const getSkyColor = () => {

    if (hour >= 5 && hour < 11) return "#87CEEB"; // morning
    if (hour >= 11 && hour < 17) return "#4FC3F7"; // day
    if (hour >= 17 && hour < 19) return "#FF8A65"; // sunset
    return "#0D1B2A"; // night

  };

  const getIcon = () => {

    if (hour >= 6 && hour < 18) return "sunny";
    return "moon";

  };

  return (

    <View style={[styles.container, { backgroundColor: getSkyColor() }]}>

      <Text style={styles.title}>World Clock</Text>

      <TextInput
        style={styles.input}
        placeholder="Asia/Jakarta"
        placeholderTextColor="#ccc"
        onChangeText={setCity}
      />

      <Ionicons
        name={getIcon()}
        size={100}
        color="white"
        style={{ marginBottom: 20 }}
      />

      <Text style={styles.time}>{time}</Text>

      <Animated.Text
        style={{
          position: "absolute",
          top: 120,
          transform: [{ translateX: cloudX }],
          fontSize: 60,
        }}
      >
        ☁️
      </Animated.Text>

      <View style={{ marginTop: 40 }}>
        <Globe3D />
      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    width: 220,
    borderRadius: 10,
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },

  time: {
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 4,
  },

});