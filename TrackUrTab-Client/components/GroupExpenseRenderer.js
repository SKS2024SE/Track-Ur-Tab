import ExpenseCard from "./ExpenseCard";
import { View, FlatList } from "react-native";

export default function GroupExpenseRenderer({ data }) {

    const formatData = () => {
        let res = [];
        console.log(data);
        if(Object.keys(data).length <= 0) {
            return [];
        }

        let groups = data.current_user.group_exp;

        groups.forEach( grp => {
            let grp_details = data.groups[grp];

            // See who is the total cost  
            let total_cost = 0;
            let expenses = grp_details.expenses;
            expenses.forEach( exp => {
                total_cost += expenses.total_cost;
            } );
            res.push({
                id: grp_details.id,
                title: grp_details.name,
                description: '',
                tooltip: '',
                owner: 'The group spent ' + total_cost,
                total_cost: total_cost,
                callback: navigateToGroupPage
            });

        } )

        data.groups?.forEach( exp => {
            let ownerDeets = exp.user_details[exp.owner].email;
            let current_user = data.current_user.email;
            let owner = '';
            if( ownerDeets == current_user ) {
                owner = 'You';
            } else {
                owner = data.current_user.name;
            }
            res.push({
                id: exp.id,
                title: exp.title,
                description: exp.description,
                tooltip: exp.user_details[exp.owner].email,
                owner: owner,
                total_cost: exp.total_cost,
                callback: navigateToExpenseInfoPage
            })
        })
        console.log('Group Expense renderer coming: ', res);
        return res;
    }

    const navigateToExpenseInfoPage = ( exp_id ) => {
        console.log('Expense Info: ', exp_id);
    }

    const renderItem = ({ item }) => (
        <ExpenseCard title={item.title} amount={item.total_cost} description={item.description} tooltip={item.owner} image={undefined} callback={item.callback} exp_id={item.id} owner={item.owner} />
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