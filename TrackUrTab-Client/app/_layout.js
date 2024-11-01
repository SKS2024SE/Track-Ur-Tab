// /app/_layout.js
import { Stack } from "expo-router";
import { DataProvider } from "./dataprovider";

export default function Layout() {

  return (
    <DataProvider>
      <Stack screenOptions={{ title: 'Track-Ur-Tab' }}>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="login" options={{headerShown: false}}/>
        <Stack.Screen name="signup" options={{headerShown: false}}/>
        <Stack.Screen name="homescreen" options={{ headerShown: false }} />
        <Stack.Screen name="addexpense" options={{ title: 'Add Expense' }} /> {/* AddExpense screen */}
        <Stack.Screen name="group-info" options={{ title: 'Group Info' }} />
      </Stack>
    </DataProvider>
  );
}
