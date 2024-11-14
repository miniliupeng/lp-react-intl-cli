import { createIntl, createIntlCache } from 'react-intl';
import zhCN from './zh.json';
import enUS from './en.json';

const cache = createIntlCache();

const _messages: Record<string, any> = {
  en: enUS,
  zh: zhCN
};

// const locale = 'zh';
const locale = 'en';

const intl = createIntl(
  {
    locale: locale,
    messages: _messages[locale]
  },
  cache
);
export default intl;
      