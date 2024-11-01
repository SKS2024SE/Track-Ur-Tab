// import ExpenseCard from "./ExpenseCard";
// import { View, FlatList } from "react-native";

// export default function ExpensesRenderer({ data }) {
//     const formatData = () => {
//         let res = [];
//         console.log('Personal Expenses : ', data);
//         data.expenses?.forEach(exp => {
//             try {
//                 console.log('Expense owner: ', exp.id);
//                 let ownerDeets = data.user_details[exp.owner].email;
//                 let current_user = data.current_user.email;
//                 let owner = '';
//                 if (ownerDeets == current_user) {
//                     owner = 'You';
//                 } else {
//                     owner = data.current_user.name;
//                 }

//                 // Find other users 
//                 let collapsibleData = [];
//                 let members = Object.keys(exp.memberShare);
//                 members.forEach(member => {
//                     let userDeets = data.user_details[member];
//                     let cost = exp.memberShare[member] < 0 ? exp.memberShare[member] * -1 : exp.memberShare[member];
                    
//                     if (ownerDeets == userDeets.email && userDeets.email == current_user ) {
//                         let x = 'You paid ' + cost + ' dollars\n';
//                         collapsibleData = x + collapsibleData;
//                     } else if(ownerDeets == userDeets.email && userDeets.email != current_user ) {
//                         let x = userDeets.name + ' paid ' + cost + ' dollars\n';
//                         collapsibleData = x + collapsibleData;
//                     } else if(ownerDeets != userDeets.email && userDeets.email == current_user ) {
//                         collapsibleData += 'You owe ' + cost + ' dollars to ' + data.user_details[exp.owner].name + '\n';
//                     } else {
//                         collapsibleData += userDeets.name + ' owes ' + cost + ' dollars to ' + data.user_details[exp.owner].name + '\n';
//                     }

//                 });

//                 res.push({
//                     id: exp.id,
//                     title: exp.title,
//                     subtitle: exp.description,
//                     description: 'Total cost ' + exp.total_cost,
//                     tooltip: data.user_details[exp.owner].email,
//                     owner: owner,
//                     total_cost: exp.total_cost,
//                     collapsibleData: collapsibleData,
//                     callback: navigateToExpenseInfoPage
//                 })
//             } catch (e) {
//                 console.log('Inproper data got from server', exp);
//                 console.log(e);
//             }
//         })
//         return res;
//     }

//     const navigateToExpenseInfoPage = (exp_id) => {
//         console.log('Expense Info: ', exp_id);
//     }

//     const renderItem = ({ item }) => (
//         <ExpenseCard collapsibleData={item.collapsibleData} subtitle={item.subtitle} title={item.title} amount={item.total_cost} description={item.description} tooltip={item.owner} image={undefined} callback={item.callback} exp_id={item.id} owner={item.owner} />
//     );

//     return (
//         <View style={{ borderColor: 'black' }}>
//             <FlatList
//                 data={formatData()}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//             />
//         </View>
//     );
// }


// import React, { useState, useCallback } from "react";
// import { View, FlatList, Text, Dimensions, StyleSheet, RefreshControl } from "react-native";
// import { PieChart } from "react-native-chart-kit";
// import ExpenseCard from "./ExpenseCard";
// import { PanGestureHandler } from "react-native-gesture-handler";



// export default function ExpensesRenderer({ data }) {
//     const screenWidth = Dimensions.get("window").width;
//     const [refreshing, setRefreshing] = useState(false);

//     const handleRefresh = useCallback(() => {
//         setRefreshing(true);
//         setTimeout(() => {
//             setRefreshing(false);
//         }, 2000);
//     }, []);
//     // Format data to display in ExpenseCard
//     const formatData = () => {
//         let res = [];
//         data.expenses?.forEach(exp => {
//             try {
//                 let ownerDeets = data.user_details[exp.owner].email;
//                 let current_user = data.current_user.email;
//                 let owner = ownerDeets === current_user ? 'You' : data.current_user.name;
//                 let collapsibleData = [];
//                 let members = Object.keys(exp.memberShare);
                
//                 members.forEach(member => {
//                     let userDeets = data.user_details[member];
//                     let cost = Math.abs(exp.memberShare[member]);

