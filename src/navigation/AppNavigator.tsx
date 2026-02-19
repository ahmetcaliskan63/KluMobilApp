/**
 * App Navigator
 * Ana navigasyon yapısı
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/common/SplashScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { AuthNavigator } from './AuthNavigator';
import { useAuthStore } from '../store/authStore';
import { RootStackParamList } from '../types/navigation';

import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { AnnouncementsScreen } from '../screens/announcements/AnnouncementsScreen';
import { DigitalIDScreen } from '../screens/profile/DigitalIDScreen';
import { ProfileDetailScreen } from '../screens/profile/ProfileDetailScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';

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
                <Stack.Screen name="Auth" component={AuthNavigator} />
                <Stack.Screen name="Main" component={MainTabNavigator} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen
                    name="DigitalID"
                    component={DigitalIDScreen}
                    options={{
                        animation: 'slide_from_bottom',
                        presentation: 'fullScreenModal'
                    }}
                />
                <Stack.Screen
                    name="ProfileDetail"
                    component={ProfileDetailScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
