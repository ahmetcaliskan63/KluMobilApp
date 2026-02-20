import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardScreen } from '../screens/home/DashboardScreen';
import { ScheduleScreen } from '../screens/schedule/ScheduleScreen';
import { OBSScreen } from '../screens/home/OBSScreen';
import { CourseDetailScreen } from '../screens/home/CourseDetailScreen';
import { ExamDetailScreen } from '../screens/home/ExamDetailScreen';
import { NewsDetailScreen } from '../screens/home/NewsDetailScreen';
import { AnnouncementDetailScreen } from '../screens/home/AnnouncementDetailScreen';
import { EventDetailScreen } from '../screens/home/EventDetailScreen';
import { CafeteriaScreen } from '../screens/cafeteria/CafeteriaScreen';
import { LibraryScreen } from '../screens/library/LibraryScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

import { MainTabParamList, HomeStackParamList } from '../types/navigation';
import { TabBarIcon } from '../components/navigation/TabBarIcon';
import { NavigationHeaderLeft, NavigationHeaderRight } from '../components/navigation/NavigationHeader';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
        <HomeStack.Screen name="Schedule" component={ScheduleScreen} />
        <HomeStack.Screen name="OBS" component={OBSScreen} />
        <HomeStack.Screen name="CourseDetail" component={CourseDetailScreen} />
        <HomeStack.Screen name="ExamDetail" component={ExamDetailScreen} />
        <HomeStack.Screen name="NewsDetail" component={NewsDetailScreen} />
        <HomeStack.Screen name="AnnouncementDetail" component={AnnouncementDetailScreen} />
        <HomeStack.Screen name="EventDetail" component={EventDetailScreen} />
    </HomeStack.Navigator>
);

export const MainTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName = '';
                    switch (route.name) {
                        case 'HomeStack': iconName = 'home'; break;
                        case 'Cafeteria': iconName = focused ? 'restaurant' : 'restaurant-outline'; break;
                        case 'Library': iconName = focused ? 'book' : 'book-outline'; break;
                        case 'Settings': iconName = focused ? 'settings' : 'settings-outline'; break;
                        case 'Profile': iconName = focused ? 'person' : 'person-outline'; break;
                    }

                    return (
                        <TabBarIcon
                            name={iconName}
                            focused={focused}
                            color={focused ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'}
                            isCenter={route.name === 'HomeStack'}
                        />
                    );
                },
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: Platform.OS === 'ios' ? 95 : 75,
                    backgroundColor: '#101D42',
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(255, 255, 255, 0.05)',
                    paddingBottom: Platform.OS === 'ios' ? 35 : 12,
                    paddingTop: 12,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                    marginTop: -5,
                },
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#182958',
                    height: Platform.OS === 'ios' ? 120 : 110,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
                },
                headerTitleStyle: {
                    fontWeight: '900',
                    fontSize: 18,
                    color: '#FFFFFF',
                },
                headerTitleAlign: 'center',
                headerLeft: () => <NavigationHeaderLeft />,
                headerRight: () => <NavigationHeaderRight />,
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: true,
            })}>
            <Tab.Screen
                name="Cafeteria"
                component={CafeteriaScreen}
                options={{ title: 'Yemek' }}
            />
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{ title: 'Kütüphane' }}
            />
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';
                    const detailScreens = [
                        'NewsDetail',
                        'AnnouncementDetail',
                        'EventDetail',
                        'CourseDetail',
                        'ExamDetail',
                        'Schedule',
                        'OBS'
                    ];
                    const hideHeader = detailScreens.includes(routeName);

                    return {
                        title: 'Ana Sayfa',
                        headerShown: !hideHeader,
                        unmountOnBlur: true,
                        tabBarLabel: () => null,
                    };
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profil' }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Ayarlar' }}
            />
        </Tab.Navigator >
    );
};
