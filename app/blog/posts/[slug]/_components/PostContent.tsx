/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { FC } from 'react'
import rehypeRaw from "rehype-raw";
import type { Options } from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import { Button, CardMedia, Typography } from '@mui/material';
import ComponentTransition from '@/components/layout/ComponentTransition';
import { IBlogPostClient } from '@/library/types/blog.types';

type RehypePlugin = (options?: Options) => (tree: any, file: any) => any;

/**
 * Component to render the content of a blog post using ReactMarkdown.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {IBlogPostClient['content'] | undefined} props.content - The content of the blog post to be rendered.
 *
 * @returns {JSX.Element} The rendered blog post content.
 *
 * @example
 * // Example usage:
 * // <PostContent content={blogPostContent} />
 *
 * @remarks
 * This component uses `ReactMarkdown` to render markdown content. It also customizes the rendering of certain HTML elements
 * such as `img`, `h1`, `h2`, `h3`, `h4`, `h5`, and `h6` using Material-UI components.
 *
 * @see {@link https://github.com/remarkjs/react-markdown} for more information about ReactMarkdown.
 * @see {@link https://mui.com/} for more information about Material-UI.
 */
const PostContent: FC<{
    content: IBlogPostClient['content'] | undefined;
}> = ({
    content
}) => {
        return (
            <ComponentTransition
            >
                <ReactMarkdown rehypePlugins={[[rehypeRaw as RehypePlugin]]}
                    components={{
                        img: (props) => (
                            <Button sx={{ borderRadius: '50px' }} className="w-full p-3">
                                <div className='flex justify-center items-center w-full h-[45vh] blur-wrapper' onClick={() => { }}>
                                    <CardMedia sx={{ borderRadius: '50px' }} className='object-cover h-full ' src={props.src} alt={props.alt} component="img" />
                                </div>
                            </Button>
                        ),
                        h1: (props) => (
                            <Typography variant='h1'>{props.children}</Typography>
                        ),
                        h2: (props) => (
                            <Typography variant='h2'>{props.children}</Typography>
                        ),
                        h3: (props) => (
                            <Typography variant='h3'>{props.children}</Typography>
                        ),
                        h4: (props) => (
                            <Typography variant='h4'>{props.children}</Typography>
                        ),
                        h5: (props) => (
                            <Typography variant='h5'>{props.children}</Typography>
                        ),
                        h6: (props) => (
                            <Typography variant='h6'>{props.children}</Typography>
                        ),
                    }}>
                    {content}
                </ReactMarkdown>
            </ComponentTransition>

        )
    }

export default PostContent