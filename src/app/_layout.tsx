import { AppProviders } from "@/core/providers/AppProviders";
import { Stack } from "expo-router";

/**
 * Root layout usando expo-router Stack
 */
export default function RootLayout() {
  return (
    <AppProviders>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/login" />
      </Stack>
    </AppProviders>
  );
}
