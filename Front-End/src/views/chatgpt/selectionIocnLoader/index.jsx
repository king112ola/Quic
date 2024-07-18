import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery, useTheme } from "@mui/material";

// Import Redux 
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { SET_CurrentAiEngine, SET_TranslationMenuOpen } from '~/redux/slices/message-related/messageSlice'

// import web3 tools 
import { readContract } from '@wagmi/core';
import { sepolia } from 'wagmi/chains'
import { useAccount } from 'wagmi';
import _Quic_Ipfs_Storage_Abi from '%/abi/_Quic_Ipfs_Storage_Abi.json'

export const SelectionIconLoader = () => {
    // Create dispatch 
    const dispatch = useDispatch();

    // create a ref for the selection focus
    const motionFocus = useRef()

    // state to track if the user is clicking outside
    const [clickedOutside, setClickedOutside] = useState(false);

    // use this state for looping the icon animation
    const [hideAnimationTag, setHideAnimationTag] = useState(false);

    // create a state for checking if the icon is openeed
    const [isSelectionMenuOpen, setIsSelectionMenuOpen] = useState(false);

    // create a state to see if the current user is a premium user of Quic
    const [isPremiumUser, setIsPremiumUser] = useState(false);

    // get the translation menu open state 
    const translationMenuOpen = useSelector((state) => state.messagesFromUserAndServer.translationMenuOpen, shallowEqual)

    // Check the screen size
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    //   check dark mode 
    const isInDarkMode = useTheme().palette.darkTheme

    // for wagmi connection checking and fetching address of the user
    const { address, isConnected } = useAccount();



    // handler for Changing Current Ai Engine
    const handleChangeCurrentAiEngine = (currentAiEngine) => {

        // close the language selection 
        if (translationMenuOpen && currentAiEngine !== 'PDFTRANSEDEN')
            dispatch(SET_TranslationMenuOpen({ translationMenuOpen: false }))


        dispatch(SET_CurrentAiEngine({
            currentAiEngine: currentAiEngine
        }))
    }

    // handle doc upload, currently support pdf only
    const handleDocUpload = async (event) => {

        event.preventDefault()

        dispatch(SET_TranslationMenuOpen({ translationMenuOpen: true }))

    }

    const handleClickOutside = e => {
        if (!motionFocus.current.contains(e.target)) {
            setIsSelectionMenuOpen(false)
            setClickedOutside(true);
        }
    };


    const handleClickInside = () => setClickedOutside(false);

    // for monitoring the outside click and disable the selection box 
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    // for disableing the non premium feature
    useEffect(() => {
        const checkPremium = async () => {
            const data = await readContract({
                address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
                abi: _Quic_Ipfs_Storage_Abi,
                functionName: 'premium_Users',
                args: [address],
                chainId: sepolia.id,
                enabled: false,// dafault true amd will be auto running 
                overrides: { from: address },
            }
            )
            setIsPremiumUser(data.toString().split(',')[0] == 'true' ? true : false)
        }
        if (isConnected)
            checkPremium()

    }, [isConnected]);

    return (
        <>

            {/* pdf input field */}
            <input
                hidden
                type="file"
                id="DocUpload"
                onChange={handleDocUpload}
            >
            </input>

            {/* selection animation */}
            <AnimatePresence >

                <motion.div transition={{ layout: { duration: 0.5, type: "spring" } }} layout style={{
                    padding: isSelectionMenuOpen ? '2px' : '10px',
                    paddingRight: isSelectionMenuOpen ? '0vw' : '10px',
                    display: 'flex',
                    flexShrink: 20,
                    width: isSelectionMenuOpen ? '100%' : (isSmallScreen ? '15vw' : '3vw'),
                }}
                    ref={motionFocus}

                    className='selectionRoot'
                    onWheel={(event) => {
                        if (document.getElementsByClassName('selectionOpyionsUnselecteAble')[0]) {
                            if (Math.sign(event.deltaY) === 1 ) // forwarding
                            {
                                document.getElementsByClassName('selectionOpyionsUnselecteAble')[0].scrollBy({
                                    top: isSmallScreen ? 80 : 105.5,
                                    left: 0,
                                    behavior: 'smooth'
                                });
                            }

                            else // backwarding
                            {
                                document.getElementsByClassName('selectionOpyionsUnselecteAble')[0].scrollBy({
                                    top: isSmallScreen ? -80 : -105.5,
                                    left: 0,
                                    behavior: 'smooth'
                                });



                            }
                        }
                        // 


                    }}
                    onClick={() => {
                        handleClickInside()
                        setIsSelectionMenuOpen(!isSelectionMenuOpen)
                    }}>

                    {/* Before selection */}
                    <motion.div style={{ maxWidth: '50px' }} key='SelectionIcon' layout="position" className="selectionOpyions" >
                        <motion.svg
                            viewBox={isSelectionMenuOpen ? (isSmallScreen ? "2 -11 22 33" : "2 -5 22 33") : (isSmallScreen ? "1.5 -4 20 30" : "1.5 -1 20 30")}
                            width='59px'
                            height={isSelectionMenuOpen ? '50px' : '39px'}
                            className={isInDarkMode ? "selection-animation-icon-darkMode" : "selection-animation-icon-whiteMode"}
                        >

                            <motion.path
                                onAnimationComplete={() => {
                                    setHideAnimationTag(!hideAnimationTag);
                                }}
                                d="M10.09 4.01l.496 -.495a2 2 0 0 1 2.828 0l7.071 7.07a2 2 0 0 1 0 2.83l-7.07 7.07a2 2 0 0 1 -2.83 0l-7.07 -7.07a2 2 0 0 1 0 -2.83l3.535 -3.535h-3.988"
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        pathLength: 0,
                                        fill: "rgba(255, 255, 255, 0)"
                                    },
                                    visible: {
                                        opacity: 1,
                                        pathLength: 1
                                    }
                                }}
                                initial="hidden"
                                animate={hideAnimationTag ? "hidden" : "visible"}

                                transition={{
                                    default: { duration: 2, ease: "easeInOut" },
                                    fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                                }}
                            />
                        </motion.svg>
                    </motion.div>

                    {/* Options */}
                    {isSelectionMenuOpen &&

                        <motion.div
                            key='options'
                            variants={{
                                hidden: {
                                    opacity: 0,

                                },
                                visible: {
                                    opacity: 1,
                                }
                            }}
                       
                            layout='position'
                            className="selectionOpyions selectionOpyionsUnselecteAble"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: isSmallScreen ? '2rem' : '3rem',
                                overflowY: isSmallScreen ? 'auto' : 'hidden',
                                width: '100%',
                                flexGrow: 1,
                                flexBasis: isSmallScreen ? 'auto' : 0,
                                // maxWidth: '90%',
                                whiteSpace: 'nowrap',
                                flexWrap: isSmallScreen ? 'nowrap' : 'wrap',
                                // flexFlow:'row wrap',
                                // flex: 1,
                                height: '100px',
                            }}



                        >
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('QuicAI')}>Quic Ai.</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('Chatgpt')}>Chatgpt</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('DALLE2')}>DALL·E 2</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('MUSICFY')}>Musicfy</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('SAMSUM')}>Samsum</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('RIFFUSION')}>Riffusion</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('STABLEDIFFUSION')}>Stable-Diffusion</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('T2SEDEN')}>T2S Eden</motion.h5>
                            <motion.h5
                                hidden={!isPremiumUser}
                                style={{ width: isSmallScreen ? '90px' : '80px' }} className="selectionItem"


                                onClick={() => {
                                    document.getElementById('DocUpload').click()

                                    handleChangeCurrentAiEngine('PDFTRANSEDEN')

                                }}
                            >
                                PDF Translate Eden
                            </motion.h5>
                            <motion.h5 hidden={!isPremiumUser} style={{ width: '50px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('DID')}>D-ID</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('OPENJOURNEY')}>Openjourney</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('ANYTHING')}>Anything-v4.0</motion.h5>
                            <motion.h5 hidden={!isPremiumUser} style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeCurrentAiEngine('None')}>Bard</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" >Bing Ai.</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" ></motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" ></motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" ></motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" ></motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" ></motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" ></motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" ></motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" ></motion.h5>
                        </motion.div>}
                </motion.div>
            </AnimatePresence>
        </>
    );
};
