'use client';

/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { memo, useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { twMerge as tm } from 'tailwind-merge';
import { useEmbeds } from '@/utils/renderer/hooks/useEmbeds';
import { markdownToHtml } from '@/utils/renderer/markdownToHtml';
import { getStrapiDataForStaticPages } from '@/app/actions/getStrapiDataForStaticPages';
import BannerCard from '@/app/components/Blog/Internal/Banner/Banner';
import { BannerData } from '../lib/types';
import PdfPreview from '@/app/components/Blog/PdfPreview';

type Props = {
  contentMarkdown: string;
  className?: string;
  locale?: string;
};

const _MarkdownToHtml = ({ contentMarkdown, locale, className = '' }: Props) => {
  const hasWidgetPlaceholder = (content: string, widgetName: string) => {
    return content.includes(`%%[${widgetName}]`);
  };

  const content = markdownToHtml(contentMarkdown);
  useEmbeds({ enabled: true });
  useEffect(() => {
    const reactRoots: Root[] = [];

    document.querySelectorAll('.pdf-embed').forEach(div => {
      const url = div.getAttribute('data-pdf-url');
      if (url) {
        div.innerHTML = '';
        const root = document.createElement('div');
        div.appendChild(root);
        const reactRoot = createRoot(root);
        reactRoot.render(<PdfPreview PdfUrl={url} />);
        reactRoots.push(reactRoot);
      }
    });

    if (locale) {
      const fetchDataAndRender = async () => {
        const strapiData = await getStrapiDataForStaticPages(locale, 'blog-internal');
        const Banners: BannerData[] = strapiData?.data?.attributes?.BlogBanners || [];

        Banners.forEach(banner => {
          if (hasWidgetPlaceholder(contentMarkdown, banner?.widgetNameFromHashnode)) {
            const widgetSelector = `[data-cr-widget="${banner.widgetNameFromHashnode}"]`;
            const mountPoint = document.querySelector(widgetSelector);
            if (mountPoint && mountPoint.childNodes.length === 0) {
              const root = document.createElement('div');
              mountPoint.appendChild(root);
              const reactRoot = createRoot(root);
              reactRoot.render(<BannerCard data={banner} />);
              reactRoots.push(reactRoot);
            }
          }
        });
      };

      fetchDataAndRender();
    }

    return () => {
      reactRoots.forEach(root => {
        root.unmount();
      });
    };
  }, [contentMarkdown, locale]);
  return (
    <div
      className={tm('w-full px-5 mx-auto hashnode-content-style md:max-w-screen-md markdown-blog', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export const MarkdownToHtml = memo(_MarkdownToHtml);
