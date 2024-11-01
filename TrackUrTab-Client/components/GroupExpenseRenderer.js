import ExpenseCard from "./ExpenseCard";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useData } from '../app/dataprovider';
import Icon from 'react-native-vector-icons/Ionicons';

export default function GroupExpenseRenderer({ data }) {
    const router = useRouter();
    const { setData } = useData();

    const formatData = () => {
        let res = [];
        if(Object.keys(data).length <= 0) {
            return [];
        }

        let groups = Object.keys(data.groups);

        groups.forEach( grp => {
            let grp_details = data.groups[grp];

            console.log('Group details: ', grp_details);
            // See who is the total cost  
            let total_cost = 0;
            let expenses = grp_details.expenses;
            expenses.forEach( exp => {
                total_cost += exp.total_cost;
            } );

            res.push({
                id: grp_details.id,
                title: grp_details.name,
                description: '',
                tooltip: '',
                owner: 'The group spent ' + total_cost,
                total_cost: total_cost,
                callbacks: {details: navigateToGroupPage, edit: editGroupDetails, delete: deleteGroup }
            });

        } )

        console.log('Group Expense renderer coming: ', res);
        return res;
    }

    const navigateToGroupPage = ( grp_id ) => {
        console.log('Expense Info: ', data);
        let data_to_be_pushed = {
            type: 'group-info',
            current_user : data.current_user,
            user_details: data.groups[grp_id].user_details,
            expenses: data.groups[grp_id].expenses,
            grp_id: grp_id
        };
        // navigator.navigate('/group-info', {params: data_to_be_pushed});
        console.log('Data to be pushed: ', data_to_be_pushed);
        setData(data_to_be_pushed);
        router.push({
            pathname: '/group-info'
        });
    }

    const editGroupDetails = ( grp_id ) =>{
        console.log('Edit group: ', grp_id);
        // console.log({
        //     type: 'editgroup',
        //     grp_id: grp_id,
        //     current_user: data.current_user,
        //     group_details: data.groups[grp_id]
        // });

        setData({
            type: 'editgroup',
            grp_id: grp_id,
            current_user: data.current_user,
            group_details: data.groups[grp_id]
        })

        router.push('/newgroup');
    }

    const deleteGroup = ( grp_id ) => {
        console.log('Delete group: ', grp_id);
    }

    const renderItem = ({ item }) => (
        <ExpenseCard title={item.title} amount={item.total_cost} description={item.description} tooltip={item.owner} image={undefined} callbacks={item.callbacks} exp_id={item.id} owner={item.owner} />
    );

    return ( 
        <View style={{ borderColor: 'black', flex : 1, padding: -10}}>
            <FlatList
                data={formatData()}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => {
                    setData({
                        type: 'newgroup',
                        current_user: data.current_user
                    })
                    router.push('/newgroup')
                }}
            >
                <Icon name="add-circle" size={60} color="#33e0ff" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        // Optional: add shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        // Optional: add elevation for Android
        elevation: 5,
    }
});