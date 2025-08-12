'use client';

import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player';
import { useState } from 'react';

interface Props {
  animationSrc: string;
}

const DotLottieHomeHeroComponent = ({ animationSrc }: Readonly<Props>) => {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const Placeholder = ({ height, width, display }: { height: number; width: number; display: string }) => (
    <div className='bg-black opacity-50 rounded-[1.25rem]' style={{ height, width, display }} />
  );

  return (
    <>
      <div className='hidden lg:block rounded-[1.25rem]'>
        <DotLottiePlayer
          src={animationSrc}
          style={{ height: 565, width: 1112, display: animationLoaded ? 'inherit' : 'none' }}
          loop
          autoplay
          onEvent={(event: PlayerEvents) => {
            if (event === PlayerEvents.Ready) {
              setAnimationLoaded(true);
            }
          }}
        />
        <Placeholder height={565} width={1112} display={animationLoaded ? 'none' : 'inherit'} />
      </div>
      <div className='hidden md:max-lg:block rounded-[1.25rem]'>
        <DotLottiePlayer
          src={animationSrc}
          style={{ height: 390, width: 769, display: animationLoaded ? 'inherit' : 'none' }}
          loop
          autoplay
          onEvent={(event: PlayerEvents) => {
            if (event === PlayerEvents.Ready) {
              setAnimationLoaded(true);
            }
          }}
        />
        <Placeholder height={390} width={769} display={animationLoaded ? 'none' : 'inherit'} />
      </div>
    </>
  );
};

export default DotLottieHomeHeroComponent;
