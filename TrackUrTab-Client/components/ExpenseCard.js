import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CollapsableContainer } from './CollapsableContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ExpenseCard({ exp_id, title, subtitle, description, owner, collapsibleData, amount, callbacks }) {
    const [expanded, setExpanded] = useState(false);

    const onItemPress = () => {
        setExpanded(!expanded);
    }

    const defaultImage = require('../assets/images/profile-pic.webp');

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => collapsibleData ? onItemPress() : callbacks.details(exp_id)}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={() => callbacks.edit(exp_id)}>
                            <Icon name="edit" size={24} color="#000" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => callbacks.delete(exp_id)}>
                            <Icon name="delete" size={24} color="#000" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.description}>{subtitle}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {collapsibleData ? <CollapsableContainer expanded={expanded} children={(<Text style={styles.collapsible}>{collapsibleData}</Text>)}>
            </CollapsableContainer> : ''}
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
        padding: 10,
    },
    header: {
        flexDirection: 'column',
        marginBottom: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribute space between title and buttons
        alignItems: 'center', // Align items vertically
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1, // Take available space
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    collapsible: {
        fontSize: 14,
        color: '#555',
        paddingLeft: 16,
    },
    icon: {
        marginLeft: 8,
    },
});