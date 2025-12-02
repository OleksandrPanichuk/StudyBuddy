export const Routes = {
    ROOT: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    VERIFY_EMAIL: "/verify-email",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    DASHBOARD: "/dashboard",
    CHATS: "/d/chats",
    NEW_CHAT: "/d/chats/new",
    LIBRARY: "/library",
    STUDY_SESSIONS: "/study-sessions",
    ANALYTICS: "/analytics",
    NOTES: "/notes",
} as const;

export type Routes = (typeof Routes)[keyof typeof Routes];
