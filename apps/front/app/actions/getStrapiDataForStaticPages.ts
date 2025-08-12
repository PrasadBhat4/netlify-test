import qs from 'qs';
import { getStrapiURL } from '@/app/lib/config';
import { getPageQuery } from '@/app/lib/queries';
import { PagePathType, SiteMetadata } from '@/app/lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStrapiDataForStaticPages = async (
  locale: string,
  path: PagePathType,
  slug?: string,
  tag?: string
): Promise<any> => {
  try {
    const queryKey = slug ? `${path}Collection` : path;
    const url = new URL(`/api/${path}`, getStrapiURL);

    url.search = queryKey in getPageQuery ? getPageQuery[queryKey] : 'home-page';

    const filters: any = {};
    if (slug) {
      const filterField = path === 'homepages' ? 'Variant' : 'slug';
      filters[filterField] = { $eq: slug };
    }
    if (tag) {
      filters.category = {
        name: {
          $eqi: tag,
        },
      };
    }

    const queryString = qs.stringify({ filters }, { encodeValuesOnly: true });
    if (queryString) {
      url.search = url.search ? `${url.search}&${queryString}` : queryString;
    }

    if (locale && locale?.length > 0) {
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

export const getPageMetadata = async (path: string, locale: string): Promise<SiteMetadata> => {
  try {
    // const locale = await getCookieData();
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

export const getCollectionPageMetadata = async (path: string, slug: string, locale: string): Promise<SiteMetadata> => {
  try {
    const url = new URL(`/api/${path}`, getStrapiURL);
    const filterField = path === 'homepages' ? 'Variant' : 'slug';
    const filterQuery = qs.stringify({ filters: { [filterField]: { $eq: slug } } }, { encodeValuesOnly: true });
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
