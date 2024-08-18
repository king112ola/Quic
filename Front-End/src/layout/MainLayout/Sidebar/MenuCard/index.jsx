import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    linearProgressClasses
} from '@mui/material';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        background: theme.palette.grey[50],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        background: theme.palette.grey[900],
    }
}));

const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.primary.light,
    marginBottom: '22px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '157px',
        height: '157px',
        background: theme.palette.grey[100],
        borderRadius: '50%',
        top: '-105px',
        right: '-96px'
    }
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
    const theme = useTheme();

    return (
        <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
            <Grid item>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" sx={{ color: theme.palette.grey[300] }}>
                            Progress
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <BorderLinearProgress variant="determinate" value={value} {...others} />
            </Grid>
        </Grid>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// ==============================|| SIDEBAR MENU Card ||============================== //

const MenuCard = () => {
    const theme = useTheme();

    return (
        <CardStyle>
            <CardContent sx={{

                background: theme.palette.grey[50],
                color: theme.palette.grey[900],

                '&:last-child': { padding: 2 },

                '&:hover': {
                    Avatar: {
                        borderColor: theme.palette.primary.main,
                        background: theme.palette.grey[100],
                        color: theme.palette.grey[900],
                    },
                    borderColor: theme.palette.primary.main,
                    background: theme.palette.grey[100],
                    color: theme.palette.grey[900],
                    '& svg': {
                        stroke: theme.palette.grey[50],
                    },
                    '& .barClass': {
                        background: theme.palette.grey[100],
                    },

                },
            }}>
                <List sx={{ p: 0, m: 0 }}>

                    <TableChartOutlinedIcon variant="rounded"
                        sx={{
                            m: 0,
                            mt: 0,
                            py: 1.5,
                            ...theme.typography.commonAvatar,
                            ...theme.typography.largeAvatar,
                            color: theme.palette.grey[400],
                            border: 'none',
                            borderColor: theme.palette.primary.main,
                            marginRight: '12px',

                        }} fontSize="inherit" />
                    <ListItemText
                        sx={{ mt: 0 }}
                        primary={
                            <Typography variant="subtitle1" sx={{ color: theme.palette.grey[400], }}>
                                Get Extra Space
                            </Typography>
                        }
                        secondary={<Typography variant="caption" sx={{ color: theme.palette.grey[300], }}> 28/23 GB</Typography>}
                    />
                </List>
                <LinearProgressWithLabel className='barClass' value={80} />
            </CardContent>
        </CardStyle>
    );
};

export default MenuCard;
