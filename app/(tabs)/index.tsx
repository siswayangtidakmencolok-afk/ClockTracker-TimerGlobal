import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

const cities = [
{ city:"Jakarta", tz:"Asia/Jakarta"},
{ city:"Tokyo", tz:"Asia/Tokyo"},
{ city:"London", tz:"Europe/London"},
{ city:"New York", tz:"America/New_York"},
{ city:"Paris", tz:"Europe/Paris"},
{ city:"Dubai", tz:"Asia/Dubai"},
{ city:"Sydney", tz:"Australia/Sydney"},
{ city:"Singapore", tz:"Asia/Singapore"},
{ city:"Berlin", tz:"Europe/Berlin"},
{ city:"Moscow", tz:"Europe/Moscow"},
{ city:"Toronto", tz:"America/Toronto"},
{ city:"Los Angeles", tz:"America/Los_Angeles"},
{ city:"seoul", tz:"Asia/Seoul"},
{ city:"Bangkok", tz:"Asia/Bangkok"},
{ city:"Hong Kong", tz:"Asia/Hong_Kong"},
{ city:"Rome", tz:"Europe/Rome"},
{ city:"Istanbul", tz:"Europe/Istanbul"},
{ city:"Mexico City", tz:"America/Mexico_City"},
{ city:"Mumbai", tz:"Asia/Kolkata"},
{ city:"Kuala Lumpur", tz:"Asia/Kuala_Lumpur"},
{ city:"Spain", tz:"Europe/Madrid"},
{ city:"Amsterdam", tz:"Europe/Amsterdam"},
];

export default function Home(){

const [search,setSearch] = useState("")
const [time,setTime] = useState(new Date())

useEffect(()=>{
const timer = setInterval(()=>{
setTime(new Date())
},1000)

return ()=>clearInterval(timer)
},[])

const hour = time.getHours()

function getTheme(){

if(hour>=6 && hour<12){
return {bg:"#87CEEB", icon:"☀️"}
}

if(hour>=12 && hour<18){
return {bg:"#FDBA74", icon:"🌇"}
}

return {bg:"#020617", icon:"🌙"}

}

const theme = getTheme()

const filtered = cities.filter(c =>
c.city.toLowerCase().includes(search.toLowerCase())
)

const sec = time.getSeconds()
const min = time.getMinutes()
const hr = time.getHours()

return(

<View style={[styles.container,{backgroundColor:theme.bg}]}>

<Text style={styles.icon}>
{theme.icon}
</Text>

<Text style={styles.title}>
World Time
</Text>

{/* Analog Clock */}

<Svg height="200" width="200">

<Circle
cx="100"
cy="100"
r="90"
stroke="white"
strokeWidth="4"
fill="transparent"
/>

<Line
x1="100"
y1="100"
x2="100"
y2="50"
stroke="white"
strokeWidth="4"
transform={`rotate(${hr*30} 100 100)`}
/>

<Line
x1="100"
y1="100"
x2="100"
y2="40"
stroke="white"
strokeWidth="3"
transform={`rotate(${min*6} 100 100)`}
/>

<Line
x1="100"
y1="100"
x2="100"
y2="30"
stroke="red"
strokeWidth="2"
transform={`rotate(${sec*6} 100 100)`}
/>

</Svg>

<TextInput
placeholder="Search city..."
style={styles.search}
placeholderTextColor="#aaa"
value={search}
onChangeText={setSearch}
/>

<FlatList
data={filtered}
keyExtractor={(item)=>item.city}
renderItem={({item})=>(

<View style={styles.card}>

<Text style={styles.city}>
{item.city}
</Text>

<Text style={styles.time}>
{moment().tz(item.tz).format("HH:mm:ss")}
</Text>

</View>

)}
/>

</View>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
alignItems:"center",
paddingTop:60
},

title:{
fontSize:28,
fontWeight:"bold",
color:"white",
marginBottom:20
},

icon:{
fontSize:50,
marginBottom:10
},

search:{
width:"85%",
backgroundColor:"#1e293b",
color:"white",
padding:12,
borderRadius:10,
marginTop:20
},

card:{
width:"85%",
backgroundColor:"#1e293b",
padding:15,
borderRadius:12,
marginTop:10,
shadowColor:"#00ffff",
shadowOpacity:0.8,
shadowRadius:10
},

city:{
color:"#cbd5f5"
},

time:{
color:"#22c55e",
fontSize:20,
fontWeight:"bold"
}

})