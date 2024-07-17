import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// project imports
import SubCard from '~/ui-component/cards/SubCard';
import MuiTypography from '@mui/material/Typography';

// import react moralis for metamask connect and also wagmi and ether js 
import { useMoralis } from 'react-moralis';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import _Quic_Ipfs_Storage_Abi from '%/abi/_Quic_Ipfs_Storage_Abi.json'
import { sepolia } from 'wagmi/chains'
import { useAccount } from 'wagmi';
import { ethers } from "ethers";


// import for redux to select messages
import { useSelector } from 'react-redux';


// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '~/ui-component/cards/MainCard';
import Transitions from '../../../../ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons-react';

// notification status options
const status = [
    {
        value: 'all',
        label: 'All Notification'
    },
    {
        value: 'new',
        label: 'New'
    },
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    // Load message/ Init message from Redux store
    const messages = useSelector((state) => state.messagesFromUserAndServer.messages)

    // Find the last Id from the message list
    const lastMessageId = useSelector((state) => state.messagesFromUserAndServer.lastMessageId)

    // Check the screen size
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    // set subscript to the parse server only once
    const [subscripted, setSubscripted] = useState(false);

    // set the hashof the ipfs 
    const [ipfsHash, setIpfsHash] = useState("")

    // set the hashof the ipfs 
    const [promptForIpfsHash, setPromptForIpfsHash] = useState("")

    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    //use moralis for testing and init the state for wagmi to interact with smart contract
    const { Moralis } = useMoralis();

    useEffect(() => {

        if (messages !== undefined && lastMessageId !== 0)

            switch (messages[lastMessageId - 1].contentType) {
                case "image":
                    setIpfsHash(messages[lastMessageId - 1].imageUrlOnIpfs)
                    setPromptForIpfsHash(messages[lastMessageId - 1].prompt)
                    break;
                case "audio":
                    setIpfsHash(messages[lastMessageId - 1].audioOnIpfs)
                    setPromptForIpfsHash(messages[lastMessageId - 1].prompt)
                    break;

                default:
                    break;
            }

        // if (messages[lastMessageId - 1].contentType == "image")
        //    { 

        // messages[lastMessageId - 1].messageBody.forEach(element => {

        //     switch (Object.keys(element)[0]) {
        //         case 'imageUrlOnIpfs':
        //             setIpfsHash(element.imageUrlOnIpfs)
        //             break;
        //         case 'promptOnIpfs':
        //             // element.prompt should be the one stored on the ipfs, but i think we should use the redux record for simplicity 
        //             setPromptForIpfsHash(messages[lastMessageId - 1].prompt)
        //         default:
        //             break;
        //     }
        //     //.split('ipfs/')[1]
        // })}
        // setIpfsHash
        // if (messages[lastMessageId - 1].contentType == "image")
        //     

    }, [messages])
    // 

    // 
    // Start preparing the contract for wagmi

    const { address, isConnected } = useAccount();

    const { config } = usePrepareContractWrite({
        address: import.meta.env.VITE_QUIC_IPFS_HASH_SMARTCONTRACT,
        abi: _Quic_Ipfs_Storage_Abi,
        functionName: 'createIpfsHashOwner(string,string)',
        args: [ipfsHash, promptForIpfsHash],
        overrides: {
            from: address,
            value: ethers.utils.parseEther('0.01'),
        },
        chainId: sepolia.id,
        enabled: true // dafault true amd will be auto running 
    })

    // create a write object for smart contract
    const { write } = useContractWrite(config);


    var subscriptiopn
    var q
    // testing function 
    async function addFood() {
        const Food = Moralis.Object.extend("Food");
        q = new Moralis.Query("Food")

        q.equalTo("testRow3", "data1")

        if (!subscripted) {

            subscriptiopn = await q.subscribe();

            subscriptiopn.on("open", () => {
                

            })
            subscriptiopn.on("create", (obj) => {
                
                setTestLiveQuery(obj.id);
            })
            subscriptiopn.on("update", (obj) => {
                
                setTestLiveQuery(obj.id);
            })

            subscriptiopn.on("enter", (obj) => {
                
                setTestLiveQuery(obj.id);

            })

            subscriptiopn.on("leave", (obj) => {
                
                setTestLiveQuery(obj.id);

            })

            setSubscripted(true);
        }
        // q.find().then(obj=>{
        //     
        // })

        const foodd = new Food();

        foodd.set('testRow3', "data1")

        await foodd.save();

    }

    const [testLiveQuery, setTestLiveQuery] = useState();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event) => {
        if (event?.target.value) setValue(event?.target.value);
    };


    return (
        <>
            <MuiTypography variant='h4'>{testLiveQuery}</MuiTypography>
            {/* <SubCard
                // onClick={addFood}
                className='connectionButtonConatiner' 
                contentSX={{ p: 0, pl: isSmallScreen ? '25%' : '1rem' }}
                sx={{
                    display: 'block',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    cursor: 'pointer',
                    // borderRadius: '12px',
                    // width: { xs: '23vw', md: '3.5vw' },
                    // height: '5vh',
                    // marginRight: '1%',
                    // marginLeft: { xs: '4vw', md: '4.5vw' },
                }}
                >
                <MuiTypography style={{ alignSelf: 'center' }} variant={isSmallScreen ? 'h6' : 'h4'} >IPFS</MuiTypography>
            </SubCard> */}
            <SubCard
                onClick={() => write?.()}
                className='connectionButtonConatiner'
                contentSX={{ p: 0, pl: isSmallScreen ? '0%' : '0rem' }}
                sx={{
                    display: 'grid',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    width: { xs: '25vw', md: '4.4vw' },
                    height: { xs: '3rem', md: '4rem' },
                    marginRight: '2%'
                }}>
                <MuiTypography variant='h4' >Upload</MuiTypography>
            </SubCard>

            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.grey[100],
                            color: theme.palette.grey[900],
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <IconBell className='icon-tada' stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                <Grid item>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="subtitle1">All Notification</Typography>
                                                        <Chip
                                                            size="small"
                                                            label="01"
                                                            sx={{
                                                                color: theme.palette.background.default,
                                                                bgcolor: theme.palette.warning.dark
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Typography component={Link} to="#" variant="subtitle2" color="primary">
                                                        Mark as all read
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Box sx={{ px: 2, pt: 0.25 }}>
                                                            <TextField
                                                                id="outlined-select-currency-native"
                                                                select
                                                                fullWidth
                                                                value={value}
                                                                onChange={handleChange}
                                                                SelectProps={{
                                                                    native: true
                                                                }}
                                                            >
                                                                {status.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </TextField>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} p={0}>
                                                        <Divider sx={{ my: 0 }} />
                                                    </Grid>
                                                </Grid>
                                                <NotificationList />
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button size="small" disableElevation>
                                            View All
                                        </Button>
                                    </CardActions>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
