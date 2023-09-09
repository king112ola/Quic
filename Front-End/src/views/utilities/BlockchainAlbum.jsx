// import { Grid, Link } from '@mui/material';
// import MuiTypography from '@mui/material/Typography';

// // project imports
// import SubCard from '~/ui-component/cards/SubCard';
// import MainCard from '~/ui-component/cards/MainCard';
// import SecondaryAction from '~/ui-component/cards/CardSecondaryAction';
// import { gridSpacing } from '~/redux/slices/theme-related/constant';

// // Import typing effect 
// import Typewriter2 from 'typewriter-effect';

// // import react 
// import { useEffect, useState } from 'react';

// // import react moralis for metamask connect and also wagmi and ether js 
// import { useMoralis } from 'react-moralis';
// import { useContractRead } from 'wagmi'
// import { readContract } from '@wagmi/core'
// import _Quic_Ipfs_Storage_Abi from '%/abi/_Quic_Ipfs_Storage_Abi.json'
// import { goerli } from 'wagmi/chains'
// import { useAccount, useConnect } from 'wagmi';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { ethers } from "ethers";
// import useDebounce from './useDebounce';

// // Import mediaQuery to check if in mobile 
// import useMediaQuery from '@mui/material/useMediaQuery';

// // Scrollbar 
// import SimpleBar from 'simplebar-react';
// import 'simplebar-react/dist/simplebar.min.css';

// // import photo viewer
// import 'react-photo-view/dist/react-photo-view.css';
// import { PhotoProvider, PhotoView } from 'react-photo-view';

// // start reading the list of ipfshash for that account


// // ==============================|| TYPOGRAPHY ||============================== //

// const BlockchainAlbum = () => {

//     // session for web3

//     //use moralis for testing and init the state for wagmi to interact with smart contract
//     const { Moralis } = useMoralis();

//     // set the hashof the ipfs 
//     const [ipfsHashAndPrompt, setIpfsHashAndPrompt] = useState("")
//     // const debouncedIpfsHash = useDebounce(ipfsHash, 500);

//     const { connect } = useConnect({
//         connector: new MetaMaskConnector()
//     })

//     const { address, isConnected } = useAccount();

//     const [load, setLoad] = useState(false)

//     // Check the screen size
//     const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));


//     const loadImage = async () => {


//         //
//         const readhashAmount = async () => {
//             const data = await readContract({

//                 address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
//                 abi: _Quic_Ipfs_Storage_Abi,
//                 functionName: 'fetchAmountOfHashsFromAddress',
//                 chainId: goerli.id,
//                 enabled: false,// dafault true amd will be auto running 
//                 overrides: { from: address },
//             }
//             )
//             return data
//         }


//         const readIpfsHash = async (hashImagesAmount) => {
//             let returnData = [];

//             for (let i = 0; i < hashImagesAmount; i++) {

//                 const data = await readContract({

//                     address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
//                     abi: _Quic_Ipfs_Storage_Abi,
//                     functionName: 'fetchHashAndPromptFromAddress',
//                     args: [i.toString()],
//                     chainId: goerli.id,
//                     enabled: false,// dafault true amd will be auto running 
//                     overrides: { from: address },
//                 })
//                 returnData.push(data)

//             }


//             return returnData

//         }



//         let hashImagesAmount = (await readhashAmount()).toString();

//         let data = await readIpfsHash(hashImagesAmount)

//         setIpfsHashAndPrompt(data)
//         // 



//     }

//     useEffect(() => { loadImage() }, [isConnected])
//     // useEffect(() => { connect() }, [])


//     // end of web3
//     return (

//         <MainCard
//             sx={{ border: 'none' }}
//             onClick={() => loadImage()}
//             title={
//                 <Typewriter2
//                     showCursor={false}
//                     options={{
//                         delay: 15,
//                         autoStart: true,
//                         loop: true,
//                     }}
//                     onInit={
//                         (typewriter) => {
//                             typewriter.typeString('...').pauseFor(2300).deleteAll().typeString('Check out the Archives')
//                                 .pauseFor(100)
//                                 .deleteChars(8)
//                                 .pauseFor(2500)
//                                 .typeString('Archives!')
//                                 .pauseFor(3300)
//                                 .start()
//                         }}
//                 />
//             } secondary={<SecondaryAction link="" />}>

//             <SimpleBar
//                 style={{ padding: "0.7%", maxHeight: isSmallScreen ? '69vh' : '75vh' }}>

//                 <Grid container spacing={gridSpacing}>
//                     <PhotoProvider>

//                         {ipfsHashAndPrompt && (ipfsHashAndPrompt.map((item, index) => {


//                             return (

//                                 <Grid align="center" item xs={12} sm={6} md={3} key={item} sx={{ minWidth: { xs: '200px', md: '370px' } }}>
//                                     <SubCard >
//                                         <SimpleBar>
//                                             {/*   <SimpleBar style={{ height: '380px', overflow: 'auto' }}> */}
//                                             <Grid container direction="column" spacing={1}>
//                                                 <Grid align="center" item xs={12} sm={12} >
//                                                     <MuiTypography variant="h1" gutterBottom>
//                                                         <PhotoView src={item[0]}>
//                                                             <img
//                                                                 loading="lazy"
//                                                                 style={{ borderRadius: '8px', maxWidth: '256px', maxHeight: '256px', overflow: 'auto' }}
//                                                                 src={item[0]}
//                                                                 onError={(e) => { let url = e.target.src; e.target.src = ""; e.target.src = url }}
//                                                                 id={item[0].split("ipfs/")[1].split("/")[1].split(".")[0]} // get image id from item

//                                                             />
//                                                         </PhotoView>
//                                                     </MuiTypography>
//                                                 </Grid>
//                                                 <Grid align="center" item xs={12} sm={12}>
//                                                     <MuiTypography variant="h4" gutterBottom>
//                                                         {item[1]}
//                                                     </MuiTypography>
//                                                 </Grid>
//                                                 {/* {ipfsHash}here
//                                 {

//                                             </Grid>
//                                         </SimpleBar>
//                                     </SubCard>

//                                 </Grid>


//                             )
//                         }))

//                         }


//                     </PhotoProvider>

//                 </Grid>
//             </SimpleBar>
//         </MainCard>
//     )
// };

// export default BlockchainAlbum;
