// RegisterScreen.jsx
import { Link, useRouter } from 'expo-router';
import { React, useState } from 'react';
import config from '../client_config.json';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SignupScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [phone_no, setPhoneNumber] = useState(""); // State for phone number 
  const [email, setEmail] = useState(""); // State for email

  const handleSignUp = async () => {
    // Validate parameters
    console.log('Inside signup');
    console.log('Username: ', username);
    console.log('Password: ', password);
    console.log('Phone number: ', phone_no);
    console.log('Email: ', email);

    let url = `http://${config.server_ip}:${config.server_port}/register`;
    console.log('Url: ', url)
    let user_data = {
      name: username,
      email: email, 
      phone_no: phone_no,
      password: password
    }
    try {
      let response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_data)
      });
      response = await response.json();
      console.log(response);
      if( response.status == '200' ) {
        // Give a toast message that registration successful 
        // Move to the login screen
        router.navigate('/login');
      } else {
        // Show error message
        console.log(response.data);
      }
    } catch(e) {
      // Handle error
      console.log(e)
    }
  };

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/images/tutlogo.png')}
        //source={require('./assets/images/tutlogo.png')}
        style={styles.image}

        //source={{ uri: 'TrackUrTab-Client/assets/images/tutlogo.png' }}
        //style={{ width: 100, height: 100 }}
      />

      

      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Phone number"
        style={styles.input}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={setUsername}
      />
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
        Already have an account? <Link href='/login'>Login here</Link>
      </Text>

      <TouchableOpacity
        style = {styles.button}
        title="Register"
        onPress={async () => {
          await handleSignUp();
        }}
        >
          <Text style = {styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    padding: 16,
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    paddingTop: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#33e0ff', 
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 30,
  },

  image: {
    width: 300,
    height: 50,
    marginBottom: 20,
    marginTop: 0,
    justifyContent: 'center',
  },

});

export default SignupScreen;