import localFont from 'next/font/local';
import { Work_Sans } from 'next/font/google';

const scandia = localFont({
  src: '../../public/fonts/ScandiaWebRegular/ScandiaWebRegular.woff2',
  display: 'swap',
  preload: true,
  fallback: ['sans-serif'],
});

const workSans = Work_Sans({ subsets: ['latin'], display: 'swap', preload: true });

export { scandia, workSans };
