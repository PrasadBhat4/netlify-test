import { Metadata, ResolvedMetadata } from 'next';
import { toast } from '@/app/components/Common/Toast';
import { getStrapiURL } from '@/app/lib/config';
import { Creatives, SiteMetadata, StrapiButton } from '@/app/lib/types';

export const getStrapiMedia = (url: string | null) => {
  if (url == null) return null;
  if (url.startsWith('data:')) return url;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${getStrapiURL}${url}`;
};

export const formatString = (
  text: string,
  startWord: number | 'last',
  endWord?: number,
  style: 'color' | 'bold' | 'color-bold' = 'color',
  color = '#25BAB1'
): string => {
  const words = text?.split(' ');
  const startIndex = startWord === 'last' ? words.length - 1 : startWord;
  const endIndex = endWord === undefined ? startIndex : endWord;

  return (
    words
      ?.map((word, index) => {
        if ((startIndex <= index && index <= endIndex) || (startIndex >= index && endIndex === undefined)) {
          let styledWord = word;
          if (style.includes('bold')) styledWord = `<span style="font-weight: 600">${styledWord}</span>`;
          if (style.includes('color'))
            styledWord = `<span style="color: ${color}" className="${color}">${styledWord}</span>`;
          if (style.includes('bold-color'))
            styledWord = `<span style="color: ${color}; font-weight: 600" className="${color}">${styledWord}</span>`;
          return styledWord;
        }
        return word;
      })
      .join(' ') ?? '<span></span>'
  );
};

export const slugify = (input: string): string => {
  const normalizedInput = input.toLowerCase();
  const cleanedInput = normalizedInput.replace(/[^\w\s-]/g, '');
  const slugifiedInput = cleanedInput.replace(/\s+/g, '-').replace(/-+/g, '-');
  return slugifiedInput;
};

export const parseMetadata = ({
  pageMetadata,
  parentMetadata,
}: {
  pageMetadata: SiteMetadata;
  parentMetadata: ResolvedMetadata;
}): Metadata => {
  // Fallback values for when Strapi data is not available
  const fallbackTitle = pageMetadata?.title || parentMetadata?.title || 'AI Code Reviews | CodeRabbit | Try for Free';
  const fallbackDescription = pageMetadata?.description || parentMetadata?.description || 'AI-first pull request reviewer with context-aware feedback, line-by-line code suggestions, and real-time chat.';
  const fallbackImage = getStrapiMedia(pageMetadata?.og_image?.data?.attributes.url) || '/images/logo-orange.svg';

  return {
    ...parentMetadata,
    title: fallbackTitle,
    description: fallbackDescription,
    keywords: [...(pageMetadata?.keywords || '').split(',')],
    alternates: { ...parentMetadata.alternates, canonical: pageMetadata?.canonical },
    openGraph: {
      ...parentMetadata.openGraph,
      title: pageMetadata?.og_title || fallbackTitle,
      description: pageMetadata?.og_description || fallbackDescription,
      siteName: pageMetadata?.og_sitename || parentMetadata?.openGraph?.siteName || 'CodeRabbit',
      locale: pageMetadata?.og_locale ?? 'en_US',
      url: pageMetadata?.og_url || parentMetadata?.openGraph?.url || 'https://www.coderabbit.ai',
      type: pageMetadata?.og_type ?? 'website',
      images: [fallbackImage].filter(Boolean),
    },
    twitter: {
      ...parentMetadata.twitter,
      card: pageMetadata?.twitter_card ?? 'summary_large_image',
      title: pageMetadata?.twitter_title || fallbackTitle,
      description: pageMetadata?.twitter_description || fallbackDescription,
      site: pageMetadata?.twitter_site || parentMetadata?.twitter?.site || '@coderabbitai',
      creator: pageMetadata?.twitter_creator || parentMetadata?.twitter?.creator || '@coderabbitai',
      images: [getStrapiMedia(pageMetadata?.twitter_image?.data?.attributes.url) || fallbackImage].filter(Boolean),
    },
  } as unknown as Metadata;
};

export const preprocessMarkdown = (md: string) => {
  return md.replace(/!\[(.*?)\]\((.*?) align=".*?"\)/g, '![$1]($2)');
};

const getFilenameFromUrl = (url: string): string => {
  return url.substring(url.lastIndexOf('/') + 1);
};

export const copyFileFromUrl = async (url: string) => {
  const filename = getFilenameFromUrl(url);
  const extension = filename.split('.').pop()?.toLowerCase() || '';

  const res = await fetch(url);
  try {
    if (extension === 'svg') {
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      toast.success('SVG copied to clipboard');
    } else {
      const blob = await res.blob();
      if (typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      } else {
        toast.error('image copying may not be supported in this browser. Try downloading instead.');
      }
      toast.success('PNG copied to clipboard');
    }
  } catch (error) {
    toast.error('Failed to copy to clipboard');
  }
};

export const handleDownloadFile = async (url: string) => {
  const filename = getFilenameFromUrl(url);
  const extension = filename.split('.').pop()?.toLowerCase() || '';

  const response = await fetch(url);

  let blob: Blob;
  try {
    if (extension === 'svg') {
      const text = await response.text();
      blob = new Blob([text], { type: 'image/svg+xml' });
    } else {
      blob = await response.blob(); // for PNG, JPG, etc.
    }
  } catch (error) {
    toast.error('Failed to copy to Donwload');
  }

  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(downloadUrl);
};

export function decodeHtmlEntities(str: string) {
  if (!str) return '';
  return str.replace(/&amp;/g, '&');
}

export function ensureWww(url: string): string {
  return url.replace(/^https:\/\/(?!www\.)/, 'https://www.');
}

export function generateSocialLinksForHoppy(socials: StrapiButton[], creative?: Creatives, text?: string): any[] {
  if (!socials || socials.length === 0) return [];

  const creativeText = `${creative?.SocialShareText ?? ''} ${creative?.CreativeName ?? ''}`.trim();
  const shareText = text || creativeText || '';

  return socials.map((social: { Url: string; Text: string }) => {
    const nextBaseUrl =
      social.Text === 'X' ? ensureWww(process.env.NEXT_PUBLIC_BASE_URL) : process.env.NEXT_PUBLIC_BASE_URL;
    let baseUrl = decodeURIComponent(social.Url || '');
    const shareUrl = `${nextBaseUrl}/hoppy/${creative?.slug}`;

    const isReddit = social.Text === 'Reddit';

    // Handle Reddit URLs differently - they come with ?url= already
    if (isReddit && baseUrl.endsWith('?url=')) {
      const fullUrl = `${baseUrl}${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(
        shareText
      )}&utm_source=hoppy&utm_medium=web&utm_campaign=social_share_hoppy`;

      return {
        ...social,
        Url: fullUrl,
      };
    }

    // Handle other social platforms
    baseUrl = baseUrl.replace(/[?&]+$/, '');
    const paramName = isReddit ? 'title' : 'text';
    const separator = baseUrl.includes('?') ? '&' : '?';

    const fullUrl = `${baseUrl}${separator}url=${encodeURIComponent(shareUrl)}&${paramName}=${encodeURIComponent(
      shareText
    )}&utm_source=hoppy&utm_medium=web&utm_campaign=social_share_hoppy`;

    return {
      ...social,
      Url: fullUrl,
    };
  });
}

export function generateSocialLinks(
  socials: StrapiButton[],
  route: string,
  slug: string,
  title: string,
  utm_campaign: string,
  utm_source: string
): any[] {
  if (!socials || socials.length === 0) return [];

  return socials.map((social: { Url: string; Text: string }) => {
    const baseUrl =
      social.Text === 'X' ? ensureWww(process.env.NEXT_PUBLIC_BASE_URL!) : process.env.NEXT_PUBLIC_BASE_URL!;
    const shareUrl = `${baseUrl}/${route}/${slug}`;

    return {
      ...social,
      Url: `${social.Url}${shareUrl}&text=${encodeURIComponent(
        title
      )}&utm_source=${utm_source}&utm_medium=web&utm_campaign=${utm_campaign}`,
    };
  });
}
