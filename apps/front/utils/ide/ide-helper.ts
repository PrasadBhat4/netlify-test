import { cache } from 'react';
import { uuidv7 } from 'uuidv7';

export function getLocaleFromPathname(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment === 'ja' || firstSegment === 'en') {
    return firstSegment;
  }
  return 'en';
}

export const generateId = cache(() => {
  const id = uuidv7();
  return id;
});
