import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

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
];

export default function HomeScreen(){

const [search,setSearch] = useState("")
const [time,setTime] = useState(new Date())

useEffect(()=>{
const timer = setInterval(()=>{
setTime(new Date())
},1000)

return ()=>clearInterval(timer)
},[])

const filtered = cities.filter(c =>
c.city.toLowerCase().includes(search.toLowerCase())
)

return(

<View style={styles.container}>

<Text style={styles.title}>
🌍 World Time Explorer
</Text>

<TextInput
placeholder="Cari kota..."
placeholderTextColor="#aaa"
style={styles.search}
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
backgroundColor:"#0f172a",
padding:20
},

title:{
fontSize:28,
fontWeight:"bold",
color:"white",
marginBottom:20
},

search:{
backgroundColor:"#1e293b",
color:"white",
padding:12,
borderRadius:10,
marginBottom:15
},

card:{
backgroundColor:"#1e293b",
padding:20,
borderRadius:12,
marginBottom:10
},

city:{
color:"#94a3b8",
fontSize:16
},

time:{
color:"#22c55e",
fontSize:24,
fontWeight:"bold"
}

})