import { SidebarInset, SidebarProvider } from "@/components/ui";
import { DashboardHeader, DashboardSidebar } from "@/features/dashboard";
import { PropsWithChildren } from "react";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <div className="flex flex-col">
                    <DashboardHeader />
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};
