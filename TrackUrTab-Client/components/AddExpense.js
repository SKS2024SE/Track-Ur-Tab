import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../client_config.json';

const AddExpense = () => {
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [note, setNote] = useState('');
    const grpId = "1223"; // Static group ID

    const categories = ['Loan', 'Transport', 'Food', 'Education', 'Household', 'Health', 'Gift', 'Workout'];

    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
    };

    const handleSave = async () => {
        const user_details = await AsyncStorage.getItem(config.user_storage_key);
        const user = JSON.parse(user_details);
        
        if (!amount || !selectedCategory || !note) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        const parsedAmount = parseFloat(amount);
        
        // Create expense data with the required structure
        const expenseData = {
            id: user.id,
            type: "individual",
            owner: user.id,
            grp_id: grpId, // Use the static group ID
            memberShare: { [user.id]: parsedAmount },
            total_cost: parsedAmount,
            title: note,
            description: "On some date", // Adjust as needed
            category: selectedCategory,
            member_costs: { [user.id]: -parsedAmount },
            token: user.token || ''
        };

        console.log("Sending expense data:", expenseData); // Debugging line

        try {
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
            } else {
                Alert.alert("Error", jsonResponse.message || "Failed to add expense. Please try again.");
            }
        } catch (error) {
            console.error("Failed to add expense:", error);
            Alert.alert("Error", "Failed to add expense. Please check your connection.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Expense</Text>
            <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                placeholder="Enter Amount"
                value={amount}
                onChangeText={setAmount}
            />

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
