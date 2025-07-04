
export const apiUrl:string = "https://dedicated-server-0wnc.onrender.com/api"



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