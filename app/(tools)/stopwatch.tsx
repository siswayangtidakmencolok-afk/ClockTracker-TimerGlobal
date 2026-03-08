import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Stopwatch(){

const [time,setTime]=useState(0)
const [running,setRunning]=useState(false)

let interval:any

const start=()=>{
setRunning(true)

interval=setInterval(()=>{
setTime((t)=>t+1)
},1000)
}

const stop=()=>{
setRunning(false)
clearInterval(interval)
}

const reset=()=>{
setTime(0)
}

return(

<View style={styles.container}>

<Text style={styles.time}>{time}s</Text>

<Pressable style={styles.btn} onPress={start}>
<Text>Start</Text>
</Pressable>

<Pressable style={styles.btn} onPress={stop}>
<Text>Stop</Text>
</Pressable>

<Pressable style={styles.btn} onPress={reset}>
<Text>Reset</Text>
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

time:{
fontSize:60
},

btn:{
backgroundColor:"#ddd",
padding:10,
margin:10
}

})