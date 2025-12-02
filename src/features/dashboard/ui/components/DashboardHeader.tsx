"use client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Input,
    SidebarTrigger,
    Skeleton,
} from "@/components/ui";
import { Bell, Search } from "lucide-react";
import { UserMenu } from "@/features/dashboard";

export const DashboardHeader = () => {
    return (
        <header className="sticky top-0 z-10 flex w-full h-14 items-center justify-between gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search courses, notes, buddies..."
                    className="pl-9"
                />
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="size-5" />
                    <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        3
                    </span>
                </Button>
                <UserMenu
                    side="bottom"
                    skeleton={<Skeleton className="size-8 rounded-lg" />}
                >
                    {(data) => (
                        <button>
                            <Avatar className="size-8 rounded-lg">
                                <AvatarImage
                                    src={data?.user?.image ?? undefined}
                                    alt={data?.user?.name ?? "User"}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {data?.user?.name
                                        ?.charAt(0)
                                        .toUpperCase() ?? "U"}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    )}
                </UserMenu>
            </div>
        </header>
    );
};
