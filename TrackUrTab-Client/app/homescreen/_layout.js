// /app/_layout.js
import { router, Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { Text, Button, StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreenLayout() {
    return (
        <GestureHandlerRootView>
            <Tabs screenOptions={({ navigation }) => ({
                tabBarActiveTintColor: '#ffd33d',
                headerRight: () => (
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={async () => {
                            await AsyncStorage.clear();
                            router.push('/');
                        }}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                ),
            })}>
                <Tabs.Screen name="personal" options={{
                    title: 'Personal',
                    tabBarIcon: ({ focused, color, size }) => (<Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />)

                }} />
                <Tabs.Screen name="group" options={{
                    title: 'Group',
                    tabBarIcon: ({ focused, color, size }) => (<Ionicons name={focused ? 'people-sharp' : 'people-outline'} color={color} size={24} />)
                }} />
            </Tabs>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'white', // White background
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 2, // For Android shadow effect
        shadowColor: '#000', // For iOS shadow effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.0,
        shadowRadius: 0,
    },
    buttonText: {
        color: 'black', // Black text color
        fontSize: 16
    },
})