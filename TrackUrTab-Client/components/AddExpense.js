import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import config from '../client_config.json';
import { router } from 'expo-router';

const AddExpense = ({ data }) => {

    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [memberShare, setMemberShare] = useState({});

    const grpId = data.grp_id; // Static group ID

    const categories = ['Loan', 'Transport', 'Food', 'Education', 'Household', 'Health', 'Gift', 'Workout', 'Miscellaneous'];

    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
    };

    const handleSave = async () => {
        const user = data.current_user;

        // Check for amount 
        if (!amount || !selectedCategory || !note) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        const parsedAmount = parseFloat(amount);

        // If type is personal
        console.log(data);
        if (data.expense_details.type == 'personal') {
            memberShare[data.current_user.id] = amount;
        }

        // Change the owner's amount alone to negative 
        memberShare[data.current_user.id] *= -1;

        // Check if sum equals the amount 
        let sum = 0;
        Object.keys(memberShare).forEach(member => {
            let cost = parseFloat(memberShare[member]);
            sum += cost < 0 ? cost * -1 : cost;
            memberShare[member] = cost;
        });
        if (sum != amount) {
            Alert.alert('Error', 'Please make sure the share sums up to the total');
            return;
        }

        if (data.type == 'addexpense') {
            try {
                const expenseData = {
                    type: data.expense_details.type,
                    owner: user.id,
                    grp_id: grpId, // Use the static group ID
                    total_cost: parsedAmount,
                    title: title,
                    description: note, // Adjust as needed
                    category: selectedCategory,
                    member_costs: memberShare,
                    token: user.token || ''
                };
                console.log("Sending expense data for add:", JSON.stringify(expenseData)); // Debugging line

                const response = await fetch(`http://${config.server_ip}:${config.server_port}/group/add-expense`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(expenseData),
                });

                const jsonResponse = await response.json();
                console.log("Response from server:", jsonResponse); // Debugging line

                if (jsonResponse.status === '200') {
                    Alert.alert("Success", "Expense added successfully!");
                    // Reset fields
                    setAmount('');
                    setSelectedCategory('');
                    setNote('');
                    setMemberShare({});
                    router.back();
                } else {
                    Alert.alert("Error", jsonResponse.message || "Failed to add expense. Please try again.");
                }
            } catch (error) {
                console.error("Failed to add expense:", error);
                Alert.alert("Error", "Failed to add expense. Please check your connection.");
            }
        } else {

            let url = `http://${config.server_ip}:${config.server_port}/expense/update/${data.expense_id}`
            let editingData = {
                token: user.token,
                type: data.expense_details.type,
                owner: data.expense_details.owner,
                grp_id: data.expense_details.grp_id,
                total_cost: amount,
                title: title,
                description: note,
                category: selectedCategory,
                member_costs: memberShare
            }
            console.log('Sending editing data: ', editingData);
            try {
                let response = await fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(editingData)
                })
                response = await response.json();
                if (response.status == '200') {
                    setAmount('');
                    setSelectedCategory('');
                    setNote('');
                    setMemberShare({});
                    router.back();
                } else {
                    Alert.alert('Failed Update', 'Update expense failed')
                }
            } catch (e) {
                console.log(e);
            }
        }

    };

    useEffect(() => {
        // See if provider has any data
        if (data && data.type == 'editexpense') {
            console.log('Setting amount: ', data.expense_details.total_cost)
            setAmount(data.expense_details.total_cost.toString());
            console.log('Setting category: ', data.expense_details.category);
            setSelectedCategory(data.expense_details.category);
            console.log('Setting description: ', data.expense_details.description);
            setNote(data.expense_details.description);
            console.log('Setting memberShare: ', data.expense_details.memberShare);
            setMemberShare(data.expense_details.memberShare);
            console.log('Setting title: ', data.expense_details.title);
            setTitle(data.expense_details.title);
        }
    }, []);

    const handleMemberShareCosts = (key, share) => {
        console.log('Member: ', key);
        console.log('Share: ', share);
        setMemberShare(share);
    }

    const getMemberShare = () => {
        let memberShareKeys = Object.keys(memberShare);

        if (data && data.expense_details && data.expense_details.type == 'personal') {
            return (<></>);
        }

        return (
            <>
                {memberShareKeys.map((key, index) =>
                (
                    <View key={index}>
                        <Text>{key}</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0.00"
                            value={parseFloat(memberShare[key]) < 0 ? parseFloat(memberShare[key]) * -1 : memberShare[key]}
                            onChangeText={(amt) => handleMemberShareCosts(key, amt)}
                            keyboardType="numeric"></TextInput>
                    </View>
                )
                )}
            </>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{data.type == 'editexpense' ? 'Edit Expense' : 'Add Expense'}</Text>
            <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
            />
            {getMemberShare()}

            <Text style={styles.sectionHeader}>Categories</Text>
            <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                        onPress={() => handleCategoryPress(category)}
                    >
                        <Text style={styles.categoryText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TextInput
                style={styles.noteInput}
                placeholder="Add a title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.noteInput}
                placeholder="Add a note"
                value={note}
                onChangeText={setNote}
            />

            <Button title="SAVE" onPress={handleSave} color="#00796b" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flex: 1 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    amountInput: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
    sectionHeader: { fontSize: 16, fontWeight: '600', marginVertical: 10 },
    categoriesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
    categoryButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        margin: 5,
    },
    selectedCategory: { backgroundColor: '#4caf50' },
    categoryText: { fontSize: 16 },
    noteInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
});

export default AddExpense;
