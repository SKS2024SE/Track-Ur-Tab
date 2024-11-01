import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import config from '../client_config.json';
import { router } from 'expo-router';

const CreateEditGroup = ({ data = { type: 'newgroup' } }) => {
  const [title, setTitle] = useState('');
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    // Set title and emails only if data is provided
    const groupDetails = data.group_details || {};
    const userDetails = data.group_details?.user_details || {};

    setTitle(groupDetails.name || '');

    // Initialize emails from userDetails if data is provided
    if (groupDetails.user_ids && Array.isArray(groupDetails.user_ids)) {
      const initialEmails = groupDetails.user_ids
        .map((userId) => userDetails[userId]?.email || '')
        .filter(Boolean); // Filter out any empty values if email is missing
      setEmails(initialEmails);
    } else {
      setEmails([]);
    }
  }, [data]);

  const handleAddEmail = () => {
    setEmails([...emails, '']); // Add a new empty string for a new email field
  };

  const handleEmailChange = (index, text) => {
    const newEmails = [...emails];
    newEmails[index] = text; // Update the specific email by index
    setEmails(newEmails);
  };

  const handleDeleteEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index); // Remove email by index
    setEmails(newEmails);
  };

  const handleSave = async () => {
    if( !title ) {
      Alert.alert("Empty Title", "Kindly add a title to save");
      return;
    }

    if( data.type == 'editgroup' ) {
      console.log('Edit a group');
      let reqBody = {
        owner: data.current_user.id,
        type: 'group',
        name: title,
        email_ids: emails,
        token: data.current_user.token
      };
      let url = `http://${config.server_ip}:${config.server_port}/group/update/${data.grp_id}`;
      try {
        let response = await fetch(url, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBody)
        })
        response = await response.json();
        if( response.status == '200' ) {
          router.back();
        } else {
          Alert.alert('Error occurred when editing the group details', response.data);
        }
      } catch(e) {
        Alert.alert('Error occurred when editing the group details', 'Please try again');
        console.log(e);
      } 

    } else if( data.type == 'newgroup' ) {
      let reqBody = {
        owner: data.current_user.id,
        type: 'group',
        name: title,
        email_ids: emails,
        token: data.current_user.token
      };
      let url = `http://${config.server_ip}:${config.server_port}/group/create`;
      try {
        let response = await fetch(url, {
          method: 'post',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(reqBody)
        })
        response = await response.json();
        if( response.data == '200' ) {
          router.back();
        }
      } catch(e) {
        Alert.alert('Error occurred when adding a group', 'Please try again later');
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={styles.label}>Group Members</Text>
      {emails.map((email, index) => (
        <View key={index} style={styles.emailContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email ID"
            value={email}
            onChangeText={(text) => handleEmailChange(index, text)}
          />
          <TouchableOpacity onPress={() => handleDeleteEmail(index)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={handleAddEmail}>
        <Text style={styles.addButton}>+ Add Email</Text>
      </TouchableOpacity>

      <Button style={styles.addButton} title="Submit" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    color: 'blue',
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
});

export default CreateEditGroup;
