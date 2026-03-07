import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import moment from "moment-timezone";

export default function WorldClock(){

const [city,setCity] = useState("Asia/Jakarta")

const time = moment().tz(city).format("HH:mm:ss")

return(

<View style={styles.container}>

<Text style={styles.title}>World Clock</Text>

<TextInput
style={styles.input}
placeholder="Asia/Tokyo"
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
fontSize:26,
marginBottom:20
},

input:{
borderWidth:1,
padding:10,
width:200,
marginBottom:20
},

time:{
fontSize:40
}

})