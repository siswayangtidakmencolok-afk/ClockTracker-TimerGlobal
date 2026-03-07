import { useState, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Stopwatch(){

const [time,setTime] = useState(0)
const [running,setRunning] = useState(false)

const intervalRef = useRef<any>(null)

const start = () =>{

if(!running){

setRunning(true)

intervalRef.current = setInterval(()=>{
setTime(prev=>prev+1)
},1000)

}

}

const stop = ()=>{
clearInterval(intervalRef.current)
setRunning(false)
}

const reset = ()=>{
stop()
setTime(0)
}

const formatTime = ()=>{

const hrs = Math.floor(time/3600)
const mins = Math.floor((time%3600)/60)
const secs = time%60

return `${hrs}:${mins}:${secs}`

}

return(

<View style={styles.container}>

<Text style={styles.timer}>{formatTime()}</Text>

<Button title="Start" onPress={start}/>
<Button title="Stop" onPress={stop}/>
<Button title="Reset" onPress={reset}/>

</View>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

timer:{
fontSize:40,
marginBottom:20
}

})