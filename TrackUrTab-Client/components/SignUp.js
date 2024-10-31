// RegisterScreen.jsx
import { Link, useRouter } from 'expo-router';
import { React, useState } from 'react';
import config from '../client_config.json';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
      <Button
        title="Register"
        onPress={async () => {
          await handleSignUp();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default SignupScreen;