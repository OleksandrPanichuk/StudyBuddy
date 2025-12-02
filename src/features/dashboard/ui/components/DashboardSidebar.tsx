"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator,
    Skeleton,
} from "@/components/ui";
import { NewChatDialog } from "@/features/chats";
import {
    librarySidebarItems,
    platformSidebarItems,
    studySessionsSidebarItems,
    tutorChatsSidebarItems,
    UserMenu,
} from "@/features/dashboard";
import {
    BotIcon,
    ChevronsUpDownIcon,
    GraduationCapIcon,
    LibraryIcon,
    ListIcon,
    MessageSquareIcon,
    PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const DashboardSidebar = () => {
    const pathname = usePathname();
    const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);

    return (
        <>
            <NewChatDialog
                open={isNewChatDialogOpen}
                onOpenChange={setIsNewChatDialogOpen}
            />
            <Sidebar collapsible="offcanvas">
                <SidebarHeader className="p-4">
                    <div className="flex items-center gap-2 px-1">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <BotIcon className="size-5" />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-semibold">Study Buddy</span>
                            <span className="text-xs text-muted-foreground">
                                AI Learning Platform
                            </span>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarSeparator className="mx-0" />
                <SidebarContent>
                    {/* Platform Group */}
                    <SidebarGroup>
                        <SidebarGroupLabel>Platform</SidebarGroupLabel>
                        <SidebarMenu>
                            {platformSidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        className="h-auto"
                                        isActive={pathname === item.href}
                                        tooltip={item.title}
                                        asChild
                                    >
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>

                    {/* Learning Group with Accordions */}
                    <SidebarGroup>
                        <SidebarGroupLabel>Learning</SidebarGroupLabel>
                        <SidebarMenu>
                            <Accordion type="multiple" className="w-full">
                                {/* Tutor Chats */}
                                <AccordionItem
                                    value="chats"
                                    className="border-none"
                                >
                                    <AccordionTrigger className="py-2 px-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline rounded-md [&>svg:last-child]:size-4 [&>svg:last-child]:shrink-0 [&>svg:last-child]:text-sidebar-foreground/50">
                                        <div className="flex items-center gap-2">
                                            <MessageSquareIcon className="size-4" />
                                            <span>Tutor Chats</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0 pl-2">
                                        <SidebarMenuSubButton
                                            className="mb-1"
                                            asChild
                                        >
                                            <Button
                                                variant={"ghost"}
                                                className="w-full justify-start px-2!"
                                                onClick={() =>
                                                    setIsNewChatDialogOpen(true)
                                                }
                                            >
                                                <PlusIcon className="size-4 mr-0.5" />
                                                <span>New Chat</span>
                                            </Button>
                                        </SidebarMenuSubButton>
                                        <SidebarMenuSubButton
                                            className="mb-1"
                                            asChild
                                            isActive={pathname === "/d/chats"}
                                        >
                                            <Button
                                                variant={"ghost"}
                                                className="w-full justify-start px-2!"
                                                asChild
                                            >
                                                <Link href="/d/chats">
                                                    <ListIcon className="size-4 mr-0.5" />
                                                    <span>View All</span>
                                                </Link>
                                            </Button>
                                        </SidebarMenuSubButton>
                                        <SidebarMenuSub>
                                            {tutorChatsSidebarItems.map(
                                                (item) => (
                                                    <SidebarMenuSubItem
                                                        key={item.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={
                                                                pathname ===
                                                                item.href
                                                            }
                                                        >
                                                            <Link
                                                                href={item.href}
                                                            >
                                                                <span>
                                                                    {item.title}
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ),
                                            )}
                                        </SidebarMenuSub>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Study Sessions */}
                                <AccordionItem
                                    value="sessions"
                                    className="border-none"
                                >
                                    <AccordionTrigger className="py-2 px-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline rounded-md [&>svg:last-child]:size-4 [&>svg:last-child]:shrink-0 [&>svg:last-child]:text-sidebar-foreground/50">
                                        <div className="flex items-center gap-2">
                                            <GraduationCapIcon className="size-4" />
                                            <span>Study Sessions</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0 pl-2">
                                        <SidebarMenuSubButton
                                            className="mb-1"
                                            asChild
                                        >
                                            <Button
                                                variant={"ghost"}
                                                className="justify-start w-full px-2!"
                                            >
                                                <PlusIcon className="size-4 mr-0.5" />
                                                <span>New Session</span>
                                            </Button>
                                        </SidebarMenuSubButton>
                                        <SidebarMenuSubButton
                                            className="mb-1"
                                            asChild
                                            isActive={
                                                pathname === "/d/sessions"
                                            }
                                        >
                                            <Button
                                                variant={"ghost"}
                                                className="w-full justify-start px-2!"
                                                asChild
                                            >
                                                <Link href="/d/sessions">
                                                    <ListIcon className="size-4 mr-0.5" />
                                                    <span>View All</span>
                                                </Link>
                                            </Button>
                                        </SidebarMenuSubButton>
                                        <SidebarMenuSub>
                                            {studySessionsSidebarItems.map(
                                                (item) => (
                                                    <SidebarMenuSubItem
                                                        key={item.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={
                                                                pathname ===
                                                                item.href
                                                            }
                                                        >
                                                            <Link
                                                                href={item.href}
                                                            >
                                                                <span>
                                                                    {item.title}
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ),
                                            )}
                                        </SidebarMenuSub>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Library */}
                                <AccordionItem
                                    value="library"
                                    className="border-none"
                                >
                                    <AccordionTrigger className="py-2 px-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline rounded-md [&>svg:last-child]:size-4 [&>svg:last-child]:shrink-0 [&>svg:last-child]:text-sidebar-foreground/50">
                                        <div className="flex items-center gap-2">
                                            <LibraryIcon className="size-4" />
                                            <span>Library</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0">
                                        <SidebarMenuSub>
                                            {librarySidebarItems.map((item) => (
                                                <SidebarMenuSubItem
                                                    key={item.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={
                                                            pathname ===
                                                            item.href
                                                        }
                                                    >
                                                        <Link href={item.href}>
                                                            <span>
                                                                {item.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="p-2">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <UserMenu
                                skeleton={
                                    <SidebarMenuButton
                                        size="lg"
                                        className="pointer-events-none"
                                    >
                                        <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
                                        <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
                                            <Skeleton className="h-4 w-20" />
                                            <Skeleton className="h-3 w-28" />
                                        </div>
                                        <Skeleton className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                }
                            >
                                {(data) => (
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="size-8 rounded-lg">
                                            <AvatarImage
                                                src={
                                                    data?.user?.image ??
                                                    undefined
                                                }
                                                alt={data?.user?.name ?? "User"}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                {data?.user?.name
                                                    ?.charAt(0)
                                                    .toUpperCase() ?? "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {data?.user?.name ?? "Guest"}
                                            </span>
                                            <span className="truncate text-xs">
                                                {data?.user?.email ?? ""}
                                            </span>
                                        </div>
                                        <ChevronsUpDownIcon className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                )}
                            </UserMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    );
};