//                     if (ownerDeets === userDeets.email && userDeets.email === current_user) {
//                         collapsibleData = `You paid ${cost} dollars\n` + collapsibleData;
//                     } else if (ownerDeets === userDeets.email) {
//                         collapsibleData = `${userDeets.name} paid ${cost} dollars\n` + collapsibleData;
//                     } else if (userDeets.email === current_user) {
//                         collapsibleData += `You owe ${cost} dollars to ${data.user_details[exp.owner].name}\n`;
//                     } else {
//                         collapsibleData += `${userDeets.name} owes ${cost} dollars to ${data.user_details[exp.owner].name}\n`;
//                     }
//                 });

//                 res.push({
//                     id: exp.id,
//                     title: exp.title,
//                     subtitle: exp.description,
//                     description: `Total cost ${exp.total_cost}`,
//                     tooltip: data.user_details[exp.owner].email,
//                     owner,
//                     total_cost: exp.total_cost,
//                     collapsibleData,
//                     callback: navigateToExpenseInfoPage
//                 });
//             } catch (e) {
//                 console.log('Inproper data got from server', exp);
//                 console.log(e);
//             }
//         });
//         return res;
//     };

//     const navigateToExpenseInfoPage = (exp_id) => {
//         console.log('Expense Info: ', exp_id);
//     };

//     // Aggregate expense by category
//     const aggregateExpensesByCategory = () => {
//         const categoryTotals = {};
//         data.expenses?.forEach(exp => {
//             const category = exp.category || "Other";
//             categoryTotals[category] = (categoryTotals[category] || 0) + exp.total_cost;
//         });

//         return Object.keys(categoryTotals).map(category => ({
//             name: category,
//             total: categoryTotals[category],
//             color: getRandomColor(),
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 12
//         }));
//     };

//     const getRandomColor = () => {
//         const letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     };

//     const renderItem = ({ item }) => (
//         <ExpenseCard
//             collapsibleData={item.collapsibleData}
//             subtitle={item.subtitle}
//             title={item.title}
//             amount={item.total_cost}
//             description={item.description}
//             tooltip={item.owner}
//             image={undefined}
//             callback={item.callback}
//             exp_id={item.id}
//             owner={item.owner}
//         />
//     );

