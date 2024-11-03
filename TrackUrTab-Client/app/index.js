// LoginScreen.jsx
import { React, useState } from 'react';
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import config from '../client_config.json';
import { useEffect } from "react";

const LoginScreen = ({ navigation }) => {
  const router = useRouter();
  const [email, setEmail] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password

  const getUserLoginDetails = async () => {
    const user_details = await AsyncStorage.getItem(config.user_storage_key);
    if( user_details ) {
      // await AsyncStorage.clear();
      router.push('/homescreen');
    }    
  }

  useEffect(()=> {
    getUserLoginDetails();
  }, []);

  const onLogin = async () => {
    console.log('Inside /login');
    let url = `http://${config.server_ip}:${config.server_port}/login`;
    let user_data = {
      email: email, 
      password: password
    };

    try {
      console.log(user_data);
      let response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_data)
      });
      response = await response.json()
      console.log(response);
      if( response.status == '200' ) {
        console.log(response);
        // Store the user token 
        await AsyncStorage.setItem(config.user_storage_key, JSON.stringify({ id: response.data.id, email: email, token: response.data.token }));
  
        // Route to the Home screen containing personal expenses and group expenses 
        router.push('/homescreen');
      } else {
        console.log(response.data);
      }
    } catch(e) {
      // Handle exception
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/tutlogo.png')}
        //source={require('./assets/images/tutlogo.png')}
        style={styles.image}

        //source={{ uri: 'TrackUrTab-Client/assets/images/tutlogo.png' }}
        //style={{ width: 100, height: 100 }}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <Text>
        Do not have an account? <Link href='/signup'> Register here </Link>
      </Text>

      <TouchableOpacity
        style = {styles.button}
        title="Login"
        onPress={async () => {
          await onLogin();
        }}
        >
          <Text style = {styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    padding: 16,
    paddingTop: 100
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    alignItems: 'center',
    marginTop: 150,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#33e0ff', 
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 30,
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
  }

});

export default LoginScreen;