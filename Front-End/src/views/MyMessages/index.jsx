import { Container, Grid, Link, Card, Button } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import AnimateButton from '~/ui-component/extended/AnimateButton';

// project imports
import SubCard from '~/ui-component/cards/SubCard';
import MainCard from '~/ui-component/cards/MainCard';
import SecondaryAction from '~/ui-component/cards/CardSecondaryAction';

// Customized Style
import { styled, useTheme } from '@mui/material/styles';
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
import { useRef, useEffect, useState, useMemo } from "react";
import { unmountComponentAtNode, render } from "react-dom";

// Import Redux 
import { useDispatch, useSelector } from 'react-redux';
import { SET_AddMessageRecords } from '~/redux/slices/message-related/messageSlice'

// import Moralis 
import { useMoralis } from 'react-moralis';

// import animation
import { SelectionIconLoader } from './selectionIocnLoader';

// import Api
import aiEngineApiCall from '~/api';

// import photo viewer
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

// import react player to play contents from the video ai
import ReactPlayer from 'react-player'

// import react audio player
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// import pdf reader and pdf plugin
import { Viewer } from '@react-pdf-viewer/core'; // install this library
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import PdfViewer from './pdfViewer';

import { IconTrash } from '@tabler/icons-react';

// Defind the AI Engines that provides dynamic contents 
const dynamicContentAIEngines = [
    "QuicAI"
]

// Defind Ai Engine Name When Output to the user
const aiEngineNameOutputToScreen = {
    Chatgpt: 'Chatgpt',
    DALLE2: 'DALLE-2',
    DID: 'D-ID',
    SAMSUM: 'Samsum',
    T2SEDEN: 'Eden T2S',
    PDFTRANSEDEN: 'Eden Doc. Trans.',
    RIFFUSION: 'Riffusion',
    QuicAI: 'Quic'
}

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

    }

}));



// ==============================|| ChatGptIndex ||============================== //

