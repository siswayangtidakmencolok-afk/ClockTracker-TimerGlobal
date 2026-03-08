import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Alarm(){

const [alarm,setAlarm]=useState("")

return(

<View style={styles.container}>

<Text style={styles.title}>Set Alarm</Text>

<TextInput
style={styles.input}
placeholder="HH:MM"
/>

<Pressable style={styles.btn}>
<Text>Save Alarm</Text>
</Pressable>

</View>

)

}

const styles=StyleSheet.create({

container:{
flex:1,
alignItems:"center",
justifyContent:"center"
},

title:{
fontSize:30
},

input:{
borderWidth:1,
padding:10,
width:200,
margin:20
},

btn:{
backgroundColor:"#ccc",
padding:10
}

})