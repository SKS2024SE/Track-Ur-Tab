import ExpenseCard from "./ExpenseCard";
import { View, FlatList } from "react-native";

export default function ExpensesRenderer({ data }) {
    const formatData = () => {
        let res = [];
        console.log('Personal Expenses : ', data);
        data.expenses?.forEach(exp => {
            try {
                console.log('Expense owner: ', exp.id);
                let ownerDeets = data.user_details[exp.owner].email;
                let current_user = data.current_user.email;
                let owner = '';
                if (ownerDeets == current_user) {
                    owner = 'You';
                } else {
                    owner = data.current_user.name;
                }

                // Find other users 
                let collapsibleData = [];
                let members = Object.keys(exp.memberShare);
                members.forEach(member => {
                    let userDeets = data.user_details[member];
                    let cost = exp.memberShare[member] < 0 ? exp.memberShare[member] * -1 : exp.memberShare[member];
                    
                    if (ownerDeets == userDeets.email && userDeets.email == current_user ) {
                        let x = 'You paid ' + cost + ' dollars\n';
                        collapsibleData = x + collapsibleData;
                    } else if(ownerDeets == userDeets.email && userDeets.email != current_user ) {
                        let x = userDeets.name + ' paid ' + cost + ' dollars\n';
                        collapsibleData = x + collapsibleData;
                    } else if(ownerDeets != userDeets.email && userDeets.email == current_user ) {
                        collapsibleData += 'You owe ' + cost + ' dollars to ' + data.user_details[exp.owner].name + '\n';
                    } else {
                        collapsibleData += userDeets.name + ' owes ' + cost + ' dollars to ' + data.user_details[exp.owner].name + '\n';
                    }

                });

                res.push({
                    id: exp.id,
                    title: exp.title,
                    subtitle: exp.description,
                    description: 'Total cost ' + exp.total_cost,
                    tooltip: data.user_details[exp.owner].email,
                    owner: owner,
                    total_cost: exp.total_cost,
                    collapsibleData: collapsibleData,
                    callback: navigateToExpenseInfoPage
                })
            } catch (e) {
                console.log('Inproper data got from server', exp);
                console.log(e);
            }
        })
        return res;
    }

    const navigateToExpenseInfoPage = (exp_id) => {
        console.log('Expense Info: ', exp_id);
    }

    const renderItem = ({ item }) => (
        <ExpenseCard collapsibleData={item.collapsibleData} subtitle={item.subtitle} title={item.title} amount={item.total_cost} description={item.description} tooltip={item.owner} image={undefined} callback={item.callback} exp_id={item.id} owner={item.owner} />
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