// Import the NavigationScrolling component
import NavigationScroll from './layout/NavigationScroll';

// Importing Materual Styles
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// Import redux useSelector to perform actions on styling/state management
import { useSelector } from 'react-redux';

//Import Theme From material Ui
import { ThemeProvider } from "@mui/material";
import themes from "./themes/index"

//Import React
import React, { Fragment } from 'react'

//Testing import
import Home from './pages/Home';
import www from './layout/NavMotion';

//import Routes
import Routes from './routes/index'

//import moralisprovider for web3
import { MoralisProvider } from 'react-moralis';

// import wagmi for interacting with smart contract
import { configureChains, mainnet, WagmiConfig, createClient } from 'wagmi';
import { publicProvider} from 'wagmi/providers/public'
import { goerli } from '@wagmi/chains'

//import react pdf 
import { Worker} from '@react-pdf-viewer/core';
// Import the styles for react pdf
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


// configure chains web3.0
const { provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()],
)


const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})



export default function App() {

  const customization = useSelector((state) => state.customization);


  return (
    <>
      <WagmiConfig client={client} >
        <MoralisProvider serverUrl={import.meta.env.VITE_MORALIS_SELF_HOST_SERVER_URL} appId={import.meta.env.VITE_MORALIS_SELF_HOST_SERVER_APPLICATION_ID}>
          <ThemeProvider theme={themes(customization)}>
            <NavigationScroll>
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.min.js">
              <Routes />
              </Worker>
            </NavigationScroll>
          </ThemeProvider>
        </MoralisProvider>
      </WagmiConfig>
    </>

  )
}


