import { Grid, Link, Button } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import ButtonGroup from "@mui/material/ButtonGroup";
// project imports
import AnimateButton from '~/ui-component/extended/AnimateButton';

// material-ui
import { styled, useTheme } from '@mui/material/styles';

// project imports
import SubCard from '~/ui-component/cards/SubCard';
import MainCard from '~/ui-component/cards/MainCard';
import { gridSpacing } from '~/redux/slices/theme-related/constant';

// Import typing effect 
import Typewriter2 from 'typewriter-effect';

// import react 
import { useEffect, useState } from 'react';

// import react moralis for metamask connect and also wagmi and ether js 
import { useMoralis } from 'react-moralis';
import { useContractRead } from 'wagmi'
import { readContract } from '@wagmi/core'
import _Quic_Ipfs_Storage_Abi from '%/abi/_Quic_Ipfs_Storage_Abi.json'
import { goerli } from 'wagmi/chains'
import { useAccount, useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite, useSigner } from 'wagmi';
import useDebounce from '~/useDebounce';

// Import mediaQuery to check if in mobile 
import useMediaQuery from '@mui/material/useMediaQuery';

// Scrollbar 
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// import photo viewer
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

// import react audio player
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// start reading the list of ipfshash for that account


// ==============================|| TYPOGRAPHY ||============================== //

