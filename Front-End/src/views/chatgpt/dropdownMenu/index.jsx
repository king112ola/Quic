import { useSelector, shallowEqual } from 'react-redux';

const aiEngineNameOutputToScreen = {
    Chatgpt: 'ChatGPT',
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

export const DropdownMenu = ({ id, itemid, handleMessageInput, scrollRef }) => {

    // Load message/ Init message from Redux store
    const messages = useSelector((state) => state.messagesFromUserAndServer.messages, shallowEqual)

    // Find the last Id from the message list
    const lastMessageId = useSelector((state) => state.messagesFromUserAndServer.lastMessageId, shallowEqual)

    // close all of the dropdown menu and with the closing fade out + slide down effect
    const clearDropdownMenu = (handleMessageInput) => {

        let dropdownMenu = document.getElementById('dropdown-menu-' + itemid)

        dropdownMenu.setAttribute('dropdown-menu-closing-Redirect', "")

        dropdownMenu.addEventListener('animationend', () => {
            dropdownMenu.removeAttribute('dropdown-menu-closing-Redirect');
            dropdownMenu.style.display = "none";
            handleMessageInput()
        }, { once: true }
        )
    }


    const handdleMessageRedirect = ({ desireAiEngine, hiddenFromUser }) => {

        let inputFromUser = ""

        switch (messages[itemid - 1].contentType) {
            case "image":
                inputFromUser = messages[itemid - 1].messageBody[0].imageUrlOnIpfs
                break;
            case "text":
                inputFromUser = messages[itemid - 1].messageBody
                break;
            case "video":
                inputFromUser = messages[itemid - 1].messageBody
                break;
            case "audio":
                inputFromUser = messages[itemid - 1].messageBody
                break;

            default:
                break;
        }

        // Inject a user side message to notify the user that the message is being redirected
        handleMessageInput("Sending to " +aiEngineNameOutputToScreen[desireAiEngine] +"...", desireAiEngine,null, null, null, true)

        clearDropdownMenu(() => handleMessageInput(inputFromUser, desireAiEngine, hiddenFromUser))

    }
    
    return (
        <div className="dropdown-menu" id={id}>
            <div className="sec-center ">
                <input className="dropdown" type="checkbox" id={"dropdown-checkbox-" + itemid} name="dropdown" />
                <label className="for-dropdown" htmlFor={"dropdown-checkbox-" + itemid}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>

                </label>
                <div className="section-dropdown">
                    <a onClick={() => handdleMessageRedirect({ desireAiEngine: 'Chatgpt', hiddenFromUser: true })} className="dropdown-menu-item" href="#">Chatgpt<i className="uil uil-arrow-right"></i></a>

                    <a onClick={() => handdleMessageRedirect({ desireAiEngine: 'SAMSUM', hiddenFromUser: true })} className="dropdown-menu-item" href="#">Samsum<i className="uil uil-arrow-right"></i></a>


                                    {/*real DID- only use when needed */}
                    <a onClick={() => handdleMessageRedirect({ desireAiEngine: 'DID', hiddenFromUser: true })} className="dropdown-menu-item" href="#">D-ID<i className="uil uil-arrow-right"></i></a>
                    {/* <a className="dropdown-menu-item" href="#">D-ID<i className="uil uil-arrow-right"></i></a> */}
                  
                  
                    <a onClick={() => handdleMessageRedirect({ desireAiEngine: 'T2SEDEN', hiddenFromUser: true })} className="dropdown-menu-item" href="#">T2S Eden Ai<i className="uil uil-arrow-right"></i></a>

                    <input className="dropdown-sub-images" type="checkbox" id={"dropdown-sub-images" + itemid} name="dropdown-sub-images" />
                    <label htmlFor={"dropdown-sub-images" + itemid}>Images<i className="uil uil-plus"></i></label>
                    <div className="section-dropdown-sub-images" id={"dropdown-sub-images" + itemid}>
                        <a onClick={() => handdleMessageRedirect({ desireAiEngine: 'DALLE2', hiddenFromUser: true })} className="dropdown-menu-item" href="#">DALLE-2<i className="uil uil-arrow-right"></i></a>
                        <a onClick={() => handdleMessageRedirect({ desireAiEngine: 'STABLEDIFFUSION', hiddenFromUser: true })} className="dropdown-menu-item" href="#">Stable-Diffusion<i className="uil uil-arrow-right"></i></a>
                       
                        <a onClick={() => handdleMessageRedirect({ desireAiEngine: 'OPENJOURNEY', hiddenFromUser: true })} className="dropdown-menu-item" href="#">Openjourney<i className="uil uil-arrow-right"></i></a>
                        <a onClick={() => handdleMessageRedirect({ desireAiEngine: 'ANYTHING', hiddenFromUser: true })} className="dropdown-menu-item" href="#">Anything-v4<i className="uil uil-arrow-right"></i></a>

                    </div>

                    <input className="dropdown-sub-musics" type="checkbox" id={"dropdown-sub-musics" + itemid} name="dropdown-sub-musics" />
                    <label htmlFor={"dropdown-sub-musics" + itemid}>Music<i className="uil uil-plus"></i></label>
                    <div className="section-dropdown-sub-musics" id={"dropdown-sub-musics-div" + itemid}>
                        <a onClick={() => handdleMessageRedirect({ desireAiEngine: 'RIFFUSION', hiddenFromUser: true })} className="dropdown-menu-item" href="#">Riffusion<i className="uil uil-arrow-right"></i></a>
                        <a className="dropdown-menu-item" href="#">AIVA<i className="uil uil-arrow-right"></i></a>
                    </div>


                </div>
            </div>
        </div>
    )

}
