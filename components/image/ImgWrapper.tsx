import React from 'react'

interface ImgWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const ImgWrapper:React.FC<ImgWrapperProps> = ({
    children,
    ...props
}) => {
    return (
        <div
        {...props}
        >
            {children}
        </div>
    )
}

export default ImgWrapper