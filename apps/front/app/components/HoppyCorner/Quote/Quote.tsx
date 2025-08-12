'use client';

import { useState } from 'react';
import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import Card from '@/app/components/HoppyCorner/Card/Card';
import { Creatives as ICreatives, QuoteBanner } from '@/app/lib/types';
import { generateSocialLinksForHoppy } from '@/app/lib/utils';

interface Props {
  data: QuoteBanner;
}
const getRandomVersion = (versions: ICreatives[], exclude?: ICreatives): ICreatives | undefined => {
  const filtered = versions.filter(v => v !== exclude);
  const list = filtered?.length > 0 ? filtered : versions;
  if (list.length === 0) return undefined;
  return list[Math.floor(Math.random() * list.length)];
};
const Quote = ({ data }: Readonly<Props>) => {
  const Creatives = data.Creatives.filter(c => c.IsQuote);
  const [currentVersion, setCurrentVersion] = useState<ICreatives | undefined>(Creatives?.[0]);
  const handleClick = () => {
    const newVersion = getRandomVersion(Creatives || [], currentVersion);
    setCurrentVersion(newVersion);
  };
  const socialLinks = generateSocialLinksForHoppy(data?.Socials, currentVersion, currentVersion?.Slogan);
  if (!Creatives || Creatives.length === 0) return null;
  return (
    <Container className='gap-6'>
      <InnerContainer>
        <div className='flex space-y-6 flex-col items-center w-full'>
          {data?.Title && (
            <h2 className='font-bold text-balance text-center font-heading text-heading-lg-sm lg:text-heading-lg text-neutral-900 dark:text-neutral-0'>
              {data?.Title}
            </h2>
          )}
          {data?.Description && (
            <p className='text-center  text-subtitle lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
              {data?.Description}
            </p>
          )}

          <Card Button={data?.Button} Socials={socialLinks} data={currentVersion} handleClick={handleClick} />
        </div>
      </InnerContainer>
    </Container>
  );
};

export default Quote;
