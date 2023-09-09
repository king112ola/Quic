import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { Avatar, Box, ButtonBase, Card, Container, Grid, InputAdornment, OutlinedInput, Popper, TextField } from '@mui/material';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';


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

import { IconSend, IconArrowRightCircle, IconX, IconMicrophone, IconMicrophoneOff } from '@tabler/icons-react';


const Dictaphone = ({ setValue }) => {

    const [speechStart, setSpeechStart] = React.useState(false)

    const [message, setMessage] = React.useState('no message')
    const commands = [
        {
            command: ['stable diffusion *', 'stable distribution *'],
            callback: (message) => setMessage(`Sending To stable distribution: ${message}`),
        },
        {
            command: 'Samsung *',
            callback: (message) => setMessage(`Today, the weather is ${message}`),
        },
        {
            command: 'Anything *',
            callback: (message) => setMessage(`#1: ${message}`)
        },
        {
            command: ['ppt *', 'check ppt *'],
            callback: (food) => setMessage(`Sending To stable distribution: ${food}`),
            isFuzzyMatch: true
        },

        {
            command: 'clear',
            callback: ({ resetTranscript }) => resetTranscript()
        }
    ]

    const { transcript, browserSupportsSpeechRecognition, listening, resetTranscript, browserSupportsContinuousListening } = useSpeechRecognition({ commands })

    if (!browserSupportsSpeechRecognition) {
        return null
    }


    React.useEffect(() => {
        setValue(transcript)
    }, [transcript])

    return (

        <InputAdornment position="end" onClick={() => {

            if (!speechStart) {
                resetTranscript()
                SpeechRecognition.startListening({ continuous: true })
            }
            else
                SpeechRecognition.stopListening()
            setSpeechStart(!speechStart)


        }
        }>
            <ButtonBase sx={{ borderRadius: '12px' }}>
                <VoiceButtonAvatarStyle variant="rounded">

                    {!speechStart && < IconMicrophone stroke={1.6} size="1.4rem" />
                    }
                    {speechStart && < IconMicrophoneOff stroke={1.5} size="1.3rem" />
                    }
                </VoiceButtonAvatarStyle>
            </ButtonBase>

        </InputAdornment>

    );
};
export default Dictaphone;