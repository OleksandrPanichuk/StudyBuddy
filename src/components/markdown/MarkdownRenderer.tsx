"use client";

import {
    MarkdownCodeBlock,
    MarkdownTable,
    MarkdownTableBody,
    MarkdownTableCell,
    MarkdownTableHead,
    MarkdownTableHeaderCell,
    MarkdownTableRow,
} from "@/components/markdown";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";
import { Children, ReactElement } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface IMarkdownRendererProps {
    markdown: string;
}

export const MarkdownRenderer = ({ markdown }: IMarkdownRendererProps) => {
    return (
        <Markdown
            remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
            rehypePlugins={[
                rehypeRaw,
                rehypeKatex,
                rehypeHighlight,
                rehypeSlug,
            ]}
            components={{
                code: MarkdownCodeBlock,
                table: MarkdownTable,
                thead: MarkdownTableHead,
                tbody: MarkdownTableBody,
                tr: MarkdownTableRow,
                th: MarkdownTableHeaderCell,
                td: MarkdownTableCell,
                p: ({ children }) => (
                    <p className="mb-4 leading-7 last:mb-0">{children}</p>
                ),
                h1: ({ children, id }) => (
                    <h1
                        id={id}
                        className="mt-8 mb-4 text-3xl font-bold tracking-tight first:mt-0 scroll-m-20"
                    >
                        {children}
                    </h1>
                ),
                h2: ({ children, id }) => (
                    <h2
                        id={id}
                        className="mt-8 mb-4 text-2xl font-semibold tracking-tight first:mt-0 scroll-m-20"
                    >
                        {children}
                    </h2>
                ),
                h3: ({ children, id }) => (
                    <h3
                        id={id}
                        className="mt-6 mb-3 text-xl font-semibold tracking-tight first:mt-0 scroll-m-20"
                    >
                        {children}
                    </h3>
                ),
                h4: ({ children, id }) => (
                    <h4
                        id={id}
                        className="mt-6 mb-3 text-lg font-semibold tracking-tight first:mt-0 scroll-m-20"
                    >
                        {children}
                    </h4>
                ),
                h5: ({ children, id }) => (
                    <h5
                        id={id}
                        className="mt-4 mb-2 text-base font-semibold first:mt-0"
                    >
                        {children}
                    </h5>
                ),
                h6: ({ children, id }) => (
                    <h6
                        id={id}
                        className="mt-4 mb-2 text-sm font-semibold first:mt-0"
                    >
                        {children}
                    </h6>
                ),
                // Lists with task list support
                ul: ({ children }) => (
                    <ul className="my-4 ml-6 list-disc space-y-2 [&>li]:pl-1 [&_input[type=checkbox]]:mr-2">
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="my-4 ml-6 list-decimal space-y-2 [&>li]:pl-1">
                        {children}
                    </ol>
                ),
                li: ({ children, className }) => {
                    const isTaskList = className?.includes("task-list-item");
                    return (
                        <li
                            className={`leading-7 ${isTaskList ? "list-none -ml-6" : ""}`}
                        >
                            {children}
                        </li>
                    );
                },
                // Task list checkbox styling
                input: ({ type, checked, disabled }) => {
                    if (type === "checkbox") {
                        return (
                            <input
                                type="checkbox"
                                checked={checked}
                                disabled={disabled}
                                className="mr-2 accent-primary cursor-default"
                                readOnly
                            />
                        );
                    }
                    return <input type={type} />;
                },
                blockquote: ({ children }) => (
                    <blockquote className="my-4 border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
                        {children}
                    </blockquote>
                ),
                hr: () => <hr className="my-6 border-border" />,
                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                    >
                        {children}
                    </a>
                ),
                strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                pre: ({ children }) => (
                    <pre className="my-4 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm">
                        {children}
                    </pre>
                ),
                img: ({ src, alt }) => (
                    <img
                        src={src}
                        alt={alt}
                        className="rounded-lg border border-border shadow-sm my-4 max-w-full h-auto"
                    />
                ),
                details: ({ children }) => {
                    const childArray = Children.toArray(children);

                    const summary = childArray.find((child) => {
                        const element = child as ReactElement<{
                            node?: { tagName?: string };
                        }>;
                        return (
                            element?.type === "summary" ||
                            element?.props?.node?.tagName === "summary"
                        );
                    });

                    const content = childArray.filter(
                        (child) => child !== summary,
                    );

                    return (
                        <Accordion type="single" collapsible className="my-4">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    {summary || "Details"}
                                </AccordionTrigger>
                                <AccordionContent>{content}</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    );
                },
                summary: ({ children }) => <>{children}</>,
            }}
        >
            {markdown}
        </Markdown>
    );
};
