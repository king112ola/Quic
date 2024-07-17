// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';

// project imports
import AnimateButton from '~/ui-component/extended/AnimateButton';

// import react moralis for metamask connect and also wagmi and ether js 
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import _Quic_Ipfs_Storage_Abi from '%/abi/_Quic_Ipfs_Storage_Abi.json'
import { sepolia } from 'wagmi/chains'
import { ethers } from "ethers";
import { useAccount } from 'wagmi';

// styles
const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.grey[50],
    marginTop: '16px',
    marginBottom: '16px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '200px',
        height: '200px',
        border: '19px solid ',
        borderColor: theme.palette.warning.main,
        borderRadius: '50%',
        top: '65px',
        right: '-150px'
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '200px',
        height: '200px',
        border: '3px solid ',
        borderColor: theme.palette.warning.main,
        borderRadius: '50%',
        top: '145px',
        right: '-70px'
    }
}));

// ==============================|| PROFILE MENU - UPGRADE PLAN CARD ||============================== //

const UpgradePlanCard = () => {

    const theme = useTheme();

    // fetch the address of the current wallet 
    const { address, isConnected } = useAccount();

    // writeing to smart contract to upgrade to premium  user
    const { config } = usePrepareContractWrite({
        address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
        abi: _Quic_Ipfs_Storage_Abi,
        functionName: 'startPremiumTier',
        overrides: {
            from: address,
            value: ethers.utils.parseEther('0.01'),
        },
        chainId: sepolia.id,
        enabled: true // dafault true amd will be auto running 
    })

    // create a write object for smart contract
    const { write } = useContractWrite(config);

    return (
        <CardStyle>
            <CardContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h4">Upgrade your plan</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" color="grey.900" sx={{ opacity: 0.6 }}>
                            70% discount for 1 years <br />
                            subscriptions.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row">
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    sx={{ boxShadow: 'none' }}
                                    onClick={() => write?.()}
                                >
                                    Go Premium
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </CardStyle>
    )
}

export default UpgradePlanCard;
