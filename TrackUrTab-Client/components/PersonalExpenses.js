// import { View, Text, Button, TouchableOpacity, StyleSheet, } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import config from '../client_config.json';
// import { useEffect, useState } from "react";
// import ExpensesRenderer from "./ExpensesRenderer";
// import Icon from 'react-native-vector-icons/Ionicons';

// export default function PersonalExpenses() {
//     const [personalExpenses, setPersonalExpenses] = useState({});
//     let loaded = false;

//     const fetchPersonalExpenses = async () => {
//         if(loaded) {
//             return;
//         }
//         const user_details = await AsyncStorage.getItem(config.user_storage_key);
//         let user = JSON.parse(user_details)
//         let data = {
//             user_id: user.id,
//             token: user.token
//         };

//         let url = `http://${config.server_ip}:${config.server_port}/user/fetch-exp`;
        
//         try {
//             let response = await fetch(url, {
//                 method: 'post',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             }) 
//             response = await response.json();
//             if( response.status == '200' ) {
//                 loaded = true;
//                 setPersonalExpenses({
//                     current_user: user,
//                     expenses: response.data
//                 });
//             } else {
//                 // Add a toast here stating the error 
                
//                 // Log the error
//                 console.log(response.data);
//             }
//         } catch(e) {
//             console.log(e);
//         }
//         return undefined;
//     }

//     useEffect(()=>{
//         fetchPersonalExpenses();
//     }, []);

//     return (
//         <View>
//             <ExpensesRenderer data={personalExpenses} />

//             <TouchableOpacity
//                 style={styles.floatingButton}
//                 onPress={() => navigation.navigate('addexpense')}
//             >
//                 <Icon name="add-circle" size={60} color="#000" />
//             </TouchableOpacity>

//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     expenseItem: {
//         backgroundColor: '#f9f9f9',
//         padding: 15,
//         marginVertical: 5,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: '#ddd',
//     },
//     expenseText: {
//         fontSize: 16,
//     },
//     floatingButton: {
//         position: 'absolute',
//         right: 20,
//         bottom: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//     },
// });
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../client_config.json';
import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons';
import ExpensesRenderer from "./ExpensesRenderer";

export default function PersonalExpenses() {
    const [personalExpenses, setPersonalExpenses] = useState([]);
    const navigation = useNavigation();

    const fetchPersonalExpenses = async () => {
        const user_details = await AsyncStorage.getItem(config.user_storage_key);
        let user = JSON.parse(user_details);
        let data = {
            user_id: user.id,
            token: user.token
        };

        let url = `http://${config.server_ip}:${config.server_port}/user/fetch-exp`;
        
        try {
            let response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }) 
            response = await response.json();
            if( response.status == '200' ) {
                loaded = true;
                console.log("Personal Expenses: ", {
                    current_user: user,
                    user_details: response.data.user_details,
                    expenses: response.data.expenses
                });
                setPersonalExpenses({
                    current_user: user,
                    user_details: response.data.user_details,
                    expenses: response.data.expenses
                });
                
            } else {
                console.log(response.data);
            }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        
        <View style={{ flex: 1, padding: 20 }}>
        
            <ExpensesRenderer data={personalExpenses} navigation={navigation} />

            {/* Floating Plus Button */}
            <TouchableOpacity 
                style={styles.floatingButton}
                onPress={() => navigation.navigate('addexpense')}
            >
                <Icon name="add-circle" size={60} color="#33e0ff" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        // Optional: add shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        // Optional: add elevation for Android
        elevation: 5,
    }
});