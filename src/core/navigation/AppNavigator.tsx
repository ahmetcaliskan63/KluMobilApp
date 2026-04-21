/**
 * App Navigator
 * Ana navigasyon yapısı
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '@/features/splash/screens/SplashScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { AuthNavigator } from './AuthNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent } from '@/shared/components/navigation/CustomDrawerContent';
import { RootStackParamList, DrawerParamList } from '@/shared/types/navigation';
import { viewport } from '@/shared/utils/responsive';
import { OnboardingScreen } from '@/features/onboarding/screens/OnboardingScreen';

import {
    ProfileScreen,
    DigitalIDScreen,
    ProfileDetailScreen,
    LeaveStatusScreen
} from '@/features/profile/screens';
import { TranscriptScreen } from '@/features/transcript/screens/TranscriptScreen';
import { AnnouncementsScreen } from '@/features/announcements/screens/AnnouncementsScreen';
import { NotificationsScreen } from '@/features/notifications/screens/NotificationsScreen';
import AcademicCalendarScreen from '@/features/academic/screens/AcademicCalendarScreen';
import { ExamScheduleScreen } from '@/features/exams/screens/ExamScheduleScreen';
import { ExamResultsScreen } from '@/features/exams/screens/ExamResultsScreen';
import { FacultyScreen } from '@/features/faculty/screens/FacultyScreen';
import { UnitsScreen } from '@/features/university/screens/UnitsScreen';
import { UnitDetailScreen } from '@/features/university/screens/UnitDetailScreen';

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
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
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
                <Stack.Screen
                    name="Units"
                    component={UnitsScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name="UnitDetail"
                    component={UnitDetailScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name="LeaveStatus"
                    component={LeaveStatusScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

