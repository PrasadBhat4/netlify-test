'use client';

import { startTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';

type Props = {
  items: Array<{ value: string; label: string }>;
};

const LocaleIcon = () => (
  <svg
    className='invert dark:invert-0'
    width='24'
    height='25'
    viewBox='0 0 24 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.29289 8.12834C4.68342 7.73782 5.31658 7.73782 5.70711 8.12834L11.7071 14.1283C12.0976 14.5189 12.0976 15.152 11.7071 15.5426C11.3166 15.9331 10.6834 15.9331 10.2929 15.5426L4.29289 9.54256C3.90237 9.15203 3.90237 8.51887 4.29289 8.12834Z'
      fill='white'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.5547 5.0034C13.0142 5.30975 13.1384 5.93062 12.8321 6.39015L10.8321 9.39015C10.7955 9.44494 10.7537 9.49599 10.7071 9.54256L4.70711 15.5426C4.31658 15.9331 3.68342 15.9331 3.29289 15.5426C2.90237 15.152 2.90237 14.5189 3.29289 14.1283L9.22288 8.19836L11.1679 5.28075C11.4743 4.82122 12.0952 4.69705 12.5547 5.0034Z'
      fill='white'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1 5.83545C1 5.28316 1.44772 4.83545 2 4.83545H14C14.5523 4.83545 15 5.28316 15 5.83545C15 6.38773 14.5523 6.83545 14 6.83545H2C1.44772 6.83545 1 6.38773 1 5.83545Z'
      fill='white'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M6 2.83545C6 2.28316 6.44772 1.83545 7 1.83545H8C8.55228 1.83545 9 2.28316 9 2.83545C9 3.38773 8.55228 3.83545 8 3.83545H7C6.44772 3.83545 6 3.38773 6 2.83545Z'
      fill='white'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17 11.8354C17.3788 11.8354 17.725 12.0495 17.8944 12.3882L22.8944 22.3882C23.1414 22.8822 22.9412 23.4829 22.4472 23.7299C21.9532 23.9769 21.3526 23.7766 21.1056 23.2827L17 15.0715L12.8944 23.2827C12.6474 23.7766 12.0468 23.9769 11.5528 23.7299C11.0588 23.4829 10.8586 22.8822 11.1056 22.3882L16.1056 12.3882C16.275 12.0495 16.6212 11.8354 17 11.8354Z'
      fill='white'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M13 18.8354C13 18.2832 13.4477 17.8354 14 17.8354H20C20.5523 17.8354 21 18.2832 21 18.8354C21 19.3877 20.5523 19.8354 20 19.8354H14C13.4477 19.8354 13 19.3877 13 18.8354Z'
      fill='white'
    />
  </svg>
);

export default function LocaleSwitcherSelect({ items }: Props) {
  const router = useRouter();
  const pathnameWithoutLocale = usePathname();
  const currentLocale = useLocale();

  function onChange(newLocaleValue: string) {
    if (newLocaleValue === currentLocale) return;

    const newLocale = newLocaleValue as Locale;
    setUserLocale(newLocale);

    startTransition(() => {
      router.push(pathnameWithoutLocale, { locale: newLocale, scroll: false });
    });
  }

  return (
    <div className='relative flex gap-4 '>
      <LocaleIcon />
      {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor='locale-select' className='sr-only'>
        Select language
      </label>
      <select
        id='locale-select'
        value={currentLocale}
        onChange={e => onChange(e.target.value)}
        className='text-neutral-900 dark:text-neutral-0 dark:bg-neutral-900 bg-cream-300'>
        {items.map(item => (
          <option key={item.value} value={item.value} className='dark:text-neutral-0 text-neutral-900'>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