//     return (
//         <View style={{ borderColor: 'black' }}>
//             <Text style={styles.chartTitle}>Expenses</Text>
//             <View style={styles.chartContainer}>
//                 <PieChart
//                     data={aggregateExpensesByCategory()}
//                     width={screenWidth - 80} // Reduce width for smaller chart size
//                     height={180} // Reduce height for smaller chart size
//                     chartConfig={{
//                         backgroundColor: "#ffffff",
//                         backgroundGradientFrom: "#ffffff",
//                         backgroundGradientTo: "#ffffff",
//                         color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                     }}
//                     accessor="total"
//                     backgroundColor="transparent"
//                     paddingLeft="5"
//                     absolute
//                 />
//             </View>
//             <FlatList
//                 data={formatData()}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={handleRefresh}
//                         colors={["#ff6347"]}
//                     />
//                 }
//                 showsVerticalScrollIndicator={true} // Enables the vertical scroll bar
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     chartContainer: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 10,
//         padding: 10,
//         marginHorizontal: 20,
//         backgroundColor: "#f9f9f9",
//     },
//     chartTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 20,
//         textAlign: 'center',
//         color: '#333'
//     },
// });
import React, { useState, useCallback } from "react";
import { View, FlatList, Text, Dimensions, StyleSheet, RefreshControl, Animated, ScrollView } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import ExpenseCard from "./ExpenseCard";
import { PanGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";

export default function ExpensesRenderer({ data }) {
    const screenWidth = Dimensions.get("window").width;
    const [refreshing, setRefreshing] = useState(false);
    const [chartType, setChartType] = useState("pie");
    const translateX = new Animated.Value(0);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const formatData = () => {
        let res = [];
        data.expenses?.forEach(exp => {
            try {
                let ownerDeets = data.user_details[exp.owner].email;
                let current_user = data.current_user.email;
                let owner = ownerDeets === current_user ? 'You' : data.current_user.name;
                let collapsibleData = [];
                let members = Object.keys(exp.memberShare);
                
                members.forEach(member => {
                    let userDeets = data.user_details[member];
                    let cost = Math.abs(exp.memberShare[member]);

                    if (ownerDeets === userDeets.email && userDeets.email === current_user) {
                        collapsibleData = `You paid ${cost} dollars\n` + collapsibleData;
                    } else if (ownerDeets === userDeets.email) {
                        collapsibleData = `${userDeets.name} paid ${cost} dollars\n` + collapsibleData;
                    } else if (userDeets.email === current_user) {
                        collapsibleData += `You owe ${cost} dollars to ${data.user_details[exp.owner].name}\n`;
                    } else {
                        collapsibleData += `${userDeets.name} owes ${cost} dollars to ${data.user_details[exp.owner].name}\n`;
                    }
                });

                res.push({
                    id: exp.id,
                    title: exp.title,
                    subtitle: exp.description,
                    description: `Total cost ${exp.total_cost}`,
                    tooltip: data.user_details[exp.owner].email,
                    owner,
                    total_cost: exp.total_cost,
                    collapsibleData,
                    callback: navigateToExpenseInfoPage
                });
            } catch (e) {
                console.log('Improper data from server', exp);
                console.log(e);
            }
        });
        return res;
    };

    const navigateToExpenseInfoPage = (exp_id) => {
        console.log('Expense Info: ', exp_id);
    };

    const aggregateExpensesByCategory = () => {
        const categoryTotals = {};
        data.expenses?.forEach(exp => {
            const category = exp.category || "Other";
            categoryTotals[category] = (categoryTotals[category] || 0) + exp.total_cost;
        });

        return Object.keys(categoryTotals).map(category => ({
            name: category,
            total: categoryTotals[category],
            color: getRandomColor(),
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        }));
    };

    const aggregateExpensesForBarChart = () => {
        const categories = [];
        const totals = [];

        data.expenses?.forEach(exp => {
            const category = exp.category || "Other";
            if (!categories.includes(category)) {
                categories.push(category);
                totals.push(exp.total_cost);
            } else {
                totals[categories.indexOf(category)] += exp.total_cost;
            }
        });

        return { categories, totals };
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const renderItem = ({ item }) => (
        <ExpenseCard
            collapsibleData={item.collapsibleData}
            subtitle={item.subtitle}
            title={item.title}
            amount={item.total_cost}
            description={item.description}
            tooltip={item.owner}
            image={undefined}
            callback={item.callback}
            exp_id={item.id}
            owner={item.owner}
        />
    );

    const handleSwipe = (event) => {
        const { translationX } = event.nativeEvent;
        if (translationX < -50) {
            setChartType("bar");
        }
        if (translationX > 50) {
            setChartType("pie");
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={["#ff6347"]}
                    />
                }
            >
                <Text style={styles.chartTitle}>Budget</Text>
                <PanGestureHandler onGestureEvent={handleSwipe}>
                    <Animated.View style={{ transform: [{ translateX }] }}>
                        {chartType === "pie" ? (
                            <PieChart
                                data={aggregateExpensesByCategory()}
                                width={screenWidth - 30}
                                height={180}
                                chartConfig={{
                                    backgroundColor: "#ffffff",
                                    backgroundGradientFrom: "#ffffff",
                                    backgroundGradientTo: "#ffffff",
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                }}
                                accessor="total"
                                backgroundColor="transparent"
                                paddingLeft="15"
                                absolute
                                style={{ borderRadius: 15 }}
                            />
                        ) : (
                            <BarChart
                                data={{
                                    labels: aggregateExpensesForBarChart().categories,
                                    datasets: [
                                        {
                                            data: aggregateExpensesForBarChart().totals
                                        }
                                    ]
                                }}
                                width={screenWidth - 30}
                                height={180}
                                chartConfig={{
                                    backgroundColor: "#ffffff",
                                    backgroundGradientFrom: "#ffffff",
                                    backgroundGradientTo: "#ffffff",
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    barPercentage: 0.5
                                }}
                                style={{ borderRadius: 15 }}
                            />
                        )}
                    </Animated.View>
                </PanGestureHandler>
                <FlatList
                    data={formatData()}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}  // Disable FlatList's own scrolling
                    contentContainerStyle={styles.flatListContent}
                />
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 20,  // Prevent overlap with bottom elements
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        color: '#333'
    },
    flatListContent: {
        paddingBottom: 40,  // Extra padding for comfortable scrolling
    },
});
