// import { useMediaQuery } from "@mui/material";

export const apiUrl: string = "https://dedicated-server-0wnc.onrender.com/api"



export const wobbleAnimation = {
    animate: {
        rotate: [0, -1.5, 1.5, -1, 1, 0],
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
    whileHover: {
        rotate: 0,
        transition: { duration: 0.3, ease: "easeOut" },
    },
};



// export const useResponsiveSize = (): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
//     // const mobile = useMediaQuery('(max-width:768px)');
//     // const tablet = useMediaQuery('(min-width:769px)');
//     // const tabletXL = useMediaQuery('(min-width:900px)');
//     // const desktop = useMediaQuery('(min-width:1100px)');

//     // if (desktop) return 'xl';
//     // if (tabletXL) return 'lg';
//     // if (tablet) return 'md';
//     // if (mobile) return 'sm';
//     return 'xs';
// };
