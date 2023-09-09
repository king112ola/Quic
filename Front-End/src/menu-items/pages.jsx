// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'authenticationPage',
    title: 'Connecting to Web3',
    caption: 'Under Quic!',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'metamaskConnect',
                    title: 'Metamask Connect',
                    type: 'item',
                    target: false
                },
                {
                    id: 'authenticate',
                    title: 'Authenticate',
                    type: 'item',
                    target: false
                },
                {
                    id: 'disconnectFromWeb3',
                    title: 'Disconnect',
                    type: 'item',
                    target: false
                },
               
               
            ]
        }
    ]
};

export default pages;
