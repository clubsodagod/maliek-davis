
import { MotionDiv } from '@/components/motion/MotionDiv';
import { IBlogPostClient } from '@/library/types/blog.types';
import { Typography, Skeleton } from '@mui/material';
import React, { FC } from 'react'

const PostSummary: FC<{
    title: IBlogPostClient['title'] | undefined,
    description: IBlogPostClient['meta']["description"] | undefined;
}> = ({
    title, description
}) => {
        return (
            <MotionDiv>
                {
                    title && description ?
                        <Typography
                            className=''
                            variant='subtitle1'
                        >
                            <span
                                style={{
                                    fontSize:"1.25rem"
                                }}
                                className='font-bold '
                            >
                                {title}&nbsp;
                            </span>
                            <span
                                style={{
                                    fontSize: "1.25rem"
                                }}
                            >
                                {description}
                            </span>
                        </Typography>

                        :
                        <Skeleton variant='text' animation="wave" />
                }

            </MotionDiv>
        )
    }

export default PostSummary