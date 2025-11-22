"use client";
import { authClient } from "@/auth/client";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()

    const handleSignOut = async () => {
        await authClient.signOut();
        router.refresh();
    }

    return (
        <div>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
};

export default Page;
