// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'ChatGpt-Page',
            title: 'Chatgpt',
            type: 'item',
            url: '/ChatGpt-Page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
      
    ]
};

export default other;
