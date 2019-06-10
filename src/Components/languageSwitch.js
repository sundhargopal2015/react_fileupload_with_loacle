import React from 'react';
import { IntlContext } from '../IntlConfig/IntlProviderWrapper';

const LanguageSwitch = () => {
  const { switchToEnglish, switchToJapan } = React.useContext(IntlContext);
  return (
    <>
      <button onClick={switchToEnglish}>English</button>
      <button onClick={switchToJapan}>Japanese</button>
    </>
  );
};

export default LanguageSwitch;
