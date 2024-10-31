// /components/HomeScreen.js
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App!</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your logo/image URL
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <Button title="Go to Login" onPress={() => router.push("/Login")} />
        <Button title="Go to Signup" onPress={() => router.push("/signup")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f8f9fa', // Light background color
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40", // Dark text color
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75, // Rounded image
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
