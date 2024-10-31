// /app/_layout.js
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ title: 'Track-Ur-Tab' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="homescreen" options={{ headerShown: false }} />
    </Stack>
  );
}
