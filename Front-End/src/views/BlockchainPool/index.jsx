import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
// project imports
import AnimateButton from '~/ui-component/extended/AnimateButton';

// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import SubCard from '~/ui-component/cards/SubCard';
import MainCard from '~/ui-component/cards/MainCard';
import { gridSpacing } from '~/redux/slices/theme-related/constant';

// Import typing effect 
import Typewriter2 from 'typewriter-effect';

// import react 
import { useEffect, useState, useMemo, useCallback } from 'react';

// import react moralis for metamask connect and also wagmi and ether js 
import { useMoralis } from 'react-moralis';
import { readContract } from '@wagmi/core'
import _Quic_Ipfs_Storage_Abi from '%/abi/_Quic_Ipfs_Storage_Abi.json'
import { sepolia } from 'wagmi/chains'
import { useAccount } from 'wagmi';
import { ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
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

const BlockchainPool = () => {
    const theme = useTheme();
    const { Moralis } = useMoralis();
    const { address, isConnected } = useAccount();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const [ipfsHashAndPrompt, setIpfsHashAndPrompt] = useState([]);
    const [priceOfIPFS, setPriceOfIPFS] = useState({});
    const [finalBiddingDecision, setFinalBiddingDecision] = useState({
        ipfsHash: "",
        biddingPrice: ethers.utils.parseEther('0.02'),
        contractEnable: false,
        biddingStartButton: true
    });

    const debouncedFinalBiddingDecision = useDebounce(finalBiddingDecision, 200);

    const { config } = usePrepareContractWrite({
        address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
        abi: _Quic_Ipfs_Storage_Abi,
        functionName: 'changeBiddingPrice',
        args: [debouncedFinalBiddingDecision.ipfsHash],
        overrides: {
            from: address,
            value: ethers.utils.parseEther(debouncedFinalBiddingDecision.biddingPrice.toString())
        },
        enabled: debouncedFinalBiddingDecision.contractEnable
    });

    const { write } = useContractWrite(config);

    const loadPoolImages = useCallback(async () => {
        const readPoolHashAmount = async () => {
            const data = await readContract({
                address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
                abi: _Quic_Ipfs_Storage_Abi,
                functionName: 'fetchAmountOfHashsFromPool',
                chainId: sepolia.id,
                overrides: { from: address },
            });
            return data;
        };

        const readIpfsHashAndPromptFromPoolList = async (poolHashImagesAmount) => {
            let returnData = [];
            let priceData = {};

            for (let i = 0; i < poolHashImagesAmount; i++) {
                const ipfsHash = await readContract({
                    address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
                    abi: _Quic_Ipfs_Storage_Abi,
                    functionName: 'ipfsHash_Pool_List',
                    args: [i.toString()],
                    chainId: sepolia.id,
                    overrides: { from: address },
                });

                const ipfsHash_Prompt = await readContract({
                    address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
                    abi: _Quic_Ipfs_Storage_Abi,
                    functionName: 'ipfsHashPrompt_Pool_List',
                    args: [i.toString()],
                    chainId: sepolia.id,
                    overrides: { from: address },
                });

                const ipfsHash_Detail_From_Pool = await readContract({
                    address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
                    abi: _Quic_Ipfs_Storage_Abi,
                    functionName: 'ipfsHash_Pool',
                    args: [ipfsHash],
                    chainId: sepolia.id,
                    overrides: { from: address },
                });

                let contentType = "";
                const pictureFormatConditions = [".bmp", ".png", ".jpg", ".jpeg"];

                switch (true) {
                    case ipfsHash.includes(".chatgpt.json"):
                    case ipfsHash.includes(".Samsum.json"):
                    case ipfsHash.includes(".prompt.json"):
                        contentType = 'text';
                        break;
                    case pictureFormatConditions.some(format => ipfsHash.includes(format)):
                        contentType = 'image';
                        break;
                    case ipfsHash.includes(".D-ID.mp4"):
                        contentType = 'video';
                        break;
                    case ipfsHash.includes(".Text2Speech-EDEN.wav"):
                    case ipfsHash.includes(".mp3"):
                    case ipfsHash.includes(".wav"):
                        contentType = 'audio';
                        break;
                    case ipfsHash.includes(".PdfTranslate-EDEN.pdf"):
                        contentType = 'pdf';
                        break;
                    default:
                        break;
                }

                returnData.push([ipfsHash, ipfsHash_Prompt, contentType]);

                priceData[ipfsHash] = {
                    currentBiddingPrice: (parseFloat(Moralis.Units.FromWei(ipfsHash_Detail_From_Pool.biddingPriceInWei.toString())) + 0.01).toFixed(2),
                    baseBiddingPrice: (parseFloat(Moralis.Units.FromWei(ipfsHash_Detail_From_Pool.biddingPriceInWei.toString())) + 0.01).toFixed(2),
                    isBidderSameAsHolder: ipfsHash_Detail_From_Pool.ipfsHashHolder == address
                };
            }

            setIpfsHashAndPrompt(returnData);
            setPriceOfIPFS(priceData);
        };

        const poolHashImagesAmount = (await readPoolHashAmount()).toString();
        await readIpfsHashAndPromptFromPoolList(poolHashImagesAmount);
    }, [address, Moralis]);

    useEffect(() => {
        if (isConnected) loadPoolImages();
    }, [isConnected, loadPoolImages]);

    return (
        <MainCard
            sx={{ border: 'none' }}
            title={
                <Typewriter2
                    showCursor={false}
                    options={{
                        delay: 15,
                        autoStart: true,
                        loop: true,
                    }}
                    onInit={(typewriter) => {
                        typewriter.typeString('...').pauseFor(2300).deleteAll().typeString('Check out the Pool!')
                            .pauseFor(100)
                            .deleteChars(5)
                            .pauseFor(2200)
                            .typeString('Pool!')
                            .pauseFor(3000)
                            .start();
                    }}
                />
            }
        >
            <SimpleBar style={{ padding: "0.7%", maxHeight: isSmallScreen ? '69vh' : '75vh' }}>
                <Grid container spacing={gridSpacing}>
                    <PhotoProvider>
                        {ipfsHashAndPrompt.map((item) => (
                            <Grid align="center" item xs={12} sm={6} md={3} key={item[0]} sx={{ minWidth: { xs: '200px', md: '370px' } }}>
                                <SubCard sx={{ p: 0 }}>
                                    {{
                                        'image': (
                                            <SimpleBar>
                                                <Grid container direction="column" spacing={1}>
                                                    <Grid align="center" item xs={12} sm={12}>
                                                        <MuiTypography variant="h1" gutterBottom>
                                                            <PhotoView src={item[0]}>
                                                                <img
                                                                    loading="lazy"
                                                                    style={{ borderRadius: '8px', maxWidth: '256px', maxHeight: '256px', overflow: 'auto' }}
                                                                    src={item[0]}
                                                                    onError={(e) => { let url = e.target.src; e.target.src = ""; e.target.src = url; }}
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
                                        ),
                                        'audio': (
                                            <Grid container>
                                                <Grid align="center" item xs={12} sm={12} mt={0.5}>
                                                    <AudioPlayer src={item[0]} />
                                                </Grid>
                                                <Grid align="center" item xs={12} sm={12} pt={1}>
                                                    <MuiTypography variant="h4" gutterBottom>
                                                        {item[1]}
                                                    </MuiTypography>
                                                </Grid>
                                            </Grid>
                                        )
                                    }[item[2]]}

                                    <Grid align="center" item xs={12} sm={12} sx={{ mt: 2, mb: 0.7, display: priceOfIPFS[item[0]].isBidderSameAsHolder ? "none" : "block" }}>
                                        <AnimateButton>
                                            <ButtonGroup size="small" aria-label="small outlined button group" sx={{ backgroundColor: theme.palette.grey[50], color: theme.palette.secondary.light }}>
                                                <Button
                                                    sx={{ color: theme.palette.grey[900] }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if ((parseFloat(priceOfIPFS[item[0]].currentBiddingPrice) - 0.01).toFixed(2) >= parseFloat(priceOfIPFS[item[0]].baseBiddingPrice)) {
                                                            setPriceOfIPFS((prevState) => {
                                                                let hashBiddingPrice = { ...prevState[item[0]], currentBiddingPrice: (parseFloat(prevState[item[0]].currentBiddingPrice) - 0.01).toFixed(2) };
                                                                return { ...prevState, [item[0]]: hashBiddingPrice };
                                                            });

                                                            setFinalBiddingDecision({
                                                                ipfsHash: item[0],
                                                                biddingPrice: (parseFloat(document.getElementById(item[0]).textContent) - 0.01).toFixed(2),
                                                                contractEnable: true,
                                                                biddingStartButton: false
                                                            });
                                                        }
                                                    }}
                                                >-</Button>
                                                <Button
                                                    disabled={finalBiddingDecision.biddingStartButton}
                                                    id={item[0]}
                                                    onClick={() => write?.()}
                                                    sx={{
                                                        color: theme.palette.grey[900], "&.Mui-disabled": {
                                                            color: theme.palette.grey[900]
                                                        }
                                                    }}
                                                >{parseFloat(priceOfIPFS[item[0]].currentBiddingPrice).toFixed(2)}</Button>
                                                <Button
                                                    sx={{ color: theme.palette.grey[900] }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPriceOfIPFS((prevState) => {
                                                            let hashBiddingPrice = { ...prevState[item[0]], currentBiddingPrice: (parseFloat(prevState[item[0]].currentBiddingPrice) + 0.01).toFixed(2) };
                                                            return { ...prevState, [item[0]]: hashBiddingPrice };
                                                        });

                                                        setFinalBiddingDecision({
                                                            ipfsHash: item[0],
                                                            biddingPrice: (parseFloat(document.getElementById(item[0]).textContent) + 0.01).toFixed(2),
                                                            contractEnable: true,
                                                            biddingStartButton: false
                                                        });
                                                    }}
                                                >+</Button>
                                            </ButtonGroup>
                                        </AnimateButton>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        ))}
                    </PhotoProvider>
                </Grid>
            </SimpleBar>
        </MainCard>
    );
};

export default BlockchainPool;
