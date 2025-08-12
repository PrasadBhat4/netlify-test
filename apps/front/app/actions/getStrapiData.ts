import { cookies } from 'next/headers';
import qs from 'qs';
import { getStrapiURL } from '@/app/lib/config';
import { getPageQuery } from '@/app/lib/queries';
import { PagePathType, SiteMetadata } from '@/app/lib/types';
import { defaultLocale } from '@/i18n/config';

const I18N_COOKIE_NAME = 'NEXT_LOCALE';

const getCookieData = () => {
  const cookieStore = cookies();
  const locale = cookieStore.get(I18N_COOKIE_NAME)?.value || defaultLocale;
  return locale;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStrapiData = async (
  path: PagePathType,
  slug?: string,
  addTranslation = true,
  customQuery?: string
): Promise<any> => {
  try {
    const queryKey = slug ? `${path}Collection` : path;
    const url = new URL(`/api/${path}`, getStrapiURL);

    let locale;
    if (addTranslation) {
      locale = getCookieData();
    }

    // Use customQuery if provided; else fallback to existing logic
    if (customQuery) {
      url.search = customQuery;
    } else {
      url.search = queryKey in getPageQuery ? getPageQuery[queryKey] : 'home-page';

      if (slug) {
        const queryString = qs.stringify({ filters: { slug: { $eq: slug } } }, { encodeValuesOnly: true });
        url.search = url.search ? `${url.search}&${queryString}` : queryString;
      }
    }

    if (locale && locale.length > 0) {
      url.search = `${url.search}&locale=${locale}`;
    }

    const response = await fetch(url.href, { next: { revalidate: 60 } });
    const result = await response.json();
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
};

export const getPageMetadata = async (path: string): Promise<SiteMetadata> => {
  try {
    const locale = await getCookieData();
    const url = new URL(`/api/${path}`, getStrapiURL);
    url.search = getPageQuery.meta;
    if (locale) {
      url.search = `${url.search}&locale=${locale}`;
    }
    const response = await fetch(url.href, { next: { revalidate: 60 } });
    const { data } = await response.json();
    return data?.attributes?.seo ?? data?.attributes?.Seo;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
};

export const getCollectionPageMetadata = async (path: string, slug: string): Promise<SiteMetadata> => {
  try {
    const locale = await getCookieData();
    const url = new URL(`/api/${path}`, getStrapiURL);
    const filterQuery = qs.stringify({ filters: { slug: { $eq: slug } } }, { encodeValuesOnly: true });
    url.search = `${getPageQuery.meta}&${filterQuery}`;
    if (locale) {
      url.search = `${url.search}&locale=${locale}`;
    }
    const response = await fetch(url.href, { next: { revalidate: 60 } });
    const { data } = await response.json();
    return data?.[0]?.attributes?.seo ?? data?.[0]?.attributes?.Seo;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
};
