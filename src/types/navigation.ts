/**
 * Navigation Type Definitions
 */

export type RootStackParamList = {
    Splash: undefined;
    Auth: undefined;
    Main: undefined;
    AnnouncementDetail: { announcementId: string };
};

export type AuthStackParamList = {
    Login: undefined;
    ForgotPassword: undefined;
};

export type MainTabParamList = {
    HomeStack: undefined;
    Cafeteria: undefined;
    Announcements: undefined;
    Library: undefined;
    Profile: undefined;
};

export type HomeStackParamList = {
    Dashboard: undefined;
    Schedule: undefined;
    CourseDetail: { courseId: string };
    ExamDetail: { examId: string };
    OBS: undefined;
};
