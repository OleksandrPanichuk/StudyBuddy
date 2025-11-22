import { VerifyEmailView } from "@/features/auth/ui/views";
import { Suspense } from "react";

const VerifyEmailPage = () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <VerifyEmailView />;
        </Suspense>
    );
};

export default VerifyEmailPage;
