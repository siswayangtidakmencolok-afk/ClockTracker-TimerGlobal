import { View, Text, StyleSheet } from "react-native";

export default function Globe3D() {

  return (

    <View style={styles.container}>
      <Text style={styles.globe}>🌍</Text>
    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    alignItems:"center"
  },

  globe:{
    fontSize:120
  }

});