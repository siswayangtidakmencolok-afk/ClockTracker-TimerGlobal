import moment from "moment-timezone";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function WorldClock(){

  const [city,setCity] = useState("");

  const time = moment().tz(city || "Asia/Jakarta").format("HH:mm:ss");

  return(
    <View style={styles.container}>

      <Text style={styles.title}>Jam Dunia</Text>

      <TextInput
      placeholder="Contoh: Asia/Tokyo"
      style={styles.input}
      onChangeText={setCity}
      />

      <Text style={styles.time}>{time}</Text>

    </View>
  )
}

const styles = StyleSheet.create({

container:{
flex:1,
paddingTop:80,
justifyContent:"center",
alignItems:"center"
},

search: {
  width: "85%",
  padding: 15,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: "#FFD580",
  backgroundColor: "#0b0b0b",
  color: "white",
},

title:{
fontSize:28,
marginBottom:20
},

input:{
borderWidth:1,
width:200,
padding:10,
marginBottom:20
},

time:{
fontSize:40
}

})