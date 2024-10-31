// /app/_layout.js
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreenLayout() {
    return (
        <Tabs  screenOptions={{ tabBarActiveTintColor: '#ffd33d' }}>
            <Tabs.Screen name="personal" options={{
                title: 'Personal',
                tabBarIcon: ({ focused, color, size }) => (<Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />)
                
            }} />
            <Tabs.Screen name="group" options={{
                title: 'Group', 
                tabBarIcon: ({ focused, color, size }) => (<Ionicons name={focused ? 'people-sharp' : 'people-outline'} color={color} size={24} />)
            }} />
        </Tabs>
    );
}
