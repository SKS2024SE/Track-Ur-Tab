import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

export default function ExpenseCard({ exp_id, title, description, owner, amount, callback }) {
    const defaultImage = require('../assets/images/profile-pic.webp');
    return (
        // <Card>
        //     <Card.Title title={title} subtitle={description} />
        // </Card>
        <View style={styles.card}>
            <TouchableOpacity onPress={() => { console.log('Hello world'); callback(exp_id)}}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.description}>{owner}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 10,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});
