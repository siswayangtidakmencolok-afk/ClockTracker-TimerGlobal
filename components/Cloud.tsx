import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function Cloud(){

const x=useRef(new Animated.Value(-200)).current

useEffect(()=>{

Animated.loop(

Animated.timing(x,{
toValue:500,
duration:20000,
useNativeDriver:true
})

).start()

},[])

return(

<Animated.Text
style={{
position:"absolute",
top:120,
fontSize:60,
transform:[{translateX:x}]
}}
>
☁️
</Animated.Text>

)

}