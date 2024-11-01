import { View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../client_config.json';
import { useEffect, useState } from "react";
import GroupExpenseRenderer from "./GroupExpenseRenderer";
import { useFocusEffect } from "expo-router";
import React from "react";

export default function GroupExpenses() {
    const [personalExpenses, setPersonalExpenses] = useState({});
    let loaded = false;

    const fetchPersonalExpenses = async () => {
        if(loaded) {
            return;
        }
        const user_details = await AsyncStorage.getItem(config.user_storage_key);
        let user = JSON.parse(user_details)
        let data = {
            user_id: user.id,
            token: user.token
        };

        let url = `http://${config.server_ip}:${config.server_port}/user/group-details`;
        
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
                console.log('Group expenses data: ', {
                    current_user: user,
                    groups: response.data
                });
                setPersonalExpenses({
                    current_user: user,
                    groups: response.data
                });
            } else {
                // Add a toast here stating the error 
                
                // Log the error
                console.log(response.data);
            }
        } catch(e) {
            console.log(e);
        }
        return undefined;
    }

    useEffect(()=>{
        console.log('Group expense rendering');
        fetchPersonalExpenses();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loaded = false;
            fetchPersonalExpenses(); // Call your fetch function when the screen is focused
        }, [])
    );

    return (
        <View style={{ flex : 1, padding: 20 }}>
            <GroupExpenseRenderer data={personalExpenses} />
        </View>
    )
}