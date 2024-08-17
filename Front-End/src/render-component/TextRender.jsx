import { useMemo } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const RenderTypewriterText = ({ message, sender, onLoopDone, onType }) => {
    return useMemo(() => (
        <Typewriter
            cursorStyle='|'
            cursor={false}
            words={[`${sender + ":"} ${message}`]}
            loop={1}
            typeSpeed={0.00001}
            // old regular speed
            // typeSpeed={23}
            onType={onType}
            onLoopDone={onLoopDone}
        />
    ), [message, sender, onType]);
};

export default RenderTypewriterText;
