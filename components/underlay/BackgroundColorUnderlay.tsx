"use client"

import { Box } from '@mui/material';
import React from 'react'


const BackgroundColorUnderlay:React.FC<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bgcolor:any;
}> = ({
    bgcolor
}) => {

    return (

                <Box className="h-full w-screen absolute left-0 top-0" sx={{
                    bgcolor: bgcolor
                }}></Box>
    )
}



export default BackgroundColorUnderlay;