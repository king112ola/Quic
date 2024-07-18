// assets
import { IconBrandChrome, IconHelp , IconMail } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconMail };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'Quic.ai.team@gmail.com',
    type: 'item',
    children: [
        {
            id: 'mail',
            title: 'Quic.ai.team@gmail.com',
            type: 'item',
            url: 'Quic.ai.team@gmail.com',
            icon: icons.IconMail,
            breadcrumbs: false
        },
      
    ]
};

export default other;