const ChatGptIndex = () => {

    // Create a scrolling ref for auto scroll to bottom
    const scrollRef = useRef(null);

    // Load message/ Init message from Redux store
    const messageRecords = useSelector((state) => state.messagesFromUserAndServer.messageRecords)

    // Find the last Id from the message list
    const lastChunkOfMessageRecord = useSelector((state) => state.messagesFromUserAndServer.lastChunkOfMessageRecord)

    // Find the last Id from the message list
    const filterAiEngineForRecord = useSelector((state) => state.messagesFromUserAndServer.filterAiEngineForRecord)

    // Create dispatch 
    const dispatch = useDispatch();

    // Create a state for the scrolling true not false
    const [isScrolling, setIsScrolling] = useState(false)

    // Create a state to check if the Ai Respond is loading 
    const [loading, setLoading] = useState(false);

    //use moralis for testing and init the state for wagmi to interact with smart contract
    const { Moralis, user } = useMoralis();

    // function to fetch message record from moralis prase server
    const fetchMessageRecord = async function () {

        if (!user) return false

        let query = new Moralis.Query("MessagesOnIPFS")

        query.equalTo("UserID", user.id);

        query.find().then(response => {

            handleMessageRecordFromParseServer(response)

        })

    }

    // handle message deletion on the parse server
    const handleMessageDelete = async (messageID) => {

        // remove the message from the user screen 
        let deleteElement = document.getElementById('messageID-' + messageID)

        deleteElement.parentNode.removeChild(deleteElement)

        const MessagesOnIPFS = Moralis.Object.extend("MessagesOnIPFS");

        const query = new Moralis.Query("MessagesOnIPFS");

        query.equalTo('objectId', messageID)

        const removingObject = await query.first()

        if (removingObject) {

            removingObject.destroy({ useMasterKey: true }).then(() => {

            }, (error) => {

            })
        }

    }

    // fucntion to handle message record after fectched from the moralis parese database
    const handleMessageRecordFromParseServer = async (records) => {

        let messageRecordsTobeShown = []

        let dynamicSelectedAiEngine

        let messageToSave

        let shrinkedRecords = records.map(record => {

            let attributes = record.attributes

            let messageRecordObject = {
                id: record.id,
                oldID: attributes.Message_ID,
                sender: attributes.Message_Sender,
                contentType: attributes.Content_Type,
                Message_AiEngine: attributes.Message_AiEngine,
            }

            // according to whether the AI Engines is providing Dynamic Content and provide dispatch ations on top
            if (dynamicContentAIEngines.includes(attributes.Message_Sender)) {
                dynamicSelectedAiEngine = attributes.dynamicSelectedAiEngine
            }


            switch (dynamicSelectedAiEngine ?? attributes.Message_Sender) {
                case 'User':
                    messageRecordObject.messageBody = attributes.Message
                    break;
                case 'Chatgpt':
                    messageRecordObject.messageBody = attributes.Message
                    break;
                case 'SAMSUM':
                    messageRecordObject.messageBody = attributes.Message
                    break;
                case 'DALLE2':
                    messageRecordObject.messageBody = [{ imageUrlOnIpfs: attributes.Message }]
                    messageRecordObject.imageUrlOnIpfs = attributes.Message
                    break;
                case 'DID':
                    messageRecordObject.messageBody = attributes.Message
                    break;
                case 'T2SEDEN':
                    messageRecordObject.messageBody = attributes.Message
                    break;
                case 'PDFTRANSEDEN':
                    messageRecordObject.messageBody = attributes.Message
                    break;
                case 'RIFFUSION':
                    messageRecordObject.messageBody = attributes.Message
                    break;

                case 'STABLEDIFFUSION':
                    messageRecordObject.messageBody = attributes.Message
                    messageRecordObject.imageUrlOnIpfs = attributes.Message
                    break;

                case 'OPENJOURNEY':
                    messageRecordObject.messageBody = attributes.Message
                    messageRecordObject.imageUrlOnIpfs = attributes.Message
                    break;

                case 'ANYTHING':
                    messageRecordObject.messageBody = attributes.Message
                    messageRecordObject.imageUrlOnIpfs = attributes.Message
                    break;



                default:
                    break;
            }
            messageRecordsTobeShown.push(messageRecordObject)

        });

        dispatch(SET_AddMessageRecords(messageRecordsTobeShown))

    }
    // 
    useEffect(() => {

        if (user)
            fetchMessageRecord()

    }, [user]);
    // Check the screen size
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const [hideAnimationTag, setHideAnimationTag] = useState(false);

    const icon = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
            opacity: 1,
            pathLength: 1
        }
    };


    return (
        <>
            <PhotoProvider>
                <MainCard sx={{ padding: 0, border: "1px solid rgba(255, 0, 0, .5)", height: { xs: '84%', sm: '88%' }, }}
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
                                    typewriter.typeString('Message Box!')
                                        .pauseFor(2000)
                                        .deleteChars(1)
                                        .pauseFor(1500)
                                        .typeString('.')
                                        .pauseFor(1500)
                                        .typeString('.')
                                        .pauseFor(1500)
                                        .typeString('.')
                                        .pauseFor(100)
                                        .pauseFor(2500)
                                        .deleteAll()
                                        .pauseFor(3300)
                                        .start()
                                }}
                        />
                    }>

                    <SimpleBar onWheel={(e) => setIsScrolling(e.deltaY == -100 ? true : false)}
                        style={{ padding: "0.7%", maxHeight: isSmallScreen ? '53vh' : '65vh' }}>
                        <Grid container spacing={{ xs: 2, md: 4 }}>

                            {messageRecords !== undefined && messageRecords.map((message, index) => {

                                // set the cursor to false when rendered 

                                let sender = message.sender == 'User' ? 'You' : aiEngineNameOutputToScreen[message.Message_AiEngine]

                                // filter the message records
                                if (message !== undefined && message.Message_AiEngine == (filterAiEngineForRecord ?? message.Message_AiEngine))
                                    return (
                                        <Grid style={{ whiteSpace: "pre-line", justifyContent: message.contentType == 'pdf' ? "center" : "center" }} item xs={12} key={message.id} id={"messageID-" + message.id} sx={{ display: message.contentType == 'pdf' ? "flex" : 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>


                                            {
                                                {
                                                    'text':
                                                        <SubCard sx={{ p: 0, width: '100%' }}  >
                                                            <MuiTypography variant={isSmallScreen ? 'h5' : 'h4'} gutterBottom>
                                                                {sender + ": " + message.messageBody}

                                                            </MuiTypography>
                                                        </SubCard >
                                                    ,

                                                    'image':

                                                        <SubCard sx={{ maxWidth: '400px', maxHeight: '400px' }} >

                                                            <PhotoView src={message.imageUrlOnIpfs} key={`${message.id}-${index}`}>
                                                                <img loading="lazy" onError={(e) => { let url = e.target.src; e.target.src = ""; e.target.src = url }}
                                                                    style={{ maxWidth: isSmallScreen ? '100%' : '350px', maxHeight: isSmallScreen ? '100%' : '350px', borderRadius: '10px' }}
                                                                    src={message.imageUrlOnIpfs}
                                                                />
                                                            </PhotoView>

                                                            {/*loop through collection of images  */}
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

                                                        </SubCard>

                                                    ,

                                                    'video':
                                                        <SubCard style={{ alignSelf: "center" }} sx={{ p: 0, width: { xs: '100%', md: '340px' }, height: { xs: '100%', md: '390px' }, display: 'flex', flexDirection: 'column' }} contentSX={{ p: 0 }} >
                                                            <MuiTypography variant={isSmallScreen ? 'h5' : 'h4'} pt={2} pl={2}>
                                                                {sender}:
                                                            </MuiTypography>
                                                            <ReactPlayer
                                                                style={{ maxHeight: '90%', maxWidth: '100%' }}
                                                                stopOnUnmount={false}
                                                                pip={true}
                                                                className='react-player'
                                                                playing={false}
                                                                url={message.messageBody}
                                                            />

                                                        </SubCard>
                                                    ,
                                                    'audio':
                                                        <SubCard sx={{ p: 0, width: '100%' }}  >
                                                            <MuiTypography variant={isSmallScreen ? 'h5' : 'h4'} gutterBottom  >
                                                                {sender}:
                                                            </MuiTypography>
                                                            <AudioPlayer
                                                                // autoPlay
                                                                src={message.messageBody}
                                                            />

                                                        </SubCard>,
                                                    'pdf':

                                                        <SubCard sx={{ p: 0, }} style={{
                                                            // border making the purple disappear
                                                            border: '1px solid rgba(0, 0, 0, 0.3)',
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

                                            {/* session for deleting message record */}
                                            <div style={{ alignSelf: 'center', }} onClick={() => handleMessageDelete(message.id)}>
                                                <AnimateButton >

                                                    <SubCard className="deleteMessageRecordButton" contentSX={{ p: 0 }} sx={{ alignSelf: 'center', p: 1, pb: 0.1, mt: { xs: 2.2, sm: 0 }, ml: { xs: 0, sm: 3 } }}>

                                                        <IconTrash sx={{}}></IconTrash >

                                                    </SubCard>
                                                </AnimateButton>
                                            </div>
                                        </Grid>

                                    )

                                else {
                                    // console.error("An Input Error Occur.")
                                }
                            })}



                        </Grid>

                        {/* Reference to the end of the scrolling */}
                        <div ref={scrollRef} />

                    </SimpleBar>


                </MainCard>
                {/* The button to change Ai engine */}
                {/* <CardForAiSelection > */}
                {/* <MuiTypography variant="h5" gutterBottom>
                    Change Ai.
                </MuiTypography> */}

                <div>
                    <AnimateButton>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <CardForAiSelection style={{ height: isSmallScreen ? '75px' : '70px', maxWidth: isSmallScreen ? '100%' : '31%' }} className='selectionContainer' contentSX={{ p: 0.9 }}>
                                <SelectionIconLoader />
                            </CardForAiSelection>

                        </div>
                    </AnimateButton>
                </div>

                {/* </CardForAiSelection> */}
                {/* <InputSection handleMessageInput={handleMessageInput} /> */}
            </PhotoProvider>
        </>


    )


};

export default ChatGptIndex;
