import React, { useState, useCallback, useEffect } from "react";
import { View, FlatList, Text, Dimensions, StyleSheet, RefreshControl, Animated, ScrollView, Alert } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import ExpenseCard from "./ExpenseCard";
import { PanGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";
import { router, useFocusEffect } from "expo-router";
import config from '../client_config.json';
import { useData } from "../app/dataprovider";

export default function ExpensesRenderer({ data }) {
    const screenWidth = Dimensions.get("window").width;
    const [refreshing, setRefreshing] = useState(false);
    const [chartType, setChartType] = useState("pie");
    const translateX = new Animated.Value(0);
    const { setData } = useData();
    const [flatListData, setFlatListData] = useState([]);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const formatData = useCallback(() => {
        const res = [];
        console.log('Personal Expenses from Expenses Renderer: ', data);
        data.expenses?.forEach(exp => {
            try {
                const ownerDeets = data.user_details[exp.owner].email;
                const current_user = data.current_user.email;
                const owner = ownerDeets === current_user ? 'You' : data.current_user.name;
                let collapsibleData = [];
                const members = Object.keys(exp.memberShare);
                
                members.forEach(member => {
                    const userDeets = data.user_details[member];
                    const cost = Math.abs(exp.memberShare[member]);
                    
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
                    callback: navigateToExpenseInfoPage,
                });
            } catch (e) {
                console.log('Improper data from server', exp);
                console.log(e);
            }
        });
        setFlatListData(res); // Set the formatted data to state
    }, [data]);

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

    const editExpense = (exp_id) => {
        console.log('Edit expense');
        const expense_details = data.expenses.find(exp => exp.id == exp_id) || {};
        console.log('Edit expense: ', expense_details);

        setData({
            type: 'editexpense',
            expense_id: exp_id,
            expense_details,
            current_user: data.current_user,
            grp_id: expense_details.grp_id
        });
        router.push('/addexpense');
    };

    const deleteExpense = (exp_id) => {
        const deleteExpenditure = async () => {
            const url = `http://${config.server_ip}:${config.server_port}/expense/delete/${exp_id}`;
            const deleteBody = {
                token: data.current_user.token
            };
            try {
                const response = await fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(deleteBody)
                });
                const responseData = await response.json();
                if (responseData.status === '200') {
                    // Delete the data from the data list 
                    data.expenses = data.expenses.filter(exp => exp.id !== exp_id);
                    router.push('/homescreen');
                } else {
                    Alert.alert(
                        "There was an issue when deleting the expense",
                        responseData.data,
                        [{ text: 'OK', style: 'cancel' }]
                    );
                }
            } catch (e) {
                Alert.alert(
                    "There was an issue when deleting the expense",
                    "Internal Server Error",
                    [{ text: 'OK', style: 'cancel' }]
                );
                console.log(e);
            }
        };
        Alert.alert(
            "Do you want to delete?",
            "Your data will be permanently lost",
            [
                { text: 'Cancel', onPress: () => console.log('Cancel delete'), style: 'cancel' },
                { text: 'Delete', onPress: deleteExpenditure },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        formatData();
    }, [data]); // Call formatData whenever data changes

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
                                    datasets: [{ data: aggregateExpensesForBarChart().totals }]
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
                        data={flatListData} // Use the formatted data stored in state
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()} // Ensure keyExtractor is a string
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
    
                       
