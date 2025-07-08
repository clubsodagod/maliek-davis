/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import parameterize from 'parameterize';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';

type TOCEntry = {
    id: string;
    title: string;
    tag: 'h1' | 'h2' | 'h3';
};

const TableOfContents: React.FC<{ payload: any }> = ({ payload }) => {
    const toc: TOCEntry[] = [];

    unified()
        .use(rehypeParse, { fragment: true })
        .use(() => {
            return (tree) => {
                visit(tree, 'element', (node: any) => {
                    const tag = node.tagName;
                    if (!['h1', 'h2', 'h3'].includes(tag)) return;

                    const textNode = node.children?.[0];
                    const isValid = textNode?.type === 'text' && typeof textNode.value === 'string';
                    if (!isValid) return;

                    const title = textNode.value;
                    const id = parameterize(title);

                    node.properties = node.properties || {};
                    node.properties.id = id;

                    toc.push({ id, title, tag });
                });
            };
        })
        .use(rehypeStringify)
        .processSync(payload);

    const getIndentation = (tag: TOCEntry['tag']) => {
        switch (tag) {
            case 'h1': return 0;
            case 'h2': return 2;
            case 'h3': return 4;
            default: return 0;
        }
    };

    return (
        <Box
            component="nav"
            sx={{
                width: "100%",
                borderRadius: 2,
                p: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Table of Contents
            </Typography>
            <List dense>
                {toc.map(({ id, title, tag }) => (
                    <ListItem key={id} disablePadding sx={{ pl: getIndentation(tag) }}>
                        <ListItemButton
                            component="a"
                            href={`#${id}`}
                            sx={{
                                scrollBehavior: "smooth",
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Typography variant="body2">
                                        - {title}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TableOfContents;
