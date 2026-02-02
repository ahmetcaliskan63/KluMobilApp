/**
 * Navigation Type Definitions
 */

export type RootStackParamList = {
    Splash: undefined;
    Auth: undefined;
    Main: undefined;
    AnnouncementDetail: { announcementId: string };
    Profile: undefined; // Profil global bir ekran oldu
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
    Settings: undefined; // Ayarlar yeni sekme olarak eklendi
};

export type HomeStackParamList = {
    Dashboard: undefined;
    Schedule: undefined;
    CourseDetail: { courseId: string };
    ExamDetail: { examId: string };
    OBS: undefined;
};
