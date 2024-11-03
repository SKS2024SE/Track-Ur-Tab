import { View, TouchableOpacity, StyleSheet } from "react-native";
import ExpensesRenderer from "./ExpensesRenderer";
import Icon from 'react-native-vector-icons/Ionicons';

export default function GroupInfo({ data }) {
    console.log('Received in GroupInfo: ', data);
    return (
        <>
            <ExpensesRenderer data={data} />
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => { console.log('clicked') }}
            >
                <Icon name="add-circle" size={60} color="#33e0ff" />
            </TouchableOpacity>
        </>

    )
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