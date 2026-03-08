import { StyleSheet, TextInput } from "react-native";

export default function SearchBar({value,onChange}:any){

return(

<TextInput
style={styles.input}
placeholder="Search city timezone"
placeholderTextColor="#aaa"
value={value}
onChangeText={onChange}
/>

)

}

const styles=StyleSheet.create({

input:{
borderWidth:1,
borderColor:"#fff",
padding:12,
borderRadius:10,
width:220,
color:"white",
textAlign:"center",
marginBottom:20
}

})