/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import parameterize from 'parameterize';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const TableOfContents: React.FC<{ payload: any }> = ({ payload }) => {
    const toc: { id: string; title: any; }[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const content = unified()
        .use(rehypeParse, {
            fragment: true,
        })
        .use(() => {
            return (tree) => {
                visit(tree, 'element', function (node: any) {
                    if (node.tagName === 'h3') {
                        const id = parameterize(node.children[0].value);
                        node.properties.id = id;

                        toc.push({
                            id,
                            title: node.children[0].value,
                        });

                        console.log('node', node)
                    }
                });
                return;
            };
        })
        .use(() => {
            return (tree) => {
                console.log('tree', tree);
            }
        })
        .use(rehypeStringify)
        .processSync(payload)
        .toString();

    return (
        <Box
            component="nav"
            sx={{
                width: "100%",
                maxWidth: 360,
                borderRadius: 2,
                p: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Table of Contents
            </Typography>
            <List dense>
                {toc.map(({ id, title }) => (
                    <ListItem key={id} disablePadding>
                        <ListItemButton
                            component="a"
                            href={`#${id}`}
                            sx={{
                                scrollBehavior: "smooth",
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Typography variant="body2" color="text.primary">
                                        {title}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}



export default TableOfContents;