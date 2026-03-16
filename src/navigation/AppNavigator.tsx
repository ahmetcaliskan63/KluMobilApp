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
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent } from '../components/navigation/CustomDrawerContent';
import { RootStackParamList, DrawerParamList } from '../types/navigation';
import { viewport } from '../utils/responsive';

import {
    ProfileScreen,
    DigitalIDScreen,
    ProfileDetailScreen
} from '../screens/profile';
import { TranscriptScreen } from '../screens/transcript';
import { AnnouncementsScreen } from '../screens/announcements/AnnouncementsScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import AcademicCalendarScreen from '../screens/academic-calendar/AcademicCalendarScreen';
import { ExamScheduleScreen } from '../screens/exam-schedule/ExamScheduleScreen';
import { ExamResultsScreen } from '../screens/exam-results/ExamResultsScreen';
import { FacultyScreen } from '../screens/faculty/FacultyScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const MainDrawerNavigator = () => (
    <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
            headerShown: false,
            drawerType: 'front',
            drawerStyle: {
                width: viewport.width * 0.8,
            },
        }}
    >
        <Drawer.Screen name="MainTabs" component={MainTabNavigator} />
    </Drawer.Navigator>
);

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
                <Stack.Screen name="Main" component={MainDrawerNavigator} />
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
                <Stack.Screen
                    name="Transcript"
                    component={TranscriptScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name="AcademicCalendar"
                    component={AcademicCalendarScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name="ExamSchedule"
                    component={ExamScheduleScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name="ExamResults"
                    component={ExamResultsScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name="Faculty"
                    component={FacultyScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
