'use client';

import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
  siteName?: string;
}

export default function MetaTags({
  title,
  description,
  image,
  url,
  type = 'article',
  siteName = 'CodeRabbit',
}: MetaTagsProps): null {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Function to update or create meta tag
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
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

    // Basic Meta Tags
    updateMetaTag('description', description);

    // OpenGraph Tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteName, true);

    if (image) {
      updateMetaTag('og:image', image, true);
      updateMetaTag('og:image:alt', title, true);
      updateMetaTag('og:image:width', '1200', true);
      updateMetaTag('og:image:height', '630', true);
    }

    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:site', '@coderabbitai');
    updateMetaTag('twitter:creator', '@coderabbitai');

    if (image) {
      updateMetaTag('twitter:image', image);
    }

    // Additional Meta Tags
    updateMetaTag('robots', 'index,follow');
    updateMetaTag('author', 'CodeRabbit');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = url;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = url;
      document.head.appendChild(canonical);
    }
  }, [title, description, image, url, type, siteName]);

  return null;
}
