'use client';

import { useEffect, useState } from 'react';

const LumaButton = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'luma-checkout';
    script.src = 'https://embed.lu.ma/checkout-button.js';
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a
      href='https://lu.ma/event/evt-4665PXTocmMLBGu'
      className={`luma-checkout--button group inline-flex items-center justify-center h-16 px-8 py-5 rounded-full cursor-pointer gap-x-5 !text-button font-heading font-bold bg-orange-500 text-neutral-0  hover:bg-gradient-to-r from-orange-500 to-pink-500 focus:bg-pink-600  focus:outline-pink-600  focus:outline-offset-4  active:bg-aqua-500  disabled:bg-neutral-100  disabled:text-neutral-400  disabled:pointer-events-none ${
        isLoaded ? '' : 'pointer-events-none'
      }`}
      data-luma-action='checkout'
      data-luma-event-id='evt-4665PXTocmMLBGu'>
      Register for Event
    </a>
  );
};

export default LumaButton;
