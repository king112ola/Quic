// Api endpoints
const apiEndpointOnBackend = import.meta.env.VITE_QUIC_BACKEND_SERVER

// import react moralis for mongo db connection
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis-v1';

// import redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// React Hooks
import { useEffect, useState } from "react";


// error handler
const errorChecking = (response) => {
    if (!response.ok) throw new Error("Failed to generate Ai Response");
}

// blob to base64 convert
function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

// Quic AI api fetch
export const QuicAIApiCall = async (inputFromUser) => {
    try {
        const response = await fetch(apiEndpointOnBackend + '/api/v1/QuicAI', {
            method: 'POST',
            headers: {
                "ngrok-skip-browser-warning": "620",
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prompt: inputFromUser
            })
        })

        // error if the respond is incorrect
        errorChecking(response)

        const data = await response.json()
        return data ?? "Something went wrong, please try again!"
    } catch (error) {
        return "Something went wrong, please try again!"
    }

}

// Chatgpt api fetch
export const ChatgptApiCall = async (inputFromUser) => {
    try {
        const response = await fetch(apiEndpointOnBackend + '/api/v1/Chatgpt', {
            method: 'POST',
            headers: {
                "ngrok-skip-browser-warning": "620",
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prompt: inputFromUser
            })
        })

        // error if the respond is incorrect
        errorChecking(response)

        const data = await response.json()

        return data ?? "This day is really good. isn't it?"
    }
    catch (error) {
        return "Something went wrong, please try again!"
    }
}

// DALLE2 image ai api call
export const DALLE2ApiCall = async (inputFromUser, numberOfImages, imageSize) => {
    try {
        inputFromUser = inputFromUser ?? ''
        numberOfImages = numberOfImages ?? 1
        imageSize = imageSize ?? '1024x1024'

        const response = await fetch(apiEndpointOnBackend + '/api/v1/DALLE2', {
            method: 'POST',
            headers: {
                "ngrok-skip-browser-warning": "69120",
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prompt: inputFromUser,
                numberOfImages: numberOfImages,
                imageSize: imageSize,
            })
        })
   
        // error if the respond is incorrect
        errorChecking(response)
        let imageData = await response.json()
      
        return imageData
    }
 
    catch (error) {
        return "Something went wrong, please try again!"
    }
  
}

// D-ID image ai api call
export const DIDApiCall = async (inputFromUser, numberOfImages, imageSize) => {
    // 

    const response = await fetch(apiEndpointOnBackend + '/api/v1/DID', {
        method: 'POST',
        headers: {
            "ngrok-skip-browser-warning": "69120",
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            prompt: inputFromUser
        })
    })
  
    // error if the respond is incorrect
    errorChecking(response)

    const data = await response.json()

    return data ?? "https://media.vlipsy.com/vlips/hElgqOJl/480p.mp4"
}



// Samsum api fetch
export const SAMSUMApiCall = async (inputFromUser) => {

    const response = await fetch(apiEndpointOnBackend + '/api/v1/SAMSUM', {
        method: 'POST',
        headers: {
            "ngrok-skip-browser-warning": "620",
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            prompt: inputFromUser
        })
    })

    // error if the respond is incorrect
    errorChecking(response)

    const data = await response.json()
    return data ?? "Lets try summarizing one more time!"
}


// Text to Speech Eden api fetch
export const T2SEDENApiCall = async (inputFromUser) => {

    const response = await fetch(apiEndpointOnBackend + '/api/v1/T2SEDEN', {
        method: 'POST',
        headers: {
            "ngrok-skip-browser-warning": "620",
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            prompt: inputFromUser
        })
    })

    // error if the respond is incorrect
    errorChecking(response)

    const data = await response.json()
    return data ?? "Request for one more time!"
}

// Document translate AI Api call
export const PDFTRANSEDENApiCall = async (inputFromUser, translationLanguage) => {

    const response = await fetch(import.meta.env.VITE_QUIC_BACKEND_SERVER + '/api/v1/PDFTRANSEDEN', {
        method: 'POST',
        headers: {
            "ngrok-skip-browser-warning": "620",
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            uploadedPdf: inputFromUser,
            preferredLanguage: translationLanguage
        })
    })
    // error if the respond is incorrect
    errorChecking(response)
    const data = await response.json()
    return data ?? "Request for one more time!"

}

// back end api call for stable diffusion 

const STABLEDIFFUSIONApiCall = async (inputFromUser) => {

    const response = await fetch(apiEndpointOnBackend + '/api/v1/STABLEDIFFUSION', {
        method: 'POST',
        headers: {
            "ngrok-skip-browser-warning": "620",
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            prompt: inputFromUser
        })
    })

    // error if the respond is incorrect
    errorChecking(response)

    const data = await response.json()
    return data ?? "Lets try summarizing one more time!"

}

