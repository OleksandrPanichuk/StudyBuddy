import { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <div
            className={
                "flex items-center justify-center min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100 dark:from-sky-950 dark:via-background dark:to-indigo-950"
            }
        >
            {children}
        </div>
    );
};
