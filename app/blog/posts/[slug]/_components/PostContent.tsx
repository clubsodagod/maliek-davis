"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC } from "react";
import rehypeRaw from "rehype-raw";
import type { Options } from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { Button, CardMedia, Typography } from "@mui/material";
import ComponentTransition from "@/components/layout/ComponentTransition";
import { IBlogPostClient } from "@/library/types/blog.types";
import parameterize from "parameterize";

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
                                className="break-words"
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
                }}
            >
                {content}
            </ReactMarkdown>
        </ComponentTransition>
    );
};

export default PostContent;
