// /app/_layout.js
import { Stack } from "expo-router";
import { DataProvider } from "./dataprovider";

export default function Layout() {

  return (
    <DataProvider>
      <Stack screenOptions={{ title: 'Track-Ur-Tab' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="homescreen" options={{ headerShown: false }} />
        <Stack.Screen name="addexpense" options={{ title: 'Go to Expenses Page' }} />
        <Stack.Screen name="newgroup" options={{ title: 'Go to Groups Page' }} />
        <Stack.Screen name="group-info" options={{ title: 'Group Info' }} />
      </Stack>
    </DataProvider>
  );
}