const BlockchainAlbum = () => {

    const theme = useTheme();

    // session for web3

    //use moralis for testing and init the state for wagmi to interact with smart contract
    const { Moralis } = useMoralis();

    // set the hashof the ipfs 
    const [ipfsHashAndPrompt, setIpfsHashAndPrompt] = useState("")

    // set the bidding price of the pool items 
    const [priceOfIPFS, setPriceOfIPFS] = useState({})

    // set the hashof the ipfs 
    const [ipfsHashBiddingTobeAccepted, setIpfsHashBiddingTobeAccepted] = useState("")

    // set the hashof the ipfs 
    const [contractWriteEnable, setContractWriteEnable] = useState(false)

    const { connect } = useConnect({
        connector: new MetaMaskConnector()
    })

    const { address, isConnected } = useAccount();

    const [load, setLoad] = useState(false)

    // Check the screen size
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    // prepare the accepting the bidding
    const { config } = usePrepareContractWrite({

        address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
        abi: _Quic_Ipfs_Storage_Abi,
        functionName: 'acceptBiddingPrice(string)',
        args: [ipfsHashBiddingTobeAccepted],
        overrides: {

            from: address,
            value: ethers.utils.parseEther('0.01')
        },

        // chainId: goerli.id,
        // signerOrProvider: signer,
        enabled: contractWriteEnable // dafault true amd will be auto running 

    })

    // create a write object for smart contract
    const { write } = useContractWrite(config);


    const loadIpfsHash = async () => {

        const readhashAmount = async () => {
            const data = await readContract({

                address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
                abi: _Quic_Ipfs_Storage_Abi,
                functionName: 'fetchAmountOfHashsFromAddress',
                chainId: goerli.id,
                enabled: false,// dafault true amd will be auto running 
                overrides: { from: address },
            }
            )
            return data
        }


        const readIpfsHash = async (hashImagesAmount) => {
            let returnData = [];

            for (let i = 0; i < hashImagesAmount; i++) {

                const data = await readContract({

                    address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
                    abi: _Quic_Ipfs_Storage_Abi,
                    functionName: 'fetchHashAndPromptFromAddress',
                    args: [i.toString()],
                    chainId: goerli.id,
                    enabled: false,// dafault true amd will be auto running 
                    overrides: { from: address },
                })
                const ipfsHash_Detail_From_Pool = await readContract({

                    address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
                    abi: _Quic_Ipfs_Storage_Abi,
                    functionName: 'ipfsHash_Pool',
                    args: [data[0]],
                    chainId: goerli.id,
                    enabled: false,// dafault true amd will be auto running 
                    overrides: { from: address },
                })

                let contentType = ""

                const pictureFormatConditions = [".bmp", ".png", ".jpg", ".jpeg"];

                switch (true) {
                    // chatgpt message body
                    case data[0].includes(".chatgpt.json"):
                        contentType = 'text'
                        break

                    // chatgpt message body
                    case data[0].includes(".Samsum.json"):
                        contentType = 'text'

                        break

                    // prompt
                    case data[0].includes(".prompt.json"):
                        contentType = 'text'
                        break

                    // DALLE Image body
                    case pictureFormatConditions.some(format => data[0].includes(format)):
                        contentType = 'image'
                        break

                    // did
                    case data[0].includes(".D-ID.mp4"):
                        contentType = 'video'
                        break

                    // Text to Speech Eden
                    case data[0].includes(".Text2Speech-EDEN.wav"):
                        contentType = 'audio'
                        break

                    // Doc pdf translate Eden
                    case data[0].includes(".PdfTranslate-EDEN.pdf"):
                        contentType = 'pdf'
                        break

                    // case for music/audio testing
                    case data[0].includes(".mp3"):
                        contentType = 'audio'
                        break
                    case data[0].includes(".wav"):
                        contentType = 'audio'
                        break

                    // default to url
                    default:
                        break
                }


                let ipfsHashInfo = [data[0], data[1], contentType]

                returnData.push(ipfsHashInfo)


                setPriceOfIPFS(prevState => {

                    let priceOfIPFSTmp = priceOfIPFS
                    priceOfIPFSTmp[data[0]] = {
                        currentBiddingPrice: (parseFloat(Moralis.Units.FromWei(ipfsHash_Detail_From_Pool.biddingPriceInWei.toString()))).toFixed(2),
                        doesBidderExist: ipfsHash_Detail_From_Pool.currentBidder !== '0x0000000000000000000000000000000000000000',
                        bidderAddress: ipfsHash_Detail_From_Pool.currentBidder
                    }
                    return { ...prevState, ...priceOfIPFSTmp }

                })

            }

            return returnData

        }

        let hashImagesAmount = (await readhashAmount()).toString();

        let data = await readIpfsHash(hashImagesAmount)

        setIpfsHashAndPrompt(data)
    }

    useEffect(() => { if (isConnected) loadIpfsHash() }, [isConnected])
    useEffect(() => {

        {
            if (ipfsHashBiddingTobeAccepted !== "")

                write?.()
        }


    }, [ipfsHashBiddingTobeAccepted])

    return (

        <MainCard
            sx={{ border: 'none' }}
            // onClick={() => loadIpfsHash()}
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
                            typewriter.typeString('...').pauseFor(2300).deleteAll().typeString('Check out the Archives')
                                .pauseFor(100)
                                .deleteChars(8)
                                .pauseFor(2500)
                                .typeString('Archives!')
                                .pauseFor(3300)
                                .start()
                        }}
                />
            } >

            <SimpleBar
                style={{ padding: "0.7%", maxHeight: isSmallScreen ? '69vh' : '75vh' }}>

                <Grid container spacing={gridSpacing}>
                    <PhotoProvider>

                        {ipfsHashAndPrompt && (ipfsHashAndPrompt.map((item, index) => {


                            return (

                                <Grid align="center" item xs={12} sm={6} md={3} key={item} sx={{ minWidth: { xs: '200px', md: '370px' } }}>

                                    <SubCard sx={{ p: 0, }}>


                                        {
                                            {


                                                'image':

                                                    <SimpleBar>
                                                        {/*   <SimpleBar style={{ height: '380px', overflow: 'auto' }}> */}
                                                        <Grid container direction="column" spacing={1}>
                                                            <Grid align="center" item xs={12} sm={12} >
                                                                <MuiTypography variant="h1" gutterBottom>
                                                                    <PhotoView src={item[0]}>
                                                                        <img
                                                                            loading="lazy"
                                                                            style={{ borderRadius: '8px', maxWidth: '256px', maxHeight: '256px', overflow: 'auto' }}
                                                                            src={item[0]}
                                                                            onError={(e) => { let url = e.target.src; e.target.src = ""; e.target.src = url }}
                                                                            id={item[0].match(/[^/]+$/)[0]} // get image id from item

                                                                        />
                                                                    </PhotoView>
                                                                </MuiTypography>
                                                            </Grid>
                                                            <Grid align="center" item xs={12} sm={12}>
                                                                <MuiTypography variant="h4" gutterBottom>
                                                                    {item[1]}
                                                                </MuiTypography>
                                                            </Grid>
                                                        </Grid>
                                                    </SimpleBar>

                                                ,

                                                'audio':
                                                    <Grid container>
                                                        <Grid align="center" item xs={12} sm={12} mt={0.5}>
                                                            <AudioPlayer
                                                                // autoPlay
                                                                src={item[0]}
                                                            />
                                                        </Grid>
                                                        <Grid align="center" item xs={12} sm={12} pt={1}>
                                                            <MuiTypography variant="h4" gutterBottom>
                                                                {item[1]}
                                                            </MuiTypography>
                                                        </Grid>
                                                    </Grid>
                                                ,



                                            }[item[2]]
                                        }

                                        <Grid display={priceOfIPFS[item[0]].doesBidderExist ? 'flex' : 'none'} container align="center" item xs={12} sm={12} sx={{ alignItems: "center", justifyContent: 'center', }}>

                                            <Grid mr={2}>
                                                <MuiTypography variant="h5"  >
                                                    Bidding:
                                                </MuiTypography>
                                            </Grid>
                                            <Grid>
                                                <AnimateButton>

                                                    <ButtonGroup size="small" aria-label="small outlined button group" sx={{ backgroundColor: theme.palette.grey[50], color: theme.palette.secondary.light }}>

                                                        <Button
                                                            sx={{ color: theme.palette.grey[900] }}

                                                        >Decline</Button>
                                                        <Button sx={{ color: theme.palette.grey[900] }} >{priceOfIPFS[item[0]].currentBiddingPrice}</Button>
                                                        <Button
                                                            onClick={() => {
                                                                setContractWriteEnable(true)
                                                                setIpfsHashBiddingTobeAccepted(item[0])
                                                            }}
                                                            sx={{ color: theme.palette.grey[900] }}

                                                        >
                                                            Accept
                                                        </Button>
                                                    </ButtonGroup>

                                                </AnimateButton>
                                            </Grid>
                                        </Grid>

                                    </SubCard>
                                </Grid>



                            )
                        }))

                        }
                    </PhotoProvider>
                </Grid>
            </SimpleBar>
        </MainCard>
    )
};

export default BlockchainAlbum;
