'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface UniversalMetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const DEFAULT_TITLE = 'AI Code Reviews | CodeRabbit | Try for Free';
const DEFAULT_DESCRIPTION =
  'AI-first pull request reviewer with context-aware feedback, line-by-line code suggestions, and real-time chat.';
const DEFAULT_IMAGE = 'https://www.coderabbit.ai/images/logo-orange.svg';
const SITE_NAME = 'CodeRabbit';

export default function UniversalMetaTags({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
}: UniversalMetaTagsProps): null {
  const pathname = usePathname();
  const currentUrl = url || `https://www.coderabbit.ai${pathname}`;

  useEffect(() => {
    // Function to create or update meta tags
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      if (!content) return;

      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Set document title
    if (title) {
      document.title = title;
    }

    // Basic Meta Tags
    setMetaTag('description', description);

    // OpenGraph Tags - Essential for LinkedIn
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:site_name', SITE_NAME, true);
    setMetaTag('og:locale', 'en_US', true);

    if (image) {
      setMetaTag('og:image', image, true);
      setMetaTag('og:image:alt', title, true);
      setMetaTag('og:image:width', '1200', true);
      setMetaTag('og:image:height', '630', true);
      setMetaTag('og:image:type', 'image/png', true);
    }

    // Twitter Card Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:site', '@coderabbitai');
    setMetaTag('twitter:creator', '@coderabbitai');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);

    if (image) {
      setMetaTag('twitter:image', image);
    }

    // Additional SEO Meta Tags
    setMetaTag('robots', 'index,follow');
    setMetaTag('author', 'CodeRabbit');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = currentUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = currentUrl;
      document.head.appendChild(canonical);
    }

    // Force refresh of meta tags for social crawlers
    const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
    if (!metaRefresh) {
      const refresh = document.createElement('meta');
      refresh.setAttribute('http-equiv', 'cache-control');
      refresh.content = 'no-cache';
      document.head.appendChild(refresh);
    }
  }, [title, description, image, currentUrl, type]);

  return null;
}
