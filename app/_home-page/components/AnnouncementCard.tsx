"use client";

import ComponentTransition from "@/components/layout/ComponentTransition";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Announcement {
    name: string;
    ftImg: string;
    description: string;
    path: string;
}

const AnnouncementCard: React.FC<{
    announcement: Announcement;
    open: boolean;
    index: number;
}> = ({ announcement, open }) => {
    return (
        <ComponentTransition id={`${announcement.name}-transition-card`}>
            <MotionDiv
                className="announcement-card overflow-hidden  rounded-t-4xl p-4"
                initial={{ opacity: 1, y: 0 }} // Starts slightly above
                animate={{ opacity: open ? 1 : 1, y: open ? 20 : 20, scaleX: open ? 1.05 : 1 }} // Moves down when open
                exit={{ opacity: 0, y: 0 }} // Moves up when closing
                transition={{ duration: 0.3, ease: "anticipate" }}
                style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: "1px -6px 8px  #17171747",
                }}
            >
                {/* Title */}
                <Typography variant="subtitle1" fontWeight={"bold"}>
                    {announcement.name}
                </Typography>

                {/* Expanded Content */}
                {open && (
                    <MotionDiv
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}

                        className=" md:flex gap-6 "
                    >
                        {/* Image */}
                        <MotionDiv className="flex justify-center my-4">
                            <Image
                                alt={`${announcement.name} featured photo for announcement.`}
                                src={announcement.ftImg}
                                sizes="100vw"
                                width={9}
                                height={16}
                                style={{
                                    width: "30vh",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "25%",
                                }}
                            />
                        </MotionDiv>


                        <div
                            className="flex flex-col justify-start md:text-left my-4"
                        >
                            {/* Description */}
                            <Typography variant="body1"
                            >{announcement.description}</Typography>

                            {/* Buttons */}
                            <MotionDiv
                                className="flex gap-3 justify-center mt-4 md:justify-start"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <Button variant="contained">More</Button>
                                <Button variant="outlined">Subscribe</Button>
                            </MotionDiv>
                        </div>

                    </MotionDiv>
                )}
            </MotionDiv>
        </ComponentTransition>
    );
};

export default AnnouncementCard;
