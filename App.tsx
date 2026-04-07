import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '@/app/navigation/AppNavigator';
import { theme } from '@/app/theme/theme';
import { useAuthStore } from '@/shared/store/authStore';
import { setApiCallbacks } from '@/shared/services/apiClient';

import { ErrorBoundary } from '@/shared/components/common/ErrorBoundary';

function App(): React.JSX.Element {
  useEffect(() => {
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


