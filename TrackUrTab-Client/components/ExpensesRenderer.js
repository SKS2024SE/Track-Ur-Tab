import ExpenseCard from "./ExpenseCard";
import { View, FlatList } from "react-native";

export default function ({ data }) {
    const formatData = () => {
        let res = [];
        data.expenses?.forEach( exp => {
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
                owner: owner + ' paid ' + exp.total_cost,
                total_cost: exp.total_cost,
                callback: navigateToExpenseInfoPage
            })
        })
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
    );
}