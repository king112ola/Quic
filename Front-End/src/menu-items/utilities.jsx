// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconBrandLoom, IconBrand4chan,IconBuildingCarousel  } from '@tabler/icons-react';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBrandLoom,
    IconBrand4chan,
    IconBuildingCarousel
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Ai Engines Utilities',
    type: 'group',
    children: [
        {
            id: 'util-INTAI',
            title: 'INT Ai Engines-1',
            type: 'item',
            url: '/utils/util-INTAI',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'util-BlockchainAlbum',
            title: 'Blockchain Album',
            type: 'item',
            url: '/utils/util-BlockchainAlbum',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'util-MyMessages',
            title: 'Message Records',
            type: 'item',
            url: '/utils/util-MyMessages',
            icon: icons.IconBrandLoom,
            breadcrumbs: false
        },
        {
            id: 'util-BlockchainPool',
            title: 'Blockchain Pool',
            type: 'item',
            url: '/utils/util-BlockchainPool',
            icon: icons.IconBuildingCarousel,
            breadcrumbs: false
        },

        {
            id: 'AiList',
            title: 'List of Ai Engines',
            type: 'collapse',
            icon: icons.IconWindmill,
            children: [
                {
                    id: 'List-1',
                    title: 'Valid Ai Api Call List-1',
                    type: 'item',
                    url: '/list/AiList1',
                    breadcrumbs: false
                },
                {
                    id: 'List-2',
                    title: 'Valid Ai Api Call List-2',
                    type: 'item',
                    url: '/icons/AiList2',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
