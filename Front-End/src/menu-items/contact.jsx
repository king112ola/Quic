// assets
import { IconMail,IconBrandDiscordFilled   } from '@tabler/icons-react';

// constant
const icons = {
    IconMail,
    IconBrandDiscordFilled 
};

// ==============================|| CONTACT MENU ITEMS ||============================== //

const contact = {
    id: 'contact',
    title: 'Contact',
    type: 'group',
    children: [
        {
            id: 'contact-discord',
            title: 'Join Discord Server',
            type: 'item',
            url: 'https://discord.com/invite/g395Kas5TV',
            icon: icons.IconBrandDiscordFilled ,
            breadcrumbs: false,
            target: '_blank'
        },
        {
            id: 'contact-Mail',
            title: 'Quic.ai.team@gmail.com',
            type: 'item',
            url: 'mailto:Quic.ai.team@gmail.com',
            icon: icons.IconMail,
            breadcrumbs: false,
        },

    ]
};

export default contact;
