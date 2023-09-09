import { lazy } from 'react';

// project imports
import MainLayout from '~/layout/MainLayout/index';
import Loadable from '~/ui-component/Loadable';

// dashboard routing
import DashboardDefault from '~/views/dashboard/Default/index'

// for blockchain album for the user
import BlockchainAlbum from '~/views/BlockchainAlbum/index'

// the blockchain pool that everyone can share their contents
import BlockchainPool from '~/views/BlockchainPool/index'

// loading ChatGpt Interface
import ChatGptPage from '~/views/chatgpt/index'

// import personal record page
import MyMessages from '~/views/MyMessages/index'

// import landing page



// Loading with susped, but not working on SSR

// // dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('~//views/dashboard/Default/index')));

// // utilities routing
// const BlockchainAlbum = Loadable(lazy(() => import('~/views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('~/views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('~/views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('~/views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('~/views/utilities/TablerIcons')));

// // sample page routing
// const SamplePage = Loadable(lazy(() => import('~/views/sample-page/index')));

// // loading ChatGpt Interface
// const ChatGptPage = Loadable(lazy(() => import('~/views/chatgpt/index')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <ChatGptPage />
        },
        {
            path: '/quicai',
            element: <ChatGptPage />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-INTAI',
                    element: <ChatGptPage />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-BlockchainAlbum',
                    element: <BlockchainAlbum />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-MyMessages',
                    element: <MyMessages />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-BlockchainPool',
                    element: <BlockchainPool />
                }
            ]
        },

    ]
};

export default MainRoutes;
