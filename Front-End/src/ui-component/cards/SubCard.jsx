import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// ==============================|| CUSTOM SUB CARD ||============================== //

// hexToRGB Function
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

hexToRGB('#FF0000', 0.5);

const SubCard = forwardRef(({ children, content, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others }, ref) => {
    const theme = useTheme();

    return (
        <Card
            ref={ref}
            sx={{
                border: '1px solid',
                borderColor: theme.palette.primary.light,
                ':hover': {
                    boxShadow: `0 2px 14px 0 ${hexToRGB(theme.palette.darkTheme?theme.palette.grey[100]:theme.palette.grey[200])}`
                },
                ...sx
            }}
            {...others}
        >
            {/* card header and action */}
            {!darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}
            {darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title}</Typography>} action={secondary} />}

            {/* content & header divider */}
            {title && (
                <Divider
                    sx={{
                        opacity: 1,
                        borderColor: theme.palette.primary.light
                    }}
                />
            )}

            {/* card content */}
            {content && (
                <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
                    {children}
                </CardContent>
            )}
            {!content && children}
        </Card>
    );
});

SubCard.propTypes = {
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    sx: PropTypes.object,
    contentSX: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

SubCard.defaultProps = {
    content: true
};

export default SubCard;
