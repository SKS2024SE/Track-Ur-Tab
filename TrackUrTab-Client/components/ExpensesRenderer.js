import ExpenseCard from "./ExpenseCard";

export default function ExpensesRenderer({ data }) {
    const formatData = () => {
        let res = [];
        data.forEach( async exp => {
            let user_data = '';
            let data_to_show = {
                title: exp.title,
                description: exp.description,
                tooltip: ''
            };
            res.push({
                title: exp.title,
                description: exp.description,
                tooltip: ''
            })
        })
    }

    const renderItem = ({ item }) => (
        <ExpenseCard title={item.title} description={item.total_cost} tooltip={item.owner} image={undefined} />
    );

    return (
         <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}