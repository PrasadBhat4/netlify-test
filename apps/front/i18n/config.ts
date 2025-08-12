export type Locale = (typeof locales)[number];

// Here in the future we can add more locales like 'fr'
export const locales = ['en', 'ja'] as const;
export const defaultLocale: Locale = 'en';
