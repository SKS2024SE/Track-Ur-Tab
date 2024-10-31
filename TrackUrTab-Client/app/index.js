// // /app/index.js
// import React, { useState } from "react";
// import HomeScreen from "../components/HomeScreen";
// import LoginScreen from "../components/Login"; // Import the Login component
// import SignupScreen from "../components/SignUp"; // Import the Signup component
// import { View } from "react-native";

// export default function App() {
//   const [currentScreen, setCurrentScreen] = useState("home");

//   const handleNavigate = (screen) => {
//     setCurrentScreen(screen);
//   };

//   const renderCurrentScreen = () => {
//     switch (currentScreen) {
//       case "home":
//         return <HomeScreen onNavigate={handleNavigate} />;
//       case "login":
//         return <LoginScreen onNavigate={handleNavigate} />;
//       case "signup":
//         return <SignupScreen onNavigate={handleNavigate} />;
//       default:
//         return <HomeScreen onNavigate={handleNavigate} />;
//     }
//   };

//   return <View style={{ flex: 1 }}>{renderCurrentScreen()}</View>;
// }

// /app/index.js (Home Screen)
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../client_config.json';
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const getUserLoginDetails = async () => {
    const user_details = await AsyncStorage.getItem(config.user_storage_key);
    if( user_details ) {
      await AsyncStorage.clear();
      // router.push('/homescreen');
    }    
  }

  useEffect(()=> {
    getUserLoginDetails();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App!</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your logo/image URL
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => router.push("/login")} />
        {/* <Button title="Signup" onPress={() => router.push("/signup")} /> */}
      </View>
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
