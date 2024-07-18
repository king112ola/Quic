import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery, useTheme } from "@mui/material";

// Import Redux 
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { SET_FilterAiEngineForRecord, SET_TranslationMenuOpen } from '~/redux/slices/message-related/messageSlice'

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

    // get the translation menu open state 
    const translationMenuOpen = useSelector((state) => state.messagesFromUserAndServer.translationMenuOpen, shallowEqual)

    // Check the screen size
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    //   check dark mode 
    const isInDarkMode = useTheme().palette.darkTheme


    // handler for Changing Current Ai Engine
    const handleChangeFilterAiEngine = (filterAiEngine) => {

        dispatch(SET_FilterAiEngineForRecord({
            filterAiEngineForRecord: filterAiEngine
        }))
    }


    const handleClickOutside = e => {
        if (!motionFocus.current.contains(e.target)) {
            setIsSelectionMenuOpen(false)
            setClickedOutside(true);
        }
    };


    const handleClickInside = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });



    return (
        <>

            {/* pdf input field */}

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
                        // document.getElementsByClassName('selectionOpyionsUnselecteAble')[0].style.transform = 'scale(1.1)'
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
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine()}>Display All.</motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('QuicAI')}>Quic Ai.</motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('Chatgpt')}>Chatgpt</motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('DALLE2')}>DALL·E</motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('MUSICFY')}>Musicfy</motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('SAMSUM')}>Samsum</motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('RIFFUSION')}>Riffusion</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('STABLEDIFFUSION')}>Stable-Diffusion</motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('T2SEDEN')}>T2S Eden</motion.h5>
                            <motion.h5 style={{ width: isSmallScreen ? '90px' : '80px' }} className="selectionItem" onClick={() => { handleChangeFilterAiEngine('PDFTRANSEDEN') }} > PDF Translation Eden</motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('DID')}>D-ID</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('OPENJOURNEY')}>Openjourney</motion.h5>
                            <motion.h5 style={{ width: '70px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('ANYTHING')}>Anything-v4.0</motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('')}></motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('')}></motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('')}></motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('')}></motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('')}></motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('')}></motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('')}></motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('')}></motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('')}></motion.h5>
                            <motion.h5 style={{ width: '60px' }} className="selectionItem" onClick={() => handleChangeFilterAiEngine('')}></motion.h5>
                        </motion.div>}

                </motion.div>
            </AnimatePresence>
        </>
    );
};
