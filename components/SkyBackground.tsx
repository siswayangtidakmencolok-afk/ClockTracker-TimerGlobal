import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function SkyBackground({type}:{type:string}){

const cloudMove = useRef(new Animated.Value(0)).current

useEffect(()=>{

Animated.loop(
Animated.timing(cloudMove,{
toValue:1,
duration:20000,
useNativeDriver:true
})
).start()

},[])

const translate = cloudMove.interpolate({
inputRange:[0,1],
outputRange:[-200,200]
})

return(

<View style={[
styles.sky,
type==="night" && {backgroundColor:"#020617"},
type==="morning" && {backgroundColor:"#87CEEB"},
type==="evening" && {backgroundColor:"#f97316"}
]}>

<Animated.View
style={[
styles.cloud,
{transform:[{translateX:translate}]}
]}
/>

</View>

)

}

const styles = StyleSheet.create({

sky:{
...StyleSheet.absoluteFillObject
},

cloud:{
position:"absolute",
width:200,
height:80,
backgroundColor:"rgba(255,255,255,0.4)",
borderRadius:50,
top:100
}

})