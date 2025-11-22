import { ResetPasswordView } from "@/features/auth";
import { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <ResetPasswordView />;
        </Suspense>
    );
}
