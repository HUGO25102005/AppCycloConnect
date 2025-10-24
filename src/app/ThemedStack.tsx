import { Stack } from "expo-router";
import { useAppTheme } from "@/features/theme";

/**
 * Stack navigator con theme aplicado
 * Debe estar dentro de AppProviders para acceder a Redux
 */
export function ThemedStack() {
  const theme = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.bg },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/login" />
    </Stack>
  );
}
