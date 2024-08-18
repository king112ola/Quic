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
    title: 'Quic Tools',
    type: 'group',
    children: [
        {
            id: 'util-INTAI',
            title: 'AI System',
            type: 'item',
            url: '/utils/util-INTAI',
            icon: icons.IconTypography,
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
            id: 'util-BlockchainAlbum',
            title: 'Blockchain Album',
            type: 'item',
            url: '/utils/util-BlockchainAlbum',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'util-BlockchainPool',
            title: 'Blockchain Pool',
            type: 'item',
            url: '/utils/util-BlockchainPool',
            icon: icons.IconBuildingCarousel,
            breadcrumbs: false
        }

    ]
};

export default utilities;
