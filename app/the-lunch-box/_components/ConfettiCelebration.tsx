

import React, {  } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

/**
 * ConfettiCelebration — isolated, controlled confetti animation.
 * Automatically stops after a few seconds for performance.
 */
const ConfettiCelebration: React.FC = () => {
    const { width, height } = useWindowSize();


    return (
        <Confetti
            width={width}
            height={height}
            numberOfPieces={250}
            gravity={0.2}
            recycle={false}
            tweenDuration={5000}
        />
    );
};

export default ConfettiCelebration;
