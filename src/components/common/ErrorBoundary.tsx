import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../config/theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // In a real app, send to Sentry/Crashlytics here
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Icon name="alert-circle" size={80} color={theme.colors.error} />
            </View>
            <Text style={styles.title}>Eyvah!</Text>
            <Text style={styles.subtitle}>
              Beklenmedik bir hata oluştu. Uygulamayı yeniden başlatmayı deneyebilirsiniz.
            </Text>
            
            {__DEV__ && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{this.state.error?.toString()}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={this.handleReset}>
              <Text style={styles.buttonText}>Tekrar Dene</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  errorBox: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
  },
  errorText: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: '#FF3B30',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
