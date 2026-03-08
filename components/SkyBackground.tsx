import { View, StyleSheet } from "react-native";
import Cloud from "./Cloud";

type Props = {
  hour:number
  children:any
}

export default function SkyBackground({hour,children}:Props){

let color="#0D1B2A"

if(hour>=5 && hour<11) color="#87CEEB"
else if(hour>=11 && hour<17) color="#4FC3F7"
else if(hour>=17 && hour<19) color="#FF8A65"

return(

<View style={[styles.container,{backgroundColor:color}]}>
<Cloud/>
{children}
</View>

)

}

const styles=StyleSheet.create({

container:{
flex:1
}

})