"use client"
import { Skeleton, Typography } from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react'
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';
import ComponentTransition from '@/components/layout/ComponentTransition';
import { IBlogPost } from '@/database/models/blog-posts.model';
import { brandLogo} from '@/library/brand.const';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

const CreatorsRow: FC<{
    author: IBlogPost["author"] | undefined;
}> = ({ author }) => {



    return (
        <ComponentTransition
            id={"creator identification component"}
        >
            <div
                className='relative w-full max-w-[500px] h-fit flex gap-3 items-center'
            >
                {/* first column */}
                <ComponentTransition
                    
                >
                    <div
                        className='w-full h-fit flex gap-3 justify-center items-center'
                    >
                        <div className='p-2 bg-(--foreground) rounded-full border border-(--border) shadow-md flex justify-center items-center'>
                            {
                                author ?
                                    <Image
                                        alt={`${author.firstName}` || ""}
                                        src={author.avatar||brandLogo}
                                        sizes='100vw'
                                        width={16}
                                        height={9}
                                        style={{
                                            width: "75px",
                                            height: "75px",
                                            objectFit: "contain",
                                            borderRadius: "100%"
                                        }}
                                        priority
                                    /> :
                                    <Skeleton
                                        variant='circular'
                                        width={75}
                                        height={75}
                                        animation="pulse"
                                    />
                            }
                        </div>
                        
                        {
                            author ?
                            <div
                            className='flex flex-col'
                        >
                            <Typography variant='subtitle1'
                            >
                                <span className='font-bold'>Author</span> {author.firstName} {author.lastName}
                            </Typography>

                            <Typography variant='caption'>
                                <span className='font-bold'>Member Since</span> {dayjs(author.createdAt).fromNow()}
                            </Typography>
                        </div> :
                        <div
                        className='w-full flex flex-col gap-1'
                        >
                            {
                                [0,1,2].map((s)=>(
                                    <Skeleton variant='text' animation="wave" key={`skeleton_key:${s}`}/>
                                ))
                            }
                        </div>
                        }
                        


                    </div>
                </ComponentTransition>



            </div>
        </ComponentTransition>
    )
}

export default CreatorsRow