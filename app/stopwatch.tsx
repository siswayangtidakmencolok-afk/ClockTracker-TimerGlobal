import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengukur Waktu</Text>

      <Link href="/stopwatch" asChild>
        <Button title="Stopwatch" />
      </Link>

      <Link href="/worldclock" asChild>
        <Button title="Jam Dunia" />
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});