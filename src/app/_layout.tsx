// Inicializar Reactotron ANTES que todo lo demás (solo en desarrollo)
if (__DEV__) {
  require("@/core/config/reactotron.config");
}

import { AppProviders } from "@/core/providers/AppProviders";
import ThemedStack from "./ThemedStack";


/**
 * Root layout usando expo-router Stack con theme global
 */
export default function RootLayout() {
  return (
    <AppProviders>
      <ThemedStack />
    </AppProviders>
  );
}
