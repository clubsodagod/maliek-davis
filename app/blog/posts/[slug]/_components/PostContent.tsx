"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC } from "react";
import rehypeRaw from "rehype-raw";
import type { Options } from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { Button, CardMedia, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import ComponentTransition from "@/components/layout/ComponentTransition";
import { IBlogPostClient } from "@/library/types/blog.types";
import parameterize from "parameterize";
import Link from "next/link";

type RehypePlugin = (options?: Options) => (tree: any, file: any) => any;

const PostContent: FC<{
    content: IBlogPostClient["content"] | undefined;
}> = ({ content }) => {
    return (
        <ComponentTransition>
            <ReactMarkdown
                rehypePlugins={[[rehypeRaw as RehypePlugin]]}
                components={{
                    img: (props) => (
                        <Button sx={{ borderRadius: "50px" }} className="w-full p-3">
                            <div
                                className="flex justify-center items-center w-full h-[45vh] blur-wrapper"
                                onClick={() => { }}
                            >
                                <CardMedia
                                    sx={{ borderRadius: "50px" }}
                                    className="object-cover h-full"
                                    src={props.src}
                                    alt={props.alt}
                                    component="img"
                                />
                            </div>
                        </Button>
                    ),
                    h1: ({ children }) => {
                        const id = parameterize(children?.toString() || "");
                        return (
                            <Typography
                                className="break-words"
                                variant="h3"
                                id={id}
                                gutterBottom
                            >
                                {children}
                            </Typography>
                        );
                    },
                    h2: ({ children }) => {
                        const id = parameterize(children?.toString() || "");
                        return (
                            <Typography
                                className="break-words"
                                variant="h4"
                                id={id}
                                gutterBottom
                            >
                                {children}
                            </Typography>
                        );
                    },
                    h3: ({ children }) => {
                        const id = parameterize(children?.toString() || "");
                        return (
                            <Typography
                                className="break-words pt-10"
                                variant="h4"
                                id={id}
                                gutterBottom
                            >
                                {children}
                            </Typography>
                        );
                    },
                    h4: ({ children }) => {
                        const id = parameterize(children?.toString() || "");
                        return (
                            <Typography
                                className="break-words"
                                variant="h4"
                                id={id}
                                gutterBottom
                            >
                                {children}
                            </Typography>
                        );
                    },
                    h5: ({ children }) => {
                        const id = parameterize(children?.toString() || "");
                        return (
                            <Typography
                                className="break-words"
                                variant="h5"
                                id={id}
                                gutterBottom
                            >
                                {children}
                            </Typography>
                        );
                    },
                    h6: ({ children }) => {
                        const id = parameterize(children?.toString() || "");
                        return (
                            <Typography
                                className="break-words"
                                variant="h6"
                                id={id}
                                gutterBottom
                            >
                                {children}
                            </Typography>
                        );
                    },
                    hr: () => {
                        return (
                            <hr className="my-10 " />
                        );
                    },
                    ol: ({ children }) => {
                        return (
                            <ol className="my-4">
                                {children}
                            </ol>
                        );
                    },
                    li: ({ children }) => {
                        return (
                            <div className="pl-12">
                                <li className="my-2 list-disc pl-3  mt-2">
                                    {children}
                                </li>
                            </div>

                        );
                    }, table: ({ children }) => {
                        return (
                            <Table
                                className="my-6 border border-solid border-gray-300 shadow-sm rounded-md overflow-hidden "
                            >
                                {children}
                            </Table>
                        );
                    },

                    thead: ({ children }) => {
                        return (
                            <TableHead
                                sx={{
                                    backgroundColor: "#1e1e1e",
                                    color: "theme.palette.primary.main" // or use `theme.palette.primary.main` if using MUI theme
                                }}
                                className=" uppercase tracking-wide"
                            >
                                {children}
                            </TableHead>
                        );
                    },

                    tbody: ({ children }) => {
                        return (
                            <TableBody
                                className="divide-y divide-gray-200"
                            >
                                {children}
                            </TableBody>
                        );
                    },

                    tr: ({ children }) => {
                        return (
                            <TableRow className="hover:bg-gray-300 transition-colors duration-200">
                                {children}
                            </TableRow>
                        );
                    },

                    th: ({ children }) => {
                        return (
                            <TableCell
                                component="th"
                                scope="col"
                                className="px-4 py-2 font-semibold text-left  bg-(--foreground) text-sm"
                                sx={{
                                    color: "#60abe4"
                                }}
                            >
                                {children}
                            </TableCell>
                        );
                    },

                    td: ({ children }) => {
                        return (
                            <TableCell
                                className="px-4 py-2 text-sm text-(--background)"
                            >
                                {children}
                            </TableCell>
                        );
                    },
                    a: ({ children, href }) => {
                        if (!href) return <>{children}</>;
                        
                        return (
                            <Link href={href || " "} style={{ color: "#60abe4" }} className="underline">
                                {children}
                            </Link>
                        )
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </ComponentTransition>
    );
};

export default PostContent;
