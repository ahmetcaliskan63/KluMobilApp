/**
 * Navigation Type Definitions
 * Ensures strict type safety across the application for all navigation flows
 */

export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    Auth: undefined;
    MainDrawer: undefined;
    Main: undefined;
    Profile: undefined;
    Announcements: undefined;
    Notifications: undefined;
    DigitalID: undefined;
    ProfileDetail: undefined;
    Transcript: undefined;
    AcademicCalendar: undefined;
    ExamSchedule: undefined;
    ExamResults: undefined;
    Faculty: undefined;
    Units: undefined;
    UnitDetail: { unitId: string };
    LeaveStatus: undefined;
};

export type DrawerParamList = {
    MainTabs: undefined;
    OurUniversity: undefined;
    CandidateStudent: undefined;
    Contact: undefined;
    Social: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    ForgotPassword: undefined;
};

export type MainTabParamList = {
    HomeStack: { screen?: keyof HomeStackParamList; params?: any } | undefined;
    Cafeteria: undefined;
    Library: undefined;
    Settings: undefined;
    Profile: undefined;
};

export type HomeStackParamList = {
    Dashboard: { resetToNews?: number } | undefined;
    Schedule: undefined;
    CourseDetail: { courseId: string };
    ExamDetail: { examId: string };
    OBS: undefined;
    NewsDetail: { newsId: string };
    AnnouncementDetail: { announcementId: string };
    EventDetail: { eventId: string };
};

