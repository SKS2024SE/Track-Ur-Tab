import { router, useFocusEffect } from "expo-router";
import ExpenseCard from "./ExpenseCard";
import { View, FlatList, Alert } from "react-native";
import config from '../client_config.json';
import { useData } from "../app/dataprovider";
import { useEffect, useState } from "react";
import React from "react";

export default function ExpensesRenderer({ data }) {
    const { setData } = useData();
    const [flatListData, setFlatListData] = useState([]);

    const formatData = () => {
        let res = [];
        console.log('Personal Expenses from Expenses Renderer: ', data);
        data.expenses?.forEach(exp => {
            try {
                console.log('Expense owner: ', exp.id);
                let ownerDeets = data.user_details[exp.owner].email;
                let current_user = data.current_user.email;
                let owner = '';
                if (ownerDeets == current_user) {
                    owner = 'You';
                } else {
                    owner = data.current_user.name;
                }

                // Find other users 
                let collapsibleData = [];
                let members = Object.keys(exp.memberShare);
                members.forEach(member => {
                    let userDeets = data.user_details[member];
                    let cost = exp.memberShare[member] < 0 ? exp.memberShare[member] * -1 : exp.memberShare[member];

                    if (ownerDeets == userDeets.email && userDeets.email == current_user) {
                        let x = 'You paid ' + cost + ' dollars\n';
                        collapsibleData = x + collapsibleData;
                    } else if (ownerDeets == userDeets.email && userDeets.email != current_user) {
                        let x = userDeets.name + ' paid ' + cost + ' dollars\n';
                        collapsibleData = x + collapsibleData;
                    } else if (ownerDeets != userDeets.email && userDeets.email == current_user) {
                        collapsibleData += 'You owe ' + cost + ' dollars to ' + data.user_details[exp.owner].name + '\n';
                    } else {
                        collapsibleData += userDeets.name + ' owes ' + cost + ' dollars to ' + data.user_details[exp.owner].name + '\n';
                    }

                });

                res.push({
                    id: exp.id,
                    title: exp.title,
                    subtitle: exp.description,
                    description: 'Total cost ' + exp.total_cost,
                    tooltip: data.user_details[exp.owner].email,
                    owner: owner,
                    total_cost: exp.total_cost,
                    collapsibleData: collapsibleData,
                    callback: { details: navigateToExpenseInfoPage, edit: editExpense, delete: deleteExpense }
                })
            } catch (e) {
                console.log('Inproper data got from server', exp);
                console.log(e);
            }
        });
        // setFlatListData(res);
        return res;
    }


    const navigateToExpenseInfoPage = (exp_id) => {
        console.log('Expense Info: ', exp_id);
    }
    const editExpense = (exp_id) => {
        console.log('Edit expense');
        let expense_details = {};
        data.expenses.forEach(exp => {
            if (exp.id == exp_id) {
                expense_details = exp;
            }
        });
        console.log('Edit expense: ', expense_details);

        setData({
            type: 'editexpense',
            expense_id: exp_id,
            expense_details: expense_details,
            current_user: data.current_user,
            grp_id: expense_details.grp_id
        });
        router.push('/addexpense');
    }

    const deleteExpense = (exp_id) => {
        let deleteExpenditure = async () => {
            let url = `http://${config.server_ip}:${config.server_port}/expense/delete/${exp_id}`
            let deleteBody = {
                token: data.current_user.token
            };
            try {
                let response = await fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(deleteBody)
                });
                response = await response.json();
                if (response.status == '200') {
                    // Delete the data from the data list 
                    data.expenses = data.expenses.filter(exp => exp.id != exp_id);
                    router.push('/homescreen');
                } else {
                    Alert.alert(
                        "There was an issue when deleting the expense",
                        response.data,
                        [
                            {
                                text: 'OK',
                                style: 'cancel'
                            }
                        ]
                    )
                }
            } catch (e) {
                Alert.alert(
                    "There was an issue when deleting the expense",
                    "Internal Server Error",
                    [
                        {
                            text: 'OK',
                            style: 'cancel'
                        }
                    ]
                )
                console.log(e);
            }
        };
        Alert.alert(
            "Do you want to delete?",
            "Your data will be permenantly lost",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel delete'),
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => deleteExpenditure()
                },
                { cancelable: true }
            ]
        );

    };

    const renderItem = ({ item }) => (
        <ExpenseCard collapsibleData={item.collapsibleData} subtitle={item.subtitle} title={item.title} amount={item.total_cost} description={item.description} tooltip={item.owner} image={undefined} callbacks={item.callback} exp_id={item.id} owner={item.owner} />
    );

    // useEffect( () => {
    //     formatData();
    // }, [] );
    
    return (
        <View style={{ borderColor: 'black' }}>
            <FlatList
                data={formatData()}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
    
}

