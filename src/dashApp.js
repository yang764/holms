import React from 'react';
import { Provider } from 'react-redux';
import getStore from './redux/store';
import PublicRoutes from './router';
import { ThemeProvider } from 'styled-components';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import themes from './config/themes';
import AppLocale from './languageProvider';
import config, {
  getCurrentLanguage
} from './containers/LanguageSwitcher/config';
import { themeConfig } from './config';
import DashAppHolder from './dashAppStyle';
// import 'antd/dist/antd.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';
const currentAppLocale =
  AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale];

const { store, history, persistor } = getStore();
const DashApp = () => (
  <LocaleProvider locale={currentAppLocale.antd}>
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <DashAppHolder>
          <Provider store={store}>
	          <PersistGate loading={<Spin size="large" />} persistor={persistor}>
	            <PublicRoutes history={history} />
	          </PersistGate>
          </Provider>
        </DashAppHolder>
      </ThemeProvider>
    </IntlProvider>
  </LocaleProvider>
);

export default DashApp;
export { AppLocale, persistor, store };
