"use client";

import { cn } from "@/utils";
import { HTMLAttributes } from "react";

export const MarkdownTable = ({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLTableElement>) => {
    return (
        <div className="my-4 w-full overflow-x-auto rounded-lg border border-border shadow-sm">
            <table
                className={cn("w-full border-collapse text-sm", className)}
                {...props}
            >
                {children}
            </table>
        </div>
    );
};

export const MarkdownTableHead = ({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLTableSectionElement>) => {
    return (
        <thead
            className={cn("bg-muted/50 dark:bg-muted/30", className)}
            {...props}
        >
            {children}
        </thead>
    );
};

export const MarkdownTableBody = ({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLTableSectionElement>) => {
    return (
        <tbody
            className={cn("[&>tr:last-child]:border-0", className)}
            {...props}
        >
            {children}
        </tbody>
    );
};

export const MarkdownTableRow = ({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLTableRowElement>) => {
    return (
        <tr
            className={cn(
                "border-b border-border transition-colors hover:bg-muted/30 dark:hover:bg-muted/20",
                className,
            )}
            {...props}
        >
            {children}
        </tr>
    );
};

export const MarkdownTableHeaderCell = ({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLTableCellElement>) => {
    return (
        <th
            className={cn(
                "h-10 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0",
                className,
            )}
            {...props}
        >
            {children}
        </th>
    );
};

export const MarkdownTableCell = ({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLTableCellElement>) => {
    return (
        <td
            className={cn(
                "p-4 align-middle text-muted-foreground [&:has([role=checkbox])]:pr-0",
                className,
            )}
            {...props}
        >
            {children}
        </td>
    );
};
