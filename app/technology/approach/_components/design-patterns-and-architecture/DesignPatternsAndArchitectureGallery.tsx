"use client";

import * as React from "react";
import Image from "next/image";
import {
    AppBar,
    Box,
    Button,
    Dialog,
    IconButton,
    Slide,
    Toolbar,
    Typography,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { designPatterns } from "../_library/copy.const";
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DesignPatternsAndArchitectureGallery = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedPattern, setSelectedPattern] = React.useState<null | {
        title: string;
        description: string;
        photo: string;
    }>(null);

    const handleOpen = (pattern: typeof selectedPattern) => {
        setSelectedPattern(pattern);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPattern(null);
    };

    return (
        <>
            <div className="w-full px-4 py-10">
                <div className="flex flex-col gap-6">
                    {/* Row 1: Two columns with two images each */}
                    <div className="flex w-full gap-6">
                        <div className="flex flex-col w-1/2 gap-6">
                            <ImageCard pattern={designPatterns[0]} className="h-[100px]" onClick={handleOpen} />
                            <ImageCard pattern={designPatterns[1]} className="h-[200px]" onClick={handleOpen} />
                        </div>
                        <div className="flex flex-col w-1/2 gap-6">
                            <ImageCard pattern={designPatterns[2]} className="h-[200px]" onClick={handleOpen} />
                            <ImageCard pattern={designPatterns[3]} className="h-[100px]" onClick={handleOpen} />
                        </div>
                    </div>

                    {/* Row 2: One wide image */}
                    <div className="w-full">
                        <ImageCard pattern={designPatterns[4]} className="h-[100px] w-full" onClick={handleOpen} />
                    </div>
                </div>
            </div>

            {/* Dialog Modal */}
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: "relative", bgcolor: "#111" }}>
                    <Toolbar>
                        <Typography color="secondary.light" sx={{ ml: 2, flex: 1 }} variant="h6">
                            {selectedPattern?.title}
                        </Typography>
                        <Button autoFocus color="primary" onClick={handleClose}>
                            Close
                        </Button>
                        <IconButton edge="start" color="primary" onClick={handleClose} aria-label="close">
                            <CloseFullscreenRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {selectedPattern && (
                    <Box className="flex flex-col items-center justify-center h-full text-white bg-[#121212] p-6">
                        <Image
                            src={selectedPattern.photo}
                            alt={selectedPattern.title}
                            width={800}
                            height={500}
                            className="object-contain rounded-xl shadow-xl mb-6"
                        />
                        <Typography variant="h4" className="text-center mb-2 font-bold">
                            {selectedPattern.title}
                        </Typography>
                        <Typography variant="body1" className="text-center max-w-2xl">
                            {selectedPattern.description}
                        </Typography>
                    </Box>
                )}
            </Dialog>
        </>
    );
};

export default DesignPatternsAndArchitectureGallery;

type ImageCardProps = {
    pattern: {
        title: string;
        description: string;
        photo: string;
    };
    className?: string;
    onClick: (pattern: ImageCardProps["pattern"]) => void;
};

const ImageCard = ({ pattern, className = "", onClick }: ImageCardProps) => {
    return (
        <div
            className={`relative w-full rounded-4xl bg-[#232323] overflow-hidden cursor-pointer group ${className}`}
            onClick={() => onClick(pattern)}
            style={{
                boxShadow: "1px -6px 8px  #17171747"
            }}
        >
            <Image
                src={pattern.photo}
                alt={pattern.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-center px-4">
                <div>
                    <h3 className="text-lg font-bold">{pattern.title}</h3>
                    <p className="text-sm">{pattern.description}</p>
                </div>
            </div>
        </div>
    );
};
