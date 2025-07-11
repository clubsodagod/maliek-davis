"use client";

import ComponentTransition from "@/components/layout/ComponentTransition";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { IAnnouncement } from "@/database/models/announcement.model";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react"
import { pulse, pulseAlt } from "./SellYourHomeFastSection";
import SubscriberCTAForm from "@/components/contact-forms/SubscriberCTAForm";
import Link from "next/link";



const AnnouncementCard: React.FC<{
    announcement: IAnnouncement;
    open: boolean;
    index: number;
}> = ({ announcement, open }) => {
    const [subscribe, setSubscribe] = React.useState(false);
    return (
        <ComponentTransition id={`${announcement.title}-transition-card`}>
            <MotionDiv
                className="announcement-card overflow-hidden  rounded-t-4xl md:rounded-4xl p-4 md:bg-(--foreground) md:text-(--background)"
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
                    {announcement.title}
                </Typography>

                {/* Expanded Content */}
                {open && (
                    <MotionDiv
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}

                        className=" md:flex gap-6 md:flex-col"
                    >
                        {/* Image */}
                        <MotionDiv className="flex justify-center my-1">
                            <Image
                                alt={`${announcement.title} featured photo for announcement.`}
                                src={announcement.image || ""}
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
                            className="flex flex-col justify-start md:text-left my-4 px-6"
                        >
                            {/* Description */}
                            <Typography variant="body1" className='line-clamp-4 '
                            >{announcement.description}</Typography>

                            {/* Buttons */}
                            <MotionDiv
                                className="flex gap-3 justify-center mt-4 "
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <Link href={`/announcements/${announcement.slug}` || "#"}>
                                    <motion.div {...pulse}>
                                        <Button variant="contained">More</Button>
                                    </motion.div>
                                </Link>
                                <motion.div {...pulseAlt}>
                                    <Button variant="outlined" onClick={() => setSubscribe(!subscribe)}>Subscribe</Button>
                                </motion.div>


                            </MotionDiv>
                        </div>

                    </MotionDiv>
                )}
            </MotionDiv>

            <SubscriberCTAForm
                open={subscribe}
                setOpen={setSubscribe}
            />
        </ComponentTransition>
    );
};

export default AnnouncementCard;
