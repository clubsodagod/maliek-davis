"use client";

import React, { useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import slugify from "slugify";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

interface RelatedPost {
    title: string;
    slug: string;
}

interface RelatedPostListProps {
    posts: RelatedPost[];
}

const MotionBox = motion(Box);

const wobbleAnimation = {
    animate: {
        rotate: [0, 5, -5, 5, -5, 0],
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const RelatedPostList: React.FC<RelatedPostListProps> = ({ posts }) => {
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
    const [customTitle, setCustomTitle] = useState("");

    const handleCopy = async (slug: string) => {
        const url = `/blog/posts/${slug}`;
        await navigator.clipboard.writeText(url);
        setCopiedSlug(slug);
        toast.success("Link copied to clipboard!");
    };

    const handleCustomCopy = async () => {
        if (!customTitle.trim()) return;
        const slug = slugify(customTitle, { strict: true, lower: true, trim: true });
        const url = `/blog/posts/${slug}`;
        await navigator.clipboard.writeText(url);
        setCopiedSlug(slug);
        toast.success("Formatted link copied!");
    };

    useEffect(() => {
        if (!copiedSlug) return;
        const timer = setTimeout(() => setCopiedSlug(null), 1500);
        return () => clearTimeout(timer);
    }, [copiedSlug]);

    return (
        <Box sx={{ width: "100%" }}>
            {/* Custom title input section */}
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    mb: 2,
                    width: "100%",
                }}
            >
                <TextField
                    label="Enter post title"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="grow min-w-full"
                />
                <IconButton onClick={handleCustomCopy} size="small" className=" max-w-fit">
                    Copy <ContentCopyRoundedIcon />
                </IconButton>
            </Box>

            {/* Existing post list */}
            <Box
                sx={{
                    maxHeight: 300,
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    p: 2,
                    width: "100%",
                }}
                className="bg-(--foreground) shadow-md shadow-gray-500/80"
            >
                {posts.map((post, index) => {
                    const isWobble = copiedSlug === post.slug;

                    return (
                        <MotionBox
                            key={post.slug}
                            onClick={() => handleCopy(post.slug)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            {...(isWobble ? wobbleAnimation : {})}
                            sx={{
                                cursor: "pointer",
                                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                                p: 2,
                                borderRadius: 1,
                                mb: 1,
                                transition: "background-color 0.3s",
                            }}
                        >
                            <Typography variant="body1" fontWeight={500} fontSize="0.8rem">
                                {post.title}
                            </Typography>
                        </MotionBox>
                    );
                })}
            </Box>
        </Box>
    );
};


export default RelatedPostList;
