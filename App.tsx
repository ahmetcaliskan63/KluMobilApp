import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/config/theme';
import { useAuthStore } from './src/store/authStore';
import { setApiCallbacks } from './src/services/apiClient';

function App(): React.JSX.Element {
  useEffect(() => {
    // Break circular dependency by injecting store callbacks into apiClient
    // at the app root level, after both modules are loaded.
    setApiCallbacks(
      () => useAuthStore.getState().token,
      () => useAuthStore.getState().logout()
    );
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;

