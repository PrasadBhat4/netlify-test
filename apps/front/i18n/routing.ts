import { defineRouting } from 'next-intl/routing';
import { locales as supportedLocales, defaultLocale as fallbackLocale } from './config';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: supportedLocales,
  defaultLocale: fallbackLocale,
  localeDetection: true,
  localePrefix: 'as-needed',
});
