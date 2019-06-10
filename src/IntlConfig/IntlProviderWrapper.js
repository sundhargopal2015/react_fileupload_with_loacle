import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';
import enTranslation from './translatios/enTranslatios.json';
import jaTranslation from './translatios/jaTranslatios.json';

addLocaleData([...en, ...ja]);
const Context = React.createContext();

if (!window.Intl) {
  (async () => {
    try {
      await import('react-intl');
      await import('react-intl/locale-data/en.js');
      await import('react-intl/locale-data/ja.js');
    } catch (error) {
      console.log(error);
    }
  })();
}

class IntlProviderWrapper extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      locale: 'en',
      messages: enTranslation,
      switchToEnglish: this.switchToEnglish,
      switchToJapan: this.switchToJapan
    };
  }
  switchToEnglish = () =>
    this.setState({ locale: 'en', messages: enTranslation });

  switchToJapan = () =>
    this.setState({ locale: 'ja', messages: jaTranslation });

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Context.Provider value={this.state}>
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale='en'
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

export { IntlProviderWrapper, Context as IntlContext };
