import { ReactNode } from 'react';
import { PHProvider } from './providers';
import { getBootstrapData } from '@/utils/ide/getBootstrapData';

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function RootLayout({ children }: Props) {
  const bootstrapData = await getBootstrapData();
  return (
    <PHProvider bootstrapData={bootstrapData}>
      <body>{children}</body>
    </PHProvider>
  );
}
