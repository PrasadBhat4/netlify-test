import request from 'graphql-request';
import { MetadataRoute } from 'next';
import {
  PostEdge,
  SlugPostsByPublicationDocument,
  SlugPostsByPublicationQuery,
  SlugPostsByPublicationQueryVariables,
} from '@/generated/graphql';
import { getStrapiData } from './actions/getStrapiData';

const BASE_URL = 'https://www.coderabbit.ai/';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let baseSiteMap: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}trust-center`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}trust-center/gdpr`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}trust-center/soc`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}blog`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}pricing`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}terms-of-service`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}startup-program`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}dpa`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}contact-us`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}customers`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}faq`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}whitepaper`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}enterprise`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}github-universe-2024`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}about-us`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}partnership`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}contact-us/sales`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}ide`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}contact-us/support`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}cursor`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}windsurf`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}visual-studio-code`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}hoppy`,
      lastModified: new Date(),
    },
  ];
  try {
    const data = await request<SlugPostsByPublicationQuery, SlugPostsByPublicationQueryVariables>(
      process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT ?? '',
      SlugPostsByPublicationDocument,
      {
        first: 50,
        host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST || '',
      }
    );
    const blogPosts = ((data.publication?.posts?.edges ?? []) as PostEdge[]).map(post => ({
      url: `${BASE_URL}blog/${post.node.slug}`,
      lastModified: post.node.updatedAt ?? new Date(),
    }));
    baseSiteMap = [...baseSiteMap, ...blogPosts];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error mapping blog articles to sitemap');
  }
  try {
    const strapiData = await getStrapiData('solutions', undefined, false);
    const solutionPages = (strapiData.data || [])
      .filter((page: { attributes: { slug: string } }) => page.attributes.slug)
      .map((page: { attributes: { slug: string } }) => ({
        slug: page.attributes?.slug,
        url: `${BASE_URL}pages/${page.attributes?.slug}`,
        lastModified: new Date(),
      }));
    baseSiteMap = [...baseSiteMap, ...solutionPages];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error mapping solutions pages to sitemap');
  }
  try {
    const strapiData = await getStrapiData('events', undefined, false);
    const eventPages = (strapiData.data || [])
      .filter((page: { attributes: { slug: string } }) => page.attributes.slug)
      .map((page: { attributes: { slug: string } }) => ({
        slug: page.attributes?.slug,
        url: `${BASE_URL}events/${page.attributes?.slug}`,
        lastModified: new Date(),
      }));
    baseSiteMap = [...baseSiteMap, ...eventPages];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error mapping solutions pages to sitemap');
  }

  return baseSiteMap;
}
