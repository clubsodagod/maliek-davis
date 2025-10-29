
import React from "react";
import { motion } from "framer-motion";


export const FadeIn: React.FC<React.PropsWithChildren<{ delay?: number }>> = ({ children, delay = 0 }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 12 }
        } animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay }}>
            {children}
        </motion.div>
    )
};