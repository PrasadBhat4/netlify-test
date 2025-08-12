/* eslint-disable no-useless-escape */
import Script from 'next/script';

export const Ketch = () => (
  <Script id='ketch-consent-bootloader' strategy='afterInteractive'>
    {`
     !function(){window.semaphore=window.semaphore||[],window.ketch=function(){window.semaphore.push(arguments)};var e=document.createElement("script");e.type="text/javascript",e.src="https://global.ketchcdn.com/web/v3/config/coderabbit/website_smart_tag/boot.js",e.defer=e.async=!0,document.getElementsByTagName("head")[0].appendChild(e)}();
    `}
  </Script>
);
