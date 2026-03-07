import moment from "moment-timezone";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function WorldClock() {

const [search,setSearch] = useState("");

const cities = [
{city:"Jakarta",tz:"Asia/Jakarta"},
{city:"Tokyo",tz:"Asia/Tokyo"},
{city:"London",tz:"Europe/London"},
{city:"New York",tz:"America/New_York"},
{city:"Seoul",tz:"Asia/Seoul"},
{city:"Bangkok",tz:"Asia/Bangkok"}
];

const filtered = cities.filter(c =>
c.city.toLowerCase().includes(search.toLowerCase())
);

return(

<View style={styles.container}>

<Text style={styles.title}>World Time</Text>

<TextInput
placeholder="Search city..."
placeholderTextColor="#aaa"
style={styles.search}
value={search}
onChangeText={setSearch}
/>

<FlatList
data={filtered}
keyExtractor={(item,index)=>index.toString()}
renderItem={({item})=>(
<View style={styles.card}>
<Text style={styles.city}>{item.city}</Text>
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
paddingTop:80,
backgroundColor:"#134e4a"
},

title:{
fontSize:28,
fontWeight:"bold",
color:"#FFD580",
marginBottom:30
},

search:{
width:"85%",
padding:15,
borderRadius:20,
borderWidth:2,
borderColor:"#FFD580",
backgroundColor:"#0b0b0b",
color:"white",
marginBottom:20
},

card:{
width:"85%",
padding:15,
backgroundColor:"#0b0b0b",
borderRadius:12,
marginBottom:10
},

city:{
color:"#aaa"
},

time:{
color:"#22c55e",
fontSize:20
}

})