// @ts-ignore
import ParseServer from 'parse-server';
import config from './config';
import MoralisEthAdapter from './auth/MoralisEthAdapter';

export const parseServer = new ParseServer({
 
  databaseURI: config.DATABASE_URI,
  cloud: config.CLOUD_PATH,
  serverURL: config.SERVER_URL,
  publicServerURL: config.SERVER_URL,
  appId: config.APPLICATION_ID,
  masterKey: config.MASTER_KEY,
  auth: {
    moralisEth: {
      module: MoralisEthAdapter,
    },
  },
  liveQuery: {
    classNames: ["Food","_User","MessagesOnIPFS"] // List of classes to support for query subscriptions
  },
});
