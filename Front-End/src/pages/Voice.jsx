import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
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

  


    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={()=>SpeechRecognition.startListening({ continuous: true })}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );
};
export default Dictaphone;