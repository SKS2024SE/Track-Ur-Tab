// Card.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ExpenseCard({ title, description, image }) {
    const defaultImage = require('../assets/images/profile-pic.webp'); 
    return (
        <View style={styles.card}>
            {image && <Image source={{ uri: image || defaultImage }} style={styles.image} />}
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
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
    image: {
        width: '100%',
        height: 150,
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
