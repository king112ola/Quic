// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from '../../../../menu-items/index';

import { IconMail } from '@tabler/icons-react';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const navItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            case 'item':
                return (
                    <div
                    key={item.id}
                    onClick={(e) => {
                        e.preventDefault(); // Prevent the default link action
                        e.stopPropagation(); // Stop the event from bubbling up
                        window.location.href = `mailto:${item.email}`;
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <NavGroup key={item.id} item={item} />
                </div>

                );
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
