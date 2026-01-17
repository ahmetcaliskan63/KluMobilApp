import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { DashboardScreen } from '../screens/home/DashboardScreen';
import { CafeteriaScreen } from '../screens/cafeteria/CafeteriaScreen';
import { AnnouncementsScreen } from '../screens/announcements/AnnouncementsScreen';
import { LibraryScreen } from '../screens/library/LibraryScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { MainTabParamList } from '../types/navigation';
import { theme } from '../config/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Cafeteria':
                            iconName = focused ? 'restaurant' : 'restaurant-outline';
                            break;
                        case 'Announcements':
                            iconName = focused ? 'notifications' : 'notifications-outline';
                            break;
                        case 'Library':
                            iconName = focused ? 'book' : 'book-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                    }

                    return <Icon name={iconName} size={24} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textLight,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 12,
                    paddingTop: 8,
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E0E0E0',
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                },
                headerShown: true,
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                // PDF'deki gibi sadece aktif olanın etiketini gösterme tercihi
                tabBarShowLabel: true,
            })}>
            <Tab.Screen
                name="Home"
                component={DashboardScreen}
                options={{ title: 'Ana Sayfa', headerShown: false }}
            />
            <Tab.Screen
                name="Cafeteria"
                component={CafeteriaScreen}
                options={{ title: 'Yemekhane', headerShown: false }}
            />
            <Tab.Screen
                name="Announcements"
                component={AnnouncementsScreen}
                options={{ title: 'Duyurular', headerShown: false }}
            />
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{ title: 'Kütüphane', headerShown: false }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profil', headerShown: false }}
            />
        </Tab.Navigator>
    );
};
