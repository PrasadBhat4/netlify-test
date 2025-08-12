/* eslint-disable no-useless-escape */
import Script from 'next/script';

export const GrowsurfSnippet = () => (
  <Script id='growsurf-script' strategy='lazyOnload' async defer>
    {`
      (function(g,r,s,f){g.grsfSettings={campaignId:"wyv8e5",version:"2.0.0"};s=r.getElementsByTagName("head")[0];f=r.createElement("script");f.async=1;f.src="https://app.growsurf.com/growsurf.js"+"?v="+g.grsfSettings.version;f.setAttribute("grsf-campaign", g.grsfSettings.campaignId);!g.grsfInit?s.appendChild(f):"";})(window,document);
    `}
  </Script>
);
