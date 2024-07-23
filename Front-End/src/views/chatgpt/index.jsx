import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from '~/ui-component/cards/SubCard';
import MainCard from '~/ui-component/cards/MainCard';
import LinearProgress from '@mui/material/LinearProgress';

import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';

// project imports
import AnimateButton from '~/ui-component/extended/AnimateButton';

// Input Field
import InputSection from './inputField';

// Customized Style
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

// Scrollbar 
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// Import typing effect 
import Typewriter2 from 'typewriter-effect';
import { Typewriter } from 'react-simple-typewriter'

// Import mediaQuery to check if in mobile 
import useMediaQuery from '@mui/material/useMediaQuery';

// Import usehooks
import { useRef, useEffect, useState, useMemo, memo } from "react";
import React from 'react';

// Import Redux 
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { SET_AddMessage } from '~/redux/slices/message-related/messageSlice'

// import animation
import { SelectionIconLoader } from './selectionIocnLoader';

// import the language selection menu
import LanguagesSelection from './languagesSelection'

// import Api
import { aiEngineApiCall } from '~/api';
import ApiCallAndUploadToParseServer from '~/api';

// import photo viewer
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

// import dropdown menu from the related folder 
import { DropdownMenu } from './dropdownMenu';

// import react player to play contents from the video ai
import ReactPlayer from 'react-player'

// import react audio player
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// import pdf reader and pdf plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import PdfViewer from './pdfViewer';

// Create the own card format for Chatgpt
const CardForAiSelection = styled(SubCard, { shouldForwardProp })(({ theme }) => ({
    // position: 'relative',
    // width: 'auto',
    // height: '6.8vh',
    cursor: 'pointer',
    // margin: 'auto',
    marginTop: '1.3%',
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
        marginTop: '4%',
        height: '8vh',

    },


}));

// ==============================|| ChatGptIndex ||============================== //

