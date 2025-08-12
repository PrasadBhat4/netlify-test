'use client';

import { useEffect, useState } from 'react';
import { THEME_MODE } from '@/app/lib/constants';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

const DarkModeToggler = ({ className = '' }: Props) => {
  const [theme, setTheme] = useState(THEME_MODE.SYSTEM);
  const [isSystem, setIsSystem] = useState(true);
  const [mounted, setMounted] = useState(false);

  const getThemeFromStorage = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('coderabbit-theme');
    }
    return null;
  };

  const setThemeInStorage = (value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('coderabbit-theme', value);
    }
  };

  const onSelectTheme = (selectedTheme: string) => {
    if (selectedTheme === THEME_MODE.SYSTEM) {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkScheme ? THEME_MODE.DARK : THEME_MODE.LIGHT);
      localStorage.removeItem('coderabbit-theme');
      setIsSystem(true);
    } else {
      setTheme(selectedTheme);
      setThemeInStorage(selectedTheme);
      setIsSystem(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    const storedTheme = getThemeFromStorage();

    if (storedTheme !== null) {
      setTheme(storedTheme);
      setIsSystem(false);
      document.documentElement.classList.remove(THEME_MODE.LIGHT);
      document.documentElement.classList.remove(THEME_MODE.DARK);
      document.documentElement.classList.add(storedTheme);
      return;
    }

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsSystem(true);

    if (storedTheme === null && prefersDarkScheme) {
      setTheme(THEME_MODE.DARK);
      document.documentElement.classList.remove(THEME_MODE.LIGHT);
      document.documentElement.classList.add(THEME_MODE.DARK);
    }
    if (storedTheme === null && !prefersDarkScheme) {
      setTheme(THEME_MODE.LIGHT);
      document.documentElement.classList.remove(THEME_MODE.DARK);
      document.documentElement.classList.add(THEME_MODE.LIGHT);
    }
  }, [theme]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={cn('flex items-center p-2 w-fit bg-neutral-1000 rounded-full', className)}>
      <button
        className={cn(
          'flex items-center justify-center w-12 h-8 rounded-full cursor-pointer hover:bg-neutral-800',
          isSystem ? 'bg-neutral-800' : 'bg-transparent'
        )}
        onClick={() => onSelectTheme(THEME_MODE.SYSTEM)}
        type='button'
        aria-label='System theme'>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`w-6 h-6 ${isSystem ? 'text-neutral-0' : 'text-neutral-400'}`}>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5 5.71436C4.44772 5.71436 4 6.16207 4 6.71436V14.7144C4 15.2666 4.44772 15.7144 5 15.7144H19C19.5523 15.7144 20 15.2666 20 14.7144V6.71436C20 6.16207 19.5523 5.71436 19 5.71436H5ZM2 6.71436C2 5.0575 3.34315 3.71436 5 3.71436H19C20.6569 3.71436 22 5.0575 22 6.71436V14.7144C22 16.3712 20.6569 17.7144 19 17.7144H5C3.34315 17.7144 2 16.3712 2 14.7144V6.71436Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1 20.7144C1 20.1621 1.44772 19.7144 2 19.7144H22C22.5523 19.7144 23 20.1621 23 20.7144C23 21.2666 22.5523 21.7144 22 21.7144H2C1.44772 21.7144 1 21.2666 1 20.7144Z'
            fill='currentColor'
          />
        </svg>
      </button>
      <button
        className={cn(
          'flex items-center justify-center w-12 h-8 rounded-full cursor-pointer hover:bg-neutral-800',
          theme === THEME_MODE.LIGHT && !isSystem ? 'bg-neutral-800' : 'bg-transparent'
        )}
        onClick={() => onSelectTheme(THEME_MODE.LIGHT)}
        type='button'
        aria-label='Light theme'>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`w-6 h-6 ${theme === THEME_MODE.LIGHT && !isSystem ? 'text-neutral-0' : 'text-neutral-400'}`}>
          <path
            d='M12 16.7144C14.2091 16.7144 16 14.9235 16 12.7144C16 10.5052 14.2091 8.71436 12 8.71436C9.79086 8.71436 8 10.5052 8 12.7144C8 14.9235 9.79086 16.7144 12 16.7144Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 2.71436V4.71436'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 20.7144V22.7144'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M4.92969 5.64453L6.33969 7.05453'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M17.6602 18.3745L19.0702 19.7845'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M2 12.7144H4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          <path d='M20 12.7144H22' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          <path
            d='M6.33969 18.3745L4.92969 19.7845'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M19.0702 5.64453L17.6602 7.05453'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <button
        className={cn(
          'flex items-center justify-center w-12 h-8 rounded-full cursor-pointer hover:bg-neutral-800',
          theme === THEME_MODE.DARK && !isSystem ? 'bg-neutral-800' : 'bg-transparent'
        )}
        onClick={() => onSelectTheme(THEME_MODE.DARK)}
        type='button'
        aria-label='Dark theme'>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`w-6 h-6 ${theme === THEME_MODE.DARK && !isSystem ? 'text-neutral-0' : 'text-neutral-400'}`}>
          <path
            d='M12 3.71436C10.8065 4.90783 10.136 6.52653 10.136 8.21436C10.136 9.90218 10.8065 11.5209 12 12.7144C13.1935 13.9078 14.8122 14.5783 16.5 14.5783C18.1878 14.5783 19.8065 13.9078 21 12.7144C21 14.4944 20.4722 16.2344 19.4832 17.7145C18.4943 19.1945 17.0887 20.3481 15.4442 21.0293C13.7996 21.7105 11.99 21.8887 10.2442 21.5414C8.49836 21.1942 6.89472 20.337 5.63604 19.0783C4.37737 17.8196 3.5202 16.216 3.17294 14.4702C2.82567 12.7243 3.0039 10.9147 3.68509 9.2702C4.36628 7.62567 5.51983 6.22006 6.99987 5.23113C8.47991 4.2422 10.22 3.71436 12 3.71436Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
};

export default DarkModeToggler;
