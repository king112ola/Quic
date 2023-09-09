// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */


    <svg className='logo_svg' viewBox="0 0 60.43135999999998 172.5881311809759">
      <g>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0" y="0" viewBox="0 9.786 100.00034525290006 80.42699999999999" enableBackground="new 0 0 100 100" xmlSpace="preserve" width="244.43135999999998" height="196.5881311809759" data-fill-palette-color="accent" id="icon-0">
          <path d="M49.942 52.994c13.552-0.488 27.103-0.977 40.653-1.465-2.527-4.177-3.159-7.831-7.989-8.461-7.229-0.94-14.458-1.883-21.688-2.826-14.023-1.827-28.05-3.654-42.075-5.48C20.101 36.792 39.724 53.361 49.942 52.994z" fill="#6936f5" data-fill-palette-color="accent"></path>
          <path d="M0 9.786c4.391 7.257 26.615 23.072 32.953 23.886 17.33 2.231 34.657 4.46 51.986 6.688-3.393-5.607-4.18-9.35-10.312-10.959-8.904-2.341-17.812-4.683-26.717-7.023C31.94 18.182 15.97 13.984 0 9.786z" fill="#6936f5" data-fill-palette-color="accent"></path>
          <path d="M63.108 66.207c10.413-2.219 20.826-4.439 31.241-6.66-2.028-3.346-2.034-5.359-5.827-5.189-6.158 0.273-12.314 0.549-18.471 0.822-11.343 0.506-22.686 1.014-34.028 1.518C37.298 58.064 54.94 67.947 63.108 66.207z" fill="#6936f5" data-fill-palette-color="accent"></path>
          <path d="M87.682 90.213c5.725-3.719 7.262-7.721 10.519-13.807 3.651-6.824 1.257-7.844-2.821-14.596-0.417-0.688-5.842 0.232-6.453 0.904-0.745 0.818-0.248 5.455-0.294 6.496C88.315 76.211 87.998 83.213 87.682 90.213z" fill="#6936f5" data-fill-palette-color="accent"></path>
          <path d="M86.35 63.447c-3.795 0.809-8.604 0.191-9.572 4.229-1.373 5.736-2.746 11.475-4.12 17.211C81.904 82.678 86.028 71.582 86.35 63.447z" fill="#6936f5" data-fill-palette-color="accent"></path>
          <path d="M74.666 66.121c-9.148 1.953-8.956 4.611-12.879 13.18C68.007 78.711 73.811 71.941 74.666 66.121z" fill="#6936f5" data-fill-palette-color="accent"></path>
        </svg>
      </g>
    </svg>
  );
};

export default Logo;
