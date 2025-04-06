
"use client";

import * as React from "react";
import {
    AppBar,
    Box,
    Button,
    Dialog,
    IconButton,
    Slide,
    Toolbar,
    Typography
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import Image from "next/image";
import { ProjectSelectionCriteria } from "@/app/technology/approach/_components/_library/copy.const";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type ResponsiveDialogProps = {
    open: boolean;
    title?: string;
    content: DialogContentType;
    onClose: () => void;
};

const ResponsiveDialog = ({ open, title, content, onClose }: ResponsiveDialogProps) => {
    const renderContent = () => {
        if (typeof content === "string") {
            return (
                <Typography variant="body1" className="text-center max-w-2xl">
                    {content}
                </Typography>
            );
        }

        if (Array.isArray(content) && typeof content[0] === "string") {
            return (
                <Box className="space-y-4 max-w-2xl">
                    {(content as string[]).map((point, idx) => (
                        <Typography key={idx} variant="body1" className="text-left">
                            🔹 {point}
                        </Typography>
                    ))}
                </Box>
            );
        }

        if (Array.isArray(content) && typeof content[0] === "object") {
            return (
                <Box className="w-full overflow-y-scroll snap-y snap-mandatory">
                    {(content as { photo: string; label: string; info: string }[]).map((item, idx) => (

                        <div
                            key={`${idx} ${item.label}`}
                            className="snap-start min-h-full w-full flex items-center justify-center "
                        >
                            <Box key={idx} className="min-h-full max-h-full w-full flex flex-col items-center justify-center gap-6 px-6 text-center">
                                <div className="relative w-[300px]   rounded-4xl overflow-hidden">
                                    <Image
                                        src={item.photo}
                                        alt={item.label}
                                        sizes="100vw" width={9} height={16}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <Typography variant="h6" className="font-semibold mb-2">{item.label}</Typography>
                                <Typography variant="body2" color="secondary.light">
                                    {item.info}
                                </Typography>
                            </Box>
                        </div>

                    ))}
                </Box>
            );
        }

        return null;
    };

    return (
        <Dialog  fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar sx={{  bgcolor: "#111", padding:0, margin:0 }}>
                <Toolbar>
                    <Typography color="primary" sx={{ ml: 2, flex: 1 }} variant="h6">
                        {title}
                    </Typography>
                    <Button autoFocus color="primary" onClick={onClose}>
                        Close
                    </Button>
                    <IconButton edge="end" color="primary" onClick={onClose} aria-label="close">
                        <CloseFullscreenRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box className="flex flex-col items-center justify-center max-h-full  bg-[#121212] text-white  ">
                {renderContent()}
            </Box>
        </Dialog>
    );
};

export default ResponsiveDialog;





export type DialogContentType =
    | string
    | string[]
    | {
        photo: string;
        label: string;
        info: string;

    }[]
    | ProjectSelectionCriteria[];
