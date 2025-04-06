import React from 'react'
import { MotionDiv } from './MotionDiv'
import { TextField } from '@mui/material'
import type { HTMLMotionProps } from 'framer-motion'

type MotionDivProps = HTMLMotionProps<"div">;

const MotionTextField = (props:MotionDivProps) => {

    return (
        <MotionDiv {...props}>
            <TextField />
        </MotionDiv>
    )
}

export default MotionTextField