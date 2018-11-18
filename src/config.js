export default {
  apiUrl: 'http://yoursite.com/api/',
};
const siteConfig = {
  siteName: 'EALAS',
  siteIcon: 'ion-ios-bookmarks',
  footerText: 'A Project By Karan Grover',
};

const themeConfig = {
  topbar: 'theme6',
  sidebar: 'theme6',
  layout: 'themedefault',
  theme: 'themedefault',
};
const language = 'english';
const AlgoliaSearchConfig = {
  appId: '',
  apiKey: '',
};
const Auth0Config = {
  domain: '',
  clientID: '', //
  options: {
    auth: {
      autoParseHash: true,
      redirect: false,
    },
    languageDictionary: {
      title: 'EALAS',
      emailInputPlaceholder: 'sample@email.com',
      passwordInputPlaceholder: 'samplepassword',
    },
    icon: '',
    theme: {
      labeledSubmitButton: true,
      logo: 'https://s3.amazonaws.com/redqteam.com/logo/isomorphic.png',
      primaryColor: '#E14615',
      authButtons: {
        connectionName: {
          displayName: 'Log In',
          primaryColor: '#b7b7b7',
          foregroundColor: '#000000',
          icon: undefined,
        },
      },
    },
  },
};
const firebaseConfig = {
  apiKey: 'AIzaSyA62U5ch6ssQ2yHZuJp6KCS0LNUZsdsyp8',
  authDomain: 'ealas-kg.firebaseapp.com',
  databaseURL: 'https://ealas-kg.firebaseio.com',
  projectId: 'ealas-kg',
  storageBucket: 'ealas-kg.appspot.com',
  messagingSenderId: '545404754674',
};

const googleConfig = {
  apiKey: '', //
};
const mapboxConfig = {
  tileLayer: '',
  maxZoom: '',
  defaultZoom: '',
  center: [],
};
const youtubeSearchApi = '';
export {
  siteConfig,
  themeConfig,
  language,
  AlgoliaSearchConfig,
  Auth0Config,
  firebaseConfig,
  googleConfig,
  mapboxConfig,
  youtubeSearchApi,
};
