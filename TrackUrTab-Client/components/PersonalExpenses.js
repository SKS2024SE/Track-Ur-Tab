import { View, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../client_config.json';
import { useEffect, useState } from "react";
import ExpensesRenderer from "./ExpensesRenderer";
import Icon from 'react-native-vector-icons/Ionicons';
import { router, useFocusEffect } from "expo-router";
import { useData } from "../app/dataprovider";
import React from "react";

export default function PersonalExpenses() {
    const [personalExpenses, setPersonalExpenses] = useState({});
    const { setData } = useData();
    const [loaded, setLoaded] = useState(false); // Use state to manage loaded

    const fetchPersonalExpenses = async () => {
        if (loaded) {
            return;
        }

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
            });
            response = await response.json();
            if (response.status === '200') {
                setLoaded(true);
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
                console.log(response.data); // Log the error
            }
        } catch (e) {
            console.log(e); // Handle fetch error
        }
    };

    useEffect(() => {
        fetchPersonalExpenses();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setLoaded(false);
            fetchPersonalExpenses(); // Call fetch when the screen is focused
        }, [])
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <ExpensesRenderer data={personalExpenses} />
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => {
                    setData({
                        type: 'addexpense',
                        current_user: personalExpenses.current_user,
                        expense_details: {
                            type: 'personal'
                        },
                        grp_id: personalExpenses.user_details[personalExpenses.current_user.id]?.personal_exp // Use optional chaining
                    });
                    console.log('Add expenses group id: ', personalExpenses.user_details);
                    router.push('/addexpense');
                }}
            >
                <Icon name="add-circle" size={60} color="#33e0ff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    }
});
