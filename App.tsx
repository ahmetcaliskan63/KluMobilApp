import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '@/navigation/AppNavigator';
import { theme } from '@/config/theme';
import { useAuthStore } from '@/store/authStore';
import { setApiCallbacks } from '@/services/apiClient';

import { ErrorBoundary } from '@/components/common/ErrorBoundary';

function App(): React.JSX.Element {
  useEffect(() => {
    // Break circular dependency by injecting store callbacks into apiClient
    // at the app root level, after both modules are loaded.
    setApiCallbacks(
      () => useAuthStore.getState().token,
      () => useAuthStore.getState().logout()
    );
    useAuthStore.getState().initialize();
  }, []);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <AppNavigator />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;

