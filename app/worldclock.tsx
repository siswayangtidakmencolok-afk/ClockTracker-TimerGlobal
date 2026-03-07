import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import moment from "moment-timezone";

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
justifyContent:"center",
alignItems:"center"
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