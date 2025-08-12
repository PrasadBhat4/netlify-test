/* eslint-disable no-useless-escape */
import Script from 'next/script';

export const MouseFlowSnippet = () => (
  <Script id='mouseflow-script' strategy='lazyOnload' async defer>
    {`
      window._mfq = window._mfq || [];
      (function() {
        var mf = document.createElement("script");
        mf.type = "text/javascript"; mf.defer = true;
        mf.src = "//cdn.mouseflow.com/projects/af99feca-7d94-417a-9592-7ae78b5eb5db.js";
        document.getElementsByTagName("head")[0].appendChild(mf);
      })();
    `}
  </Script>
);
