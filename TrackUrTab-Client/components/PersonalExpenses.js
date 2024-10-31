import { View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../client_config.json';
import { useEffect, useState } from "react";
import ExpensesRenderer from "./ExpensesRenderer";

export default function PersonalExpenses() {
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
        fetchPersonalExpenses();
    }, []);

    return (
        <View>
            <ExpensesRenderer data={personalExpenses} />
        </View>
    )
}