const ChatGptIndex = () => {

    // Create a scrolling ref for auto scroll to bottom
    const scrollRef = useRef(null);

    // a ref for audio player
    const audioRef = useRef(null);

    // For loading animation while waiting for AI Response 
    const [loadingStage, setLoadingStage] = useState('idle'); // 'idle', 'loading', 'fading'
    const loadingContainerRef = useRef(null);

    // Load message/ Init message from Redux store
    const messages = useSelector((state) => state.messagesFromUserAndServer.messages, shallowEqual)

    // Find the last Id from the message list
    const lastMessageId = useSelector((state) => state.messagesFromUserAndServer.lastMessageId, shallowEqual)

    // Find the last Id from the message list
    const currentAiEngine = useSelector((state) => state.messagesFromUserAndServer.currentAiEngine, shallowEqual)

    // get the translation menu open state and the selection language state
    const translationMenuOpen = useSelector((state) => state.messagesFromUserAndServer.translationMenuOpen, shallowEqual)
    const translationLanguage = useSelector((state) => state.messagesFromUserAndServer.translationLanguage, shallowEqual)

    // init the pdf plugin layout
    // do not remove this defaultLayoutPlugin, it might crash without variable assignment 
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // Create dispatch 
    const dispatch = useDispatch();

    // Create a state for the scrolling true not false
    const [isScrolling, setIsScrolling] = useState(false)

    // function for displaying/hidding the dropdown menu
    const showDropdownMenu = (id) => {
        let dropdownMenu = document.getElementById('dropdown-menu-' + id)

        // css effect to fade-in + slide-up when user click the message box
        // if the user click another message box/ clicking the same message box, show fade-out + slide down effect.
        if (dropdownMenu.style.display === "flex") {

            dropdownMenu.setAttribute('dropdown-menu-closing', "")

            dropdownMenu.addEventListener('animationend', () => {
                dropdownMenu.removeAttribute('dropdown-menu-closing');
                dropdownMenu.style.display = "none";
            }, { once: true }
            )

        }
        else
            dropdownMenu.style.display = "flex"

        // close the rest of the dropdown menu
        for (let i = 1; i <= lastMessageId; i++)
            if (i !== id && document.getElementById('dropdown-menu-' + i) !== null)
                document.getElementById('dropdown-menu-' + i).style.display = "none"


    }

    // Defind contemt type
    const contentType = {
        Chatgpt: 'text',
        DALLE2: 'image',
        DID: 'video',
        SAMSUM: 'text',
        T2SEDEN: 'audio',
        PDFTRANSEDEN: 'pdf',
        RIFFUSION: 'audio',
        STABLEDIFFUSION: 'image',
        OPENJOURNEY: 'image',
        ANYTHING: 'image',
        MUSICFY: 'audio'
    }

    // Defind Ai Engine Name When Output to the user
    const aiEngineNameOutputToScreen = {
        Chatgpt: 'Chatgpt',
        DALLE2: 'DALLE-2',
        DID: 'D-ID',
        SAMSUM: 'Samsum',
        T2SEDEN: 'Eden T2S',
        PDFTRANSEDEN: 'Eden Doc. Trans.',
        RIFFUSION: 'Riffusion',
        STABLEDIFFUSION: 'Stable-Diffusion',
        OPENJOURNEY: 'Openjourney',
        ANYTHING: 'Anything',
        QuicAI: 'Quic',
        MUSICFY: 'Musicfy'
    }

    // Defind the AI Engines that provides dynamic contents 
    const dynamicContentAIEngines = [
        "QuicAI"
    ]

    // Create method that handles the input and dispatch to the reducer
    // desireAiEngine only be used when data-chaining happens, if input is from input filed, desireAiEngine will he undefined
    const handleMessageInput = async (inputFromUser, desireAiEngine, hiddenFromUser, inputType, extraConfigPdfTransLanguage) => {

        setLoadingStage('loading');

        // saving the user sending message into redux, change to the desire ai engine when data chaining happens

        let responseData

        let messageToSave

        dispatch(SET_AddMessage({
            id: lastMessageId + 1,
            messageBody: inputFromUser,
            sender: 'User',
            contentType: inputType ?? 'text',
            currentAiEngine: desireAiEngine ?? currentAiEngine,
            hiddenFromUser: hiddenFromUser ?? false
        }))

        try {

            responseData = await aiEngineApiCall(inputFromUser, desireAiEngine ?? currentAiEngine, inputType == 'pdf' ? extraConfigPdfTransLanguage : null)

             // Set loading to false when the request is complete
            setTimeout(() => {
                setLoadingStage('fading');
                setTimeout(() => {
                    setLoadingStage('idle');
                }, 500); // Duration of the fade out
            }, 300); // Duration of the slide out

            let dynamicSelectedAiEngine

            messageToSave = {
                id: lastMessageId + 2,
                sender: desireAiEngine ?? currentAiEngine,
                prompt: inputFromUser,
                currentAiEngine: desireAiEngine ?? currentAiEngine,
            }

            // according to whether the AI Engines is providing Dynamic Content and provide dispatch actions on top
            if (dynamicContentAIEngines.includes(currentAiEngine) && !desireAiEngine) {
                messageToSave.contentType = responseData.filter((e) => e.contentType)[0].contentType
                dynamicSelectedAiEngine = responseData.filter((e) => e.dynamicSelectedAiEngine)[0].dynamicSelectedAiEngine
                messageToSave.dynamicSelectedAiEngine = dynamicSelectedAiEngine
            }
            else {
                messageToSave.contentType = contentType[desireAiEngine ?? currentAiEngine]
            }

            switch (dynamicSelectedAiEngine ?? (desireAiEngine ?? currentAiEngine)) {
                case 'Chatgpt':
                    // index 2 is the message body in text, 0 and 1 is the location of where the ipfs file stored
                    messageToSave.messageBody = responseData.filter((e) => e.messageBodyInText)[0].messageBodyInText ?? responseData
                    messageToSave.promptOnIpfs = responseData.filter((e) => e.promptOnIpfs)[0].promptOnIpfs
                    messageToSave.ChatgptMessageOnIpfs = responseData.filter((e) => e.ChatgptMessageOnIpfs)[0].ChatgptMessageOnIpfs

                    break;
                case 'DALLE2':
                    // index 0 stored the location of the ipfs image, index 1 store the ipfs prompt
                    messageToSave.messageBody = responseData
                    messageToSave.promptOnIpfs = responseData.filter((e) => e.promptOnIpfs)[0].promptOnIpfs
                    messageToSave.imageUrlOnIpfs = responseData.filter((e) => e.imageUrlOnIpfs)[0].imageUrlOnIpfs

                    break;
                case 'DID':
                    // index 0 stored the location of the ipfs image, index 1 store the ipfs prompt
                    messageToSave.messageBody = responseData[0].videoOnIpfs
                    messageToSave.promptOnIpfs = responseData[1].promptOnIpfs
                    messageToSave.videoOnIpfs = responseData[0].videoOnIpfs

                    break;
                case 'SAMSUM':
                    // index 2 is the message body in text, 0 and 1 is the location of where the ipfs file stored
                    messageToSave.messageBody = responseData[2].messageBodyInText
                    messageToSave.promptOnIpfs = responseData[1].promptOnIpfs
                    messageToSave.SAMSUMMessageOnIpfs = responseData[0].SAMSUMMessageOnIpfs

                    break;
                case 'T2SEDEN':

                    messageToSave.messageBody = responseData[0].audioOnIpfs
                    messageToSave.promptOnIpfs = responseData[1].promptOnIpfs
                    messageToSave.audioOnIpfs = responseData[0].audioOnIpfs

                    break;
                case 'MUSICFY':

                    messageToSave.messageBody = responseData[0].audioOnIpfs
                    messageToSave.promptOnIpfs = responseData[1].promptOnIpfs
                    messageToSave.audioOnIpfs = responseData[0].audioOnIpfs

                    break;
                case 'PDFTRANSEDEN':
                    // index 2 is the message body in text, 0 and 1 is the location of where the ipfs file stored
                    messageToSave.messageBody = responseData[2].messageBodyInBase64
                    messageToSave.promptOnIpfs = responseData[1].promptOnIpfs
                    messageToSave.pdfOnIpfs = responseData[0].pdfOnIpfs

                    break;
                case 'RIFFUSION':

                    messageToSave.messageBody = responseData[0].audioOnIpfs
                    messageToSave.promptOnIpfs = responseData[1].promptOnIpfs
                    messageToSave.audioOnIpfs = responseData[0].audioOnIpfs

                    break;
                case 'STABLEDIFFUSION':

                    messageToSave.messageBody = responseData[0].imageUrlOnIpfs
                    messageToSave.promptOnIpfs = responseData[1].promptOnIpfs
                    messageToSave.imageUrlOnIpfs = responseData[0].imageUrlOnIpfs
                    break;
                case 'OPENJOURNEY':

                    messageToSave.messageBody = responseData[0].imageUrlOnIpfs
                    messageToSave.promptOnIpfs = responseData[1].promptOnIpfs
                    messageToSave.imageUrlOnIpfs = responseData[0].imageUrlOnIpfs

                    break;
                case 'ANYTHING':

                    messageToSave.messageBody = responseData[0].imageUrlOnIpfs
                    messageToSave.promptOnIpfs = responseData[1].promptOnIpfs
                    messageToSave.imageUrlOnIpfs = responseData[0].imageUrlOnIpfs
                    break;

                default:
                    break;
            }

        } catch (error) {

            console.error("Error occurs while handleMessageInput:", error)
            // messageToSave = {
            //     id: lastMessageId + 2,
            //     sender: desireAiEngine ?? currentAiEngine,
            //     contentType: "text",
            //     prompt: inputFromUser,
            //     currentAiEngine: desireAiEngine ?? currentAiEngine,
            //     messageBody: responseData,
            // }

        } finally {

        }

        dispatch(SET_AddMessage(messageToSave))

    }

    // Listen to the message update and see if the page needs to scroll to bottom
    useEffect(() => {

        if (scrollRef.current) {
            scrollRef.current.scrollIntoView();
        }
    }, [messages]);

    // Check the screen size
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <>
            <PhotoProvider>
                <MainCard sx={{ padding: 0, border: "1px solid rgba(255, 0, 0, .5)", height: { xs: '64%', sm: '78%' }, }}
                    title={

                        <Typewriter2
                            showCursor={false}
                            options={{
                                delay: 15,
                                autoStart: true,
                                loop: true,
                            }}
                            onInit={
                                (typewriter) => {
                                    typewriter.typeString('...').pauseFor(2300).deleteAll().typeString('Try out Chatgpt!')
                                        .pauseFor(100)
                                        .deleteChars(8)
                                        .pauseFor(2500)
                                        .typeString('Chatgpt!')
                                        .pauseFor(3300)
                                        .start()
                                }}
                        />
                    }>


                    <SimpleBar onWheel={(e) => setIsScrolling(e.deltaY == -100 ? true : false)}
                        style={{ padding: "0.7%", maxHeight: isSmallScreen ? '36vh' : '55vh' }}>
                        <Grid container spacing={{ xs: 2, md: 2 }}>
                            {messages !== undefined && messages.map((message, index) => {

                                // set the cursor to false when rendered 

                                let sender = message.sender == 'User' ? 'You' : aiEngineNameOutputToScreen[message.currentAiEngine]

                                // blocking the message box if the user is redirecting the message from one Ai to another

                                if (message !== undefined)

                                    return (
                                        <React.Fragment key={message.id} >
                                            <Grid style={{ whiteSpace: "pre-line", cursor: 'pointer', justifyContent: message.contentType == 'pdf' ? "center" : "flex-start" }} item xs={12} onClick={() => { if (message.contentType !== 'pdf') showDropdownMenu(message.id) }} id={"messageID-" + message.id} sx={{ display: message.hiddenFromUser == true ? 'none' : (message.contentType == 'pdf' ? "flex" : 'block') }}>
                                                {
                                                    {
                                                        'text':
                                                            <SubCard >
                                                                <MuiTypography variant={isSmallScreen ? 'h5' : 'h4'} gutterBottom  >
                                                                    <Typewriter
                                                                        cursorStyle='|'
                                                                        cursor={false}
                                                                        words={[sender + ": " + message.messageBody]}
                                                                        loop={1}
                                                                        typeSpeed={23}
                                                                        onType={() => {
                                                                            if (scrollRef.current && !isScrolling)
                                                                                scrollRef.current.scrollIntoView({ behavior: "auto" })
                                                                        }}
                                                                    />

                                                                </MuiTypography>



                                                            </SubCard >
                                                        ,

                                                        'image':
                                                            <SubCard className='blur-load-images'
                                                                // style={{backgroundImage: `url(${message.imageUrlOnIpfs})`}} 
                                                                sx={{ p: 0, width: { xs: '100%', md: '394px' }, height: { xs: '100%', md: '394px' } }}  >
                                                                <PhotoView src={message.imageUrlOnIpfs} key={`${message.id}-${index}`}>

                                                                    <img loading="lazy" onError={(e) => { let url = e.target.src; e.target.src = ""; e.target.src = url }}
                                                                        style={{ maxWidth: isSmallScreen ? '100%' : '350px', maxHeight: isSmallScreen ? '100%' : '350px', borderRadius: '10px' }}
                                                                        src={message.imageUrlOnIpfs}
                                                                    />

                                                                </PhotoView>

                                                                {/* looping throught multiple images */}
                                                                {/* {typeof (message.messageBody) == 'object' && Object.values(message.messageBody)
                                                                    .map((image, index) => {
                                                                        return (image.imageUrlOnIpfs !== undefined &&
                                                                            <PhotoView src={image.imageUrlOnIpfs} key={`${message.id}-${index}`}>
                                                                                <img loading="lazy" onError={(e) => { let url = e.target.src; e.target.src = ""; e.target.src = url }}
                                                                                    style={{ maxWidth: isSmallScreen ? '100%' : '350px', maxHeight: isSmallScreen ? '100%' : '350px', borderRadius: '10px' }}
                                                                                    src={image.imageUrlOnIpfs}
                                                                                />
                                                                            </PhotoView>)
                                                                    })} */}

                                                                {/*                                                             
                                                                // TODO: Allow auto scrollIntoView to be rendered properly
                                                                <Typewriter
                                                                    words={['                                                                                                                            ']}
                                                                    loop={1}
                                                                    typeSpeed={50}
                                                                    onType={() => {
                                                                        if (scrollRef.current && !isScrolling)
                                                                            scrollRef.current.scrollIntoView({ behavior: "auto" })
                                                                    }} /> */}

                                                            </SubCard>
                                                        ,

                                                        'video':
                                                            <SubCard style={{ alignSelf: "center" }} sx={{ p: 0, width: { xs: '100%', md: '340px' }, height: { xs: '100%', md: '390px' }, display: 'flex', flexDirection: 'column' }} contentSX={{ p: 0 }} >
                                                                <MuiTypography variant={isSmallScreen ? 'h5' : 'h4'} pt={2} pl={2}>
                                                                    {sender}:
                                                                </MuiTypography>
                                                                <ReactPlayer
                                                                    style={{ maxHeight: '90%', maxWidth: '100%' }}
                                                                    className='react-player'
                                                                    playing={true}
                                                                    url={message.messageBody}

                                                                />
                                                            </SubCard>
                                                        ,
                                                        'audio':
                                                            <SubCard sx={{ p: 0, }}  >
                                                                <MuiTypography variant={isSmallScreen ? 'h5' : 'h4'} gutterBottom  >
                                                                    {sender}:
                                                                </MuiTypography>
                                                                <AudioPlayer
                                                                    ref={audioRef}
                                                                    autoPlayAfterSrcChange={false}
                                                                    className={"audio-player" + message.id}
                                                                    autoPlay
                                                                    src={message.messageBody}
                                                                    onEnded={() => { audioRef.current.audio.current.autoplay = false }}
                                                                />

                                                            </SubCard>,
                                                        'pdf':

                                                            <SubCard sx={{ p: 0, }} style={{
                                                                width: isSmallScreen ? '100%' : '50%',
                                                                height: '100%',
                                                            }} >
                                                                <MuiTypography variant={isSmallScreen ? 'h5' : 'h4'} gutterBottom  >
                                                                    {sender}:
                                                                </MuiTypography>

                                                                <PdfViewer pdfBase64={message.messageBody} />
                                                            </SubCard>


                                                    }[message.contentType]
                                                }

                                            </Grid>
                                            <Grid item xs={12}
                                                className='dropdown-menu-grid-item'
                                                sx={{ display: message.hiddenFromUser == true ? 'none' : 'block' }}
                                            >
                                                {message.contentType !== 'pdf' && <DropdownMenu itemid={message.id} id={'dropdown-menu-' + message.id} handleMessageInput={handleMessageInput} scrollRef={scrollRef} />}
                                            </Grid>
                                        </React.Fragment>
                                    )

                                else {
                                    console.error("An Input Error Occur.")
                                }
                            }
                            )
                            }

                        </Grid>

                        {/* Reference to the end of the scrolling */}
                        <div ref={scrollRef} />

                    </SimpleBar>

                    {/* Loading spinner */}
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={3} ref={loadingContainerRef} >
                            <Slide in={loadingStage === 'loading' || loadingStage === 'fading'} direction="left" container={loadingContainerRef.current} timeout={{ enter: 500, exit: 200 }} >
                                <Fade in={loadingStage === 'loading'} timeout={{ enter: 200, exit: 500 }}>
                                    <LinearProgress />
                                </Fade>
                            </Slide>
                        </Grid>
                    </Grid>


                </MainCard>
                {/* The button to change Ai engine */}
                {/* <CardForAiSelection > */}
                {/* <MuiTypography variant="h5" gutterBottom>
                    Change Ai.
                </MuiTypography> */}

                <div>
                    {isSmallScreen ?
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>

                            <CardForAiSelection style={{ height: isSmallScreen ? '75px' : '70px', maxWidth: isSmallScreen ? '100%' : '31%' }} className='selectionContainer' contentSX={{ p: 0.9 }}>
                                <SelectionIconLoader />
                            </CardForAiSelection>

                            {translationMenuOpen && <CardForAiSelection className="languageSelectionContainer" contentSX={{ p: 0 }} style={{ marginTop: isSmallScreen ? "1.6rem" : "1.9rem", padding: 0, height: '100%', }} >
                                <LanguagesSelection handleMessageInput={handleMessageInput} />
                            </CardForAiSelection>}
                        </div>
                        :
                        <AnimateButton>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>

                                <CardForAiSelection style={{ height: isSmallScreen ? '75px' : '70px', maxWidth: isSmallScreen ? '100%' : '31%' }} className='selectionContainer' contentSX={{ p: 0.9 }}>
                                    <SelectionIconLoader />
                                </CardForAiSelection>

                                {translationMenuOpen && <CardForAiSelection className="languageSelectionContainer" contentSX={{ p: 0 }} style={{ marginTop: isSmallScreen ? "1.6rem" : "1.9rem", padding: 0, height: '100%', }} >
                                    <LanguagesSelection handleMessageInput={handleMessageInput} />
                                </CardForAiSelection>}
                            </div>
                        </AnimateButton>
                    }

                </div>
                {/* </CardForAiSelection> */}
                <InputSection handleMessageInput={handleMessageInput} />
            </PhotoProvider >
            <ApiCallAndUploadToParseServer />
        </>
    )
};

export default memo(ChatGptIndex);
