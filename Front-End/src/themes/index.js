import { createTheme } from '@mui/material/styles';

// assets
import colors_dark from '../assets/scss/_themes-vars-darkTheme.module.scss';
import colors_white from '../assets/scss/_themes-vars-whiteTheme.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    let color = colors_dark;

    if (customization.darkTheme === false)
        color = colors_white;

    const themeOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.grey200,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
        customization, // for later use
        darkTheme:customization.darkTheme 
        
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
