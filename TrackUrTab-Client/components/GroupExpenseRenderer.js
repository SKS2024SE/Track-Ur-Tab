import ExpenseCard from "./ExpenseCard";
import { View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useData } from '../app/dataprovider';

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
    }

    const deleteGroup = ( grp_id ) => {
        console.log('Delete group: ', grp_id);
    }

    const renderItem = ({ item }) => (
        <ExpenseCard title={item.title} amount={item.total_cost} description={item.description} tooltip={item.owner} image={undefined} callbacks={item.callbacks} exp_id={item.id} owner={item.owner} />
    );

    return ( 
        <View style={{ borderColor: 'black' }}>
            <FlatList
                data={formatData()}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}