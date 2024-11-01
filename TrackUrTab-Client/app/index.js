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
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../client_config.json';
import { useEffect } from "react";
import React from 'react'



export default function HomeScreen() {
  const router = useRouter();
  const getUserLoginDetails = async () => {
    // const user_details = await AsyncStorage.getItem(config.user_storage_key);
    // if( user_details ) {
    //   router.push('/homescreen');
    // }    
  }

  useEffect(()=> {
    getUserLoginDetails();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Text>Track your Expenses one Tab at a time!</Text>

      <Image
        source={require('../assets/images/tutlogo.png')}
        //source={require('./assets/images/tutlogo.png')}
        style={styles.image}

        //source={{ uri: 'TrackUrTab-Client/assets/images/tutlogo.png' }}
        //style={{ width: 100, height: 100 }}
      />

      <View style={styles.container}>

        <TouchableOpacity
        style = {styles.button}
        title="Continue"
        onPress={() => router.push("/login")}
        >
          <Text style = {styles.buttonText}>Continue</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor:'#ffffff',
  },
  title: {

    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50
  },
  image: {
    width: 300,
    height: 50,
    marginBottom: 20,
  },
 

  button: {
    backgroundColor: '#33e0ff', 
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 300
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  image: {
    width: 300,
    height: 50,
    marginBottom: 20,
    marginTop: 0,
  },


});
