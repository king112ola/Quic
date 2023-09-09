import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import Moralis from 'moralis-v1';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

// import authentication for web3 and moralis 
import { useMoralis } from 'react-moralis';

// import wagmic for login to metamask
import { useConnect, useAccount } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level }) => {

    const { connect,isLoading } = useConnect({
        connector: new MetaMaskConnector()
    })
    const { address, isConnected } = useAccount();

    /**
     * Creating a moralis authenticate function for the server auth
     * 
     */

    const { authenticate, enableWeb3, logout, user,isWeb3Enabled } = useMoralis();

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    /**
     * 1) Connect to a Evm
     * 2) Request message to sign using the Moralis Auth Api of moralis (handled on server)
     * 3) Login via parse using the signed message (verification handled on server via Moralis Auth Api)
     */
    const handleAuth = async (provider) => { // Provider is now using metamask
        try {
            setIsAuthenticating(true);

            const { account, chainId } = Moralis;

            if (!account) {
                throw new Error('Connecting to chain failed, as no connected account was found');
            }
            if (!chainId) {
                throw new Error('Connecting to chain failed, as no connected chain was found');
            }

            // Get message to sign from the auth api
            const { message } = await Moralis.Cloud.run('requestMessage', {
                address: account,
                chain: parseInt(chainId, 16),
                networkType: 'evm',
            });

            // Authenticate and login via parse
            await authenticate({
                signingMessage: message,
                throwOnError: true,
            });
        } catch (error) {
            
        } finally {
            setIsAuthenticating(false);
        }
    };
    /**
     * End Of creating this moralis server function handler
     */

    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    // auto connect to metamsk wallet, due to wagmi cannot notice the chage on the morealis enable web3, we made use of the isWeb3Enabled and useeffect
    useEffect(() => { if (!user) enableWeb3({ provider: 'metamask' }) }, [])
    useEffect(() => { if (isWeb3Enabled) connect() }, [isWeb3Enabled])


    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? menu.id : null);
    };

    // menu collapse & item
    const menus = menu.children?.map((item) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1} />;
            case 'item':
                return <NavItem key={item.id} item={item} level={level + 1} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const Icon = menu.icon;
    const menuIcon = menu.icon ? (
        <Icon strokeWidth={1.5} size="1.3rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: selected === menu.id ? 8 : 6,
                height: selected === menu.id ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    return (
        <>
            <ListItemButton
                sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                    py: level > 1 ? 1 : 1.25,
                    pl: `${level * 24}px`
                }}
                selected={selected === menu.id}
                onClick={handleClick}
            >
                <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant={selected === menu.id ? 'h5' : 'body1'} color="inherit" sx={{ my: 'auto' }}>
                            {menu.title}
                        </Typography>
                    }
                    secondary={
                        menu.caption && (
                            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                {menu.caption}
                            </Typography>
                        )
                    }
                />
                {open ? (
                    <IconChevronUp stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                ) : (
                    <IconChevronDown stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={{
                        position: 'relative',
                        '&:after': {
                            content: "''",
                            position: 'absolute',
                            left: '32px',
                            top: 0,
                            height: '100%',
                            width: '1px',
                            opacity: 1,
                            background: theme.palette.primary.light
                        }
                    }}
                >
                    {   // handle metamask and web3 login function 
                        menu.id === 'authentication' && menus.map((item, index) => (

                            <div key={'auth-' + index} onClick={() => {
                                if (item.key == 'metamaskConnect')
                                    connect()
                                // enableWeb3({ provider: 'metamask' })
                                if (item.key == 'authenticate')
                                    handleAuth('metamask')
                                if (item.key == 'disconnectFromWeb3')
                                    logout()
                            }}>

                                {/* {item&&user!==undefined} */}
                                {(user && isConnected) ? (item.key == 'disconnectFromWeb3' &&
                                    <div>
                                        <Typography variant="h6" color="error" align={"left"} sx={{ ml: 8, pt: 2 }}>
                                            Metamask:{address ? (address.substr(0, 10) + '...') : "Signed Out."}
                                        </Typography>
                                        {item}
                                    </div>) :
                                    (isConnected ?
                                        (item.key == 'authenticate' &&
                                            <div>
                                                <Typography variant="h6" color="error" align={"left"} sx={{ ml: 8, pt: 2 }}>
                                                    Metamask:{address ? (address.substr(0, 10) + '...') : "Not Authenticated."}
                                                </Typography>
                                                {item}
                                            </div>) : item)}

                                {item.key == 'disconnectFromWeb3' &&
                                    <Typography variant="h6" color="error" align={user ? "left" : "center"} sx={user ? { ml: 8.2, pr: 0 } : { pr: 4 }}>
                                        {user ? (user.getUsername() ? (user.getUsername().substr(0, 17) + '...') : "Not Authenticated.") : 'Logged Out'}
                                    </Typography>
                                }

                            </div>
                        ))}
                    {menu.id === 'AiList' && menus}
                </List>
            </Collapse>
        </>
    );
};

NavCollapse.propTypes = {
    menu: PropTypes.object,
    level: PropTypes.number
};

export default NavCollapse;
