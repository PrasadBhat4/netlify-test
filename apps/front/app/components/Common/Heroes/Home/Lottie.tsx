'use client';

import { useRef, useEffect, useState } from 'react';
import type { LottiePlayer } from 'lottie-web';

interface Props {
  animationSrc: string;
}

const LottieHomeHeroComponent = ({ animationSrc }: Readonly<Props>) => {
  const refLG = useRef<HTMLDivElement>(null);
  const refMD = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import('lottie-web').then(Lottie => {
      setLottie(Lottie.default);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (lottie && refLG.current && refMD.current) {
      const animationLG = lottie.loadAnimation({
        container: refLG.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationSrc ?? '/LottieRaw.json',
        rendererSettings: { progressiveLoad: true },
      });

      const animationMD = lottie.loadAnimation({
        container: refMD.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationSrc ?? '/LottieRaw.json',
        rendererSettings: { progressiveLoad: true },
      });

      return () => {
        animationLG.destroy();
        animationMD.destroy();
      };
    }
    return () => {};
  }, [lottie, animationSrc]);

  const Placeholder = ({ height, width }: { height: number; width: number }) => (
    <div className='bg-black opacity-50 rounded-[1.25rem]' style={{ height, width }} />
  );

  return (
    <>
      <div className='hidden lg:block rounded-[1.25rem]'>
        {isLoading ? (
          <Placeholder height={565} width={1112} />
        ) : (
          <div ref={refLG} style={{ height: 565, width: 1112 }} />
        )}
      </div>
      <div className='hidden md:max-lg:block rounded-[1.25rem]'>
        {isLoading ? <Placeholder height={390} width={769} /> : <div ref={refMD} style={{ height: 390, width: 769 }} />}
      </div>
    </>
  );
};

export default LottieHomeHeroComponent;