// back end api call for openjourney 
const OPENJOURNEYApiCall = async (inputFromUser) => {
    const response = await fetch(apiEndpointOnBackend + '/api/v1/OPENJOURNEY', {
        method: 'POST',
        headers: {
            "ngrok-skip-browser-warning": "620",
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            prompt: inputFromUser
        })
    })

    // error if the respond is incorrect
    errorChecking(response)

    const data = await response.json()
    return data ?? "Lets try summarizing one more time!"
}

// back end api call for anything ai
const ANYTHINGApiCall = async (inputFromUser) => {
    const response = await fetch(apiEndpointOnBackend + '/api/v1/ANYTHING', {
        method: 'POST',
        headers: {
            "ngrok-skip-browser-warning": "620",
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            prompt: inputFromUser
        })
    })

    // error if the respond is incorrect
    errorChecking(response)

    const data = await response.json()
    return data ?? "Lets try summarizing one more time!"
}

// api request for Riffusion, text to music
export const RIFFUSIONApiCall = async (inputFromUser) => {

    let startPrompt = ""

    let endPrompt = ""

    if (inputFromUser.includes('start') && inputFromUser.includes('end')) {
        startPrompt = inputFromUser.split(/start\:/)[1].split(/end\:/)[0]

        endPrompt = inputFromUser.split(/end\:/)[1]
    } else {
        startPrompt = inputFromUser
    }


    const response = await fetch(import.meta.env.VITE_QUIC_BACKEND_SERVER + '/api/v1/RIFFUSION', {
        method: 'POST',
        headers: {
            "ngrok-skip-browser-warning": "620",
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            start: startPrompt.replace(/(\r\n|\n|\r)/gm, ""),
            end: endPrompt.replace(/(\r\n|\n|\r)/gm, "")
        })
    })
    // error if the respond is incorrect
    errorChecking(response)
    const data = await response.json()
    return data ?? "Request for one more time!"


}



