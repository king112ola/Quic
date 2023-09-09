// material-ui
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

// styles
const LoaderWrapper =  styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%',
    backgroundColor: "green",
});

const LinearProgressSelfDefined = styled(LinearProgress)(({ theme }) => ({
    backgroundColor: "green",
    background:theme.palette.grey[100],
   

    // [`&.${linearProgressClasses.colorPrimary}`]: {
    //     background: theme.palette.grey[50],
    // },
    // [`& .${linearProgressClasses.bar}`]: {
    //     borderRadius: 5,
    //     background: theme.palette.grey[900],
    // }
})); 

// ==============================|| LOADER ||============================== //
const Loader = () => (
    <LoaderWrapper>
        <LinearProgressSelfDefined  />
    </LoaderWrapper>
);

export default Loader;
