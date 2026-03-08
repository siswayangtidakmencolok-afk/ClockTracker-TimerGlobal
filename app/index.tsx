import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>⏱ Time Tools</Text>

      <Link href="../(tools)/worldclock" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>🌍 World Clock</Text>
        </Pressable>
      </Link>

      <Link href="../(tools)/stopwatch" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>⏱ Stopwatch</Text>
        </Pressable>
      </Link>

      <Link href="../(tools)/alarm" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>⏰ Alarm</Text>
        </Pressable>
      </Link>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#0D1B2A"
  },

  title:{
    fontSize:38,
    color:"white",
    fontWeight:"bold",
    marginBottom:40
  },

  button:{
    backgroundColor:"#1E88E5",
    padding:15,
    borderRadius:12,
    marginVertical:10,
    width:220,
    alignItems:"center"
  },

  text:{
    color:"white",
    fontSize:18
  }

});