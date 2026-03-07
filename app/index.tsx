import moment from "moment-timezone";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function WorldClock(){

const [city,setCity] = useState("Asia/Jakarta")

const time = moment().tz(city).format("HH:mm:ss")

return(

<View style={styles.container}>

<Text style={styles.title}>World CLock</Text>

<TextInput
style={styles.input}
placeholder="Asia/Jakarta"
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
justifyContent:"flex-start",
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