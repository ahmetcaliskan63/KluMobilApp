import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '@/core/navigation/AppNavigator';
import { theme } from '@/core/theme/theme';
import { useAuthStore } from '@/shared/store/authStore';
import { setApiCallbacks } from '@/shared/services/apiClient';

// Initialize i18n
import i18n from '@/shared/i18n/i18n';
import { useAppSettingsStore } from '@/shared/store/appSettingsStore';

import { ErrorBoundary } from '@/shared/components/common/ErrorBoundary';

function App(): React.JSX.Element {
  useEffect(() => {
    setApiCallbacks(
      () => useAuthStore.getState().token,
      () => useAuthStore.getState().logout()
    );
    useAuthStore.getState().initialize();
    
    // Set initial language from store
    const savedLanguage = useAppSettingsStore.getState().language;
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
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


