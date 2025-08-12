'use client';

import universalLanguageDetect from '@unly/universal-language-detector';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import Cookies from 'universal-cookie';

const LocaleDetector = (): any => {
  const cookies = useMemo(() => new Cookies(), []);
  const router = useRouter();

  useEffect(() => {
    try {
      if (!cookies.get('NEXT_LOCALE')) {
        const lang = universalLanguageDetect({
          supportedLanguages: ['en', 'ja'],
          fallbackLanguage: 'en',
        });
        cookies.set('NEXT_LOCALE', lang, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 365 * 24 * 60 * 60, // 1 year
        });
        router.refresh();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to detect or set locale:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LocaleDetector;
