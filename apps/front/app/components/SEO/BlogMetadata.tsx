import { Metadata } from 'next';

interface BlogMetadataProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generateBlogMetadata({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: BlogMetadataProps): Metadata {
  return {
    title,
    description,
    keywords: tags,
    authors: authors?.map(name => ({ name })),
    openGraph: {
      title,
      description,
      url,
      siteName: 'CodeRabbit',
      locale: 'en_US',
      type: 'article',
      publishedTime,
      modifiedTime,
      authors,
      tags,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@coderabbitai',
      creator: '@coderabbitai',
      images: image ? [image] : [],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
