import { View, TouchableOpacity, StyleSheet } from "react-native";
import ExpensesRenderer from "./ExpensesRenderer";
import Icon from 'react-native-vector-icons/Ionicons';
import { useData } from "../app/dataprovider";

export default function GroupInfo({ data }) {
    const { setData } = useData();

    console.log('Received in GroupInfo: ', data);
    return (
        <>
            <ExpensesRenderer data={data} />
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => {
                    setData({
                        type: 'addexpense',
                        current_user: data.current_user,
                        expense_details: {
                            type: 'group'
                        },
                        grp_id: data.user_details[data.current_user.id]?.personal_exp // Use optional chaining
                    });
                    console.log('Add expenses group id: ', data.user_details);
                    router.push('/addexpense');
                }}
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