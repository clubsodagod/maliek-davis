"use client"

import { MotionDiv } from '@/components/motion/MotionDiv'
import { IBlogPostClient } from '@/library/types/blog.types'
import { Box, Grid2, Skeleton } from '@mui/material'
import React, { FC } from 'react'
import IdentifierChip from './IdentifierChip'
import { IBlogPost } from '@/database/models/blog-posts.model'

const IdentifiersRow: FC<{
    category: IBlogPost["category"] | undefined;
    subcategories: IBlogPostClient["meta"]["keywords"] | undefined;
}> = ({
    category, subcategories
}) => {


        return (
            <MotionDiv>
                <Grid2
                    container
                    spacing={1}
                >

                    {
                        category ?
                            <Grid2
                                size="auto"
                            >
                                <IdentifierChip
                                    category={category}
                                    payload={undefined}
                                />
                            </Grid2> :
                            <Box
                                sx={{
                                    borderRadius: "25px",
                                    width: "75px"
                                }}
                                className={`p-1`}
                            >
                                <Skeleton variant='text' animation="wave" />
                            </Box>
                    }
                    {
                        subcategories &&
                        <>
                            {
                                subcategories.map((kw, i) => (
                                    <Grid2
                                    key={`${kw} ${i}`}
                                        size="auto"
                                    >
                                        <IdentifierChip
                                            payload={kw}
                                            category={undefined}
                                        />
                                    </Grid2>
                                ))
                            }



                        </>
                    }
                </Grid2>
            </MotionDiv>
        )
    }

export default IdentifiersRow