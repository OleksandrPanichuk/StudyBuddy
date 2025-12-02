"use client";

import { authClient } from "@/auth/client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    useSidebar,
} from "@/components/ui";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface IUserMenuProps {
    children: (
        data: ReturnType<typeof authClient.useSession>["data"],
    ) => ReactNode;
    skeleton?: ReactNode;
    side?: "right" | "bottom" | "left" | "top";
}

export const UserMenu = ({ children, skeleton, side }: IUserMenuProps) => {
    const { isMobile } = useSidebar();
    const { data, isPending } = authClient.useSession();
    const router = useRouter();

    if (isPending) {
        return skeleton ?? null;
    }

    const user = data?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children(data)}</DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={side ?? (isMobile ? "bottom" : "right")}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                                src={user?.image ?? undefined}
                                alt={user?.name ?? "User"}
                            />
                            <AvatarFallback className="rounded-lg">
                                {user?.name?.charAt(0).toUpperCase() ?? "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                {user?.name ?? "Guest"}
                            </span>
                            <span className="truncate text-xs">
                                {user?.email ?? ""}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Sparkles className="mr-2 size-4" />
                        Upgrade to Pro
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/profile/settings">
                            <BadgeCheck className="mr-2 size-4" />
                            Account
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard className="mr-2 size-4" />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell className="mr-2 size-4" />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 size-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
