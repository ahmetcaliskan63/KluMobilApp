/**
 * App Navigator
 * Ana navigasyon yapısı
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { DashboardScreen } from '../screens/home/DashboardScreen';
import { SplashScreen } from '../screens/common/SplashScreen';
import { useAuthStore } from '../store/authStore';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Auth" component={LoginScreen} />
                <Stack.Screen name="Main" component={DashboardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
