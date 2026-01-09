/**
 * Navigation Type Definitions
 */

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    ForgotPassword: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Schedule: undefined;
    Announcements: undefined;
    Library: undefined;
    Profile: undefined;
};

export type HomeStackParamList = {
    Dashboard: undefined;
    CourseDetail: { courseId: string };
    ExamDetail: { examId: string };
};
