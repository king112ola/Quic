import React, { useState, useRef, useEffect } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Container, Grid, InputAdornment, OutlinedInput, Popper, TextField } from '@mui/material';

// assets
import { IconSend, IconArrowRightCircle, IconX, IconMicrophone, IconPlayerStopFilled } from '@tabler/icons-react';
import { shouldForwardProp } from '@mui/system';

// Animation from framer
import { motion } from "framer-motion";

// import dummy for init voice to speech
import Dummy from './SpeechToText/Dummy'

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({

    marginTop: 20,
    paddingLeft: 16,
    paddingRight: 16,

    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('md')]: {
    }


}));

const SendButtonAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

const VoiceButtonAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

// ==============================|| SEARCH INPUT ||============================== //

const InputSection = ({ handleMessageInput }) => {

    // state for tracking the speech to text component
    const [VoiceToSpeechComponent, setVoiceToSpeechComponent] = useState(() => Loading)

    const theme = useTheme();
    const [value, setValue] = useState('');

    const inputRef = useRef(null);

    // Focus the input field when the components mounted 
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    useEffect(() => {
        // @ts-ignore React.lazy's type is wrong
        setVoiceToSpeechComponent(() => React.lazy(() => import('./SpeechToText/index')))
    }, [])

    return (
        <>
            <Box sx={{
                width: { md: '60%' }, // This limits the width to 50% on medium screens and up
                marginX: { md: 'auto' } // 
            }}>

                <OutlineInputStyle
                    onKeyDown={(e) => {
                        if (e.keyCode == 13 && handleMessageInput !== undefined) {
                            setValue("");
                            handleMessageInput(value);
                        }
                    }}
                    fullWidth={true}
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Ask Quic!"
                    startAdornment={
                        <motion.div
                            className="container"
                            initial={{ scale: 0, x: 100 }}
                            animate={{ x: 0, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            whileHover={{ scale: 1, rotate: 180 }}
                            whileTap={{ scale: 1.7, rotate: 720 }}
                        >

                            <InputAdornment position="start">
                                <IconArrowRightCircle stroke={1.5} size="2rem" color={theme.palette.grey[500]} />
                            </InputAdornment>  </motion.div>
                    }
                    endAdornment={
                        <>
                            <React.Suspense fallback={<Loading />}>
                                <VoiceToSpeechComponent setValue={setValue} handle />
                            </React.Suspense>
                            <InputAdornment position="end" onClick={() => {
                                setValue("");
                                handleMessageInput(value);
                            }}>
                                <ButtonBase sx={{ borderRadius: '12px' }}>
                                    <SendButtonAvatarStyle variant="rounded">
                                        {handleMessageInput ? <IconSend stroke={1.5} size="1.3rem" /> : <IconPlayerStopFilled stroke={1.5} size="1.3rem" />}
                                    </SendButtonAvatarStyle>
                                </ButtonBase>
                            </InputAdornment>
                        </>
                    }

                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />

            </Box>

        </>
    );

    function Loading() {
        return <InputAdornment position="end">
            <ButtonBase sx={{ borderRadius: '12px' }}>
                <VoiceButtonAvatarStyle variant="rounded">

                    <IconMicrophone stroke={1.5} size="1.3rem" />

                </VoiceButtonAvatarStyle>
            </ButtonBase>

        </InputAdornment>
    }
};

export default InputSection;