const apiCallIndex = () => {



    // Load message/ Init message from Redux store
    const messages = useSelector((state) => state.messagesFromUserAndServer.messages, shallowEqual)

    // Find the last Id from the message list
    const lastMessageId = useSelector((state) => state.messagesFromUserAndServer.lastMessageId, shallowEqual)

    // Find the message record and use to compare 
    const messageRecords = useSelector((state) => state.messagesFromUserAndServer.messageRecords, shallowEqual)

    // get the selection language state after the user has selected which language to translate
    // const translationLanguage = useSelector((state) => state.messagesFromUserAndServer.translationLanguage, shallowEqual)



    const [isAuthenticating, setIsAuthenticating] = useState(false);

    // init moralis
    const { Moralis, user, enableWeb3, authenticate } = useMoralis();

    /**
    * 1) Connect to a Evm
    * 2) Request message to sign using the Moralis Auth Api of moralis (handled on server)
    * 3) Login via parse using the signed message (verification handled on server via Moralis Auth Api)
    */
    // const handleAuth = async (provider, isItLoading) => { // Provider is now using metamask

    //     if (isItLoading) return
    //     try {
    //         setIsAuthenticating(true);

    //         // Enable web3 to get user address and chain
    //         await enableWeb3({ throwOnError: true, provider });
    //         const { account, chainId } = Moralis;

    //         if (!account) {
    //             throw new Error('Connecting to chain failed, as no connected account was found');
    //         }
    //         if (!chainId) {
    //             throw new Error('Connecting to chain failed, as no connected chain was found');
    //         }

    //         // Get message to sign from the auth api
    //         const { message } = await Moralis.Cloud.run('requestMessage', {
    //             address: account,
    //             chain: parseInt(chainId, 16),
    //             networkType: 'evm',
    //         });

    //         // Authenticate and login via parse
    //         await authenticate({
    //             signingMessage: message,
    //             throwOnError: true,
    //         });
    //     } catch (error) {
    //         
    //     } finally {
    //         setIsAuthenticating(false);
    //     }
    // };
    /**
     * End Of creating this moralis server function handler
     */


    // function that adds the new comming ipfs hashed message link to the mongo db, with moralis parse server
    async function addMessageToDatabase(sentFromAi, userID, aiEngineUsing, newContentType, newMessageID, newSender, newMessage, newMessageOnIpfs, newPromptOnIpfs, newPrompt,dynamicSelectedAiEngine) {

        const MessagesOnIPFS = Moralis.Object.extend("MessagesOnIPFS");
        const query = new Moralis.Query("MessagesOnIPFS");

        const messageCreator = new MessagesOnIPFS();

        if (sentFromAi) {

            messageCreator.set('Prompt', newPrompt)
            messageCreator.set('MessageOnIpfs', newMessageOnIpfs)
            messageCreator.set('PromptOnIpfs', newPromptOnIpfs)

        }


        messageCreator.set('UserID', userID)

        messageCreator.set('Message', newMessage)

        messageCreator.set('Message_ID', newMessageID)

        messageCreator.set('Content_Type', newContentType)

        messageCreator.set('Message_Sender', newSender)

        messageCreator.set('Message_AiEngine', aiEngineUsing)

        messageCreator.set('dynamicSelectedAiEngine', dynamicSelectedAiEngine)

        await messageCreator.save();

    }



    // triggered when every time a new message arrives
    useEffect(() => {

        // very important, use this checking to see if the user is comming back to the chatgpt pgae. and if the old record is same as the current message, do not upload to database
 
        let pass = true
        if (messages !== undefined && messageRecords !== undefined) {
   
            pass = !(messages[messages.length - 1]?.id == messageRecords[messageRecords.length - 1]?.oldID)
        }

        if (user && pass) {

            let lastMessage = messages[lastMessageId - 1]

            // block the process if the message does not exist
            if (!lastMessage) return

            // handle user input and save as new message
            if (lastMessage.sender == 'User') {
                addMessageToDatabase(false, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.messageBody)
            }
            else {

                // Determin the uploading content arguments dynamically
                const dynamicDecideAddMessageToDatabase = {
                    'text': ()=>addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.messageBody, lastMessage.ChatgptMessageOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt,lastMessage.dynamicSelectedAiEngine),
                    'image': ()=>addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.imageUrlOnIpfs, lastMessage.imageUrlOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt,lastMessage.dynamicSelectedAiEngine),
                    'audio':()=>addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.messageBody, lastMessage.audioOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                }

                switch (lastMessage.sender) {
                    case 'Chatgpt':
                        addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.messageBody, lastMessage.ChatgptMessageOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                        break;
                    case 'DALLE2':
                        addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.imageUrlOnIpfs, lastMessage.imageUrlOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                        break;
                    case 'DID':
                        addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.videoOnIpfs, lastMessage.videoOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                        break;
                    case 'SAMSUM':
                        addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.messageBody, lastMessage.SAMSUMMessageOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                        break;
                    case 'T2SEDEN':
                        addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.messageBody, lastMessage.audioOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                        break;
                    case 'PDFTRANSEDEN':
                        addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.messageBody, lastMessage.pdfOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                        break;
                    case 'RIFFUSION':
                        addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.messageBody, lastMessage.audioOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                        break;
                    case 'STABLEDIFFUSION':
                        addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.imageUrlOnIpfs, lastMessage.imageUrlOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                        break;
                    case 'OPENJOURNEY':
                        addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.imageUrlOnIpfs, lastMessage.imageUrlOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                        break;
                    case 'ANYTHING':
                        addMessageToDatabase(true, user.id, lastMessage.currentAiEngine, lastMessage.contentType, lastMessage.id, lastMessage.sender, lastMessage.imageUrlOnIpfs, lastMessage.imageUrlOnIpfs, lastMessage.promptOnIpfs, lastMessage.prompt)
                        break;
                    case 'QuicAI':
                        dynamicDecideAddMessageToDatabase[lastMessage.contentType]()
                        break;
                    default:
                        break;
                }
            }
        }

    }, [messages])


}

// Api router 
export const aiEngineApiCall = (inputFromUser, aiEngineToUse, translationLanguage) => {

    // 
    switch (aiEngineToUse) {
        case 'Chatgpt':
            return ChatgptApiCall(inputFromUser)
        case 'DALLE2':
            return DALLE2ApiCall(inputFromUser)
        case 'DID':
            return DIDApiCall(inputFromUser)
        case 'SAMSUM':
            return SAMSUMApiCall(inputFromUser)
        case 'T2SEDEN':
            return T2SEDENApiCall(inputFromUser)
        case 'PDFTRANSEDEN':
            return PDFTRANSEDENApiCall(inputFromUser, translationLanguage)
        case 'RIFFUSION':
            return RIFFUSIONApiCall(inputFromUser)
        case 'STABLEDIFFUSION':
            return STABLEDIFFUSIONApiCall(inputFromUser)
        case 'OPENJOURNEY':
            return OPENJOURNEYApiCall(inputFromUser)
        case 'ANYTHING':
            return ANYTHINGApiCall(inputFromUser)
        case 'QuicAI':
            return QuicAIApiCall(inputFromUser)

        default:
            break;
    }

}

export default apiCallIndex