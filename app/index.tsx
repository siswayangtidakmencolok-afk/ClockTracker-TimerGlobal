import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SkyBackground from "../components/SkyBackground";

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
      const t = moment().tz(tz).format("HH:mm:ss");

      setTime(t);

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

        <View style={styles.buttons}>

          {(Object.keys(cities) as CityKey[]).map((c) => (

            <Pressable
              key={c}
              style={styles.button}
              onPress={() => setCity(c)}
            >
              <Text style={styles.buttonText}>{c}</Text>
            </Pressable>

          ))}

        </View>

      </View>

    </SkyBackground>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },

  title:{
    fontSize:32,
    color:"white",
    fontWeight:"bold",
    marginBottom:10
  },

  city:{
    fontSize:24,
    color:"white"
  },

  time:{
    fontSize:70,
    color:"white",
    fontWeight:"bold",
    marginVertical:20
  },

  buttons:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center"
  },

  button:{
    backgroundColor:"#ffffff30",
    padding:10,
    margin:5,
    borderRadius:10
  },

  buttonText:{
    color:"white"
  }

});