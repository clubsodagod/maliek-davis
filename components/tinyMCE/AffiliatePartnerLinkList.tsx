"use client";

import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

export interface AffiliatePartner {
    name: string;
    link: string;
    photo: string;
}

interface AffiliatePartnerLinkListProps {
    partners: AffiliatePartner[];
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

const AffiliatePartnerLinkList: React.FC<AffiliatePartnerLinkListProps> = ({ partners }) => {
    const [copiedLink, setCopiedLink] = useState<string | null>(null);

    const handleCopy = async (link: string) => {
        await navigator.clipboard.writeText(link);
        setCopiedLink(link);
        toast.success("Affiliate link copied!");
    };

    useEffect(() => {
        if (!copiedLink) return;
        const timer = setTimeout(() => setCopiedLink(null), 1500);
        return () => clearTimeout(timer);
    }, [copiedLink]);

    return (
        <Box sx={{ width: "100%" }}>
            {partners && partners.length > 0 && (
                <Box
                    sx={{
                        maxHeight: 360,
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        p: 2,
                        width: "100%",
                    }}
                    className="bg-(--foreground) shadow-md shadow-gray-500/80"
                >
                    {partners.map((partner, index) => {
                        const isWobble = copiedLink === partner.link;

                        return (
                            <MotionBox
                                key={partner.link}
                                onClick={() => handleCopy(partner.link)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                {...(isWobble ? wobbleAnimation : {})}
                                sx={{
                                    cursor: "pointer",
                                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                                    p: 2,
                                    borderRadius: 1,
                                    mb: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar src={partner.photo} alt={partner.name} sx={{ width: 32, height: 32, objectFit:"cover" }} />
                                    <Typography variant="body2" fontWeight={500} fontSize="0.8rem">
                                        {partner.name}
                                    </Typography>
                                </Box>

                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleCopy(partner.link); }}>
                                    <ContentCopyRoundedIcon fontSize="small" />
                                </IconButton>
                            </MotionBox>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
};

export default AffiliatePartnerLinkList;
