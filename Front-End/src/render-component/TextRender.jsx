import { useMemo } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const RenderTypewriterText = ({ message, sender, onLoopDone, onType }) => {
    return useMemo(() => (
        <Typewriter
            cursorStyle='|'
            cursor={false}
            words={[`${sender + ":"} ${message}`]}
            loop={1}
            // old regular speed
            // typeSpeed={0.00001}
            typeSpeed={20}
            onType={onType}
            onLoopDone={onLoopDone}
        />
    ), [message, sender, onType]);
};

export default RenderTypewriterText;
