import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { print } from 'graphql';
import {
  PostMetadataByPublicationDocument,
  SinglePostByPublicationDocument,
  SlugPostsByPublicationDocument,
  Post,
} from '@/generated/graphql';
import { getStrapiData } from '@/app/actions/getStrapiData';
import Button from '@/app/components/Common/Button';
import Related from '@/app/components/Blog/Internal/Related';
import Contact from '@/app/components/Common/Contact';
import Container from '@/app/components/Common/Container';
import MainContent from '@/app/components/Blog/Internal/MainContent';
import Share from '@/app/components/Blog/Internal/Share';
import { GET_HASHNODE_POSTS_FILTERED, HASHNODE_HOST, LANGUAGES_TAGS, PUBLICATION_ID } from '@/app/lib/constants';
import { getUserLocale } from '@/i18n/locale';
import { defaultLocale, locales } from '@/i18n/config';
import NotFound from '@/app/not-found';
import { routing } from '@/i18n/routing';
import PromoCard from '@/app/components/Blog/Internal/PromoCard';
import { ensureWww } from '@/app/lib/utils';
import MetaTags from '@/app/components/SEO/MetaTags';
import { generateBlogMetadata } from '@/app/components/SEO/BlogMetadata';

const ContentTable = dynamic(() => import('@/app/components/Blog/Internal/ContentTable'));

const QUANTITY_RELATED_POSTS = 3;
const QUANTITY_PER_PAGE = 20;
interface ArticlePageParams {
  locale: string;
  slug: string;
}

export async function generateStaticParams() {
  const allParams: { locale: string; slug: string }[] = [];
  // Use Promise.all to fetch data for all locales concurrently
  const fetchDataPromises = routing?.locales.map(locale =>
    fetch(process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT ?? '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: print(SlugPostsByPublicationDocument),
        variables: {
          first: QUANTITY_PER_PAGE,
          host: HASHNODE_HOST,
        },
      }),
      next: { revalidate: 60 },
    })
      .then(response => response.json())
      .then(data => {
        const slugs = (data.data.publication?.posts?.edges || []).map((post: any) => post.node.slug);
        slugs.forEach((slug: string) => {
          allParams.push({ locale, slug });
        });
      })
  );
  await Promise.all(fetchDataPromises);
  return allParams;
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const response = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT ?? '', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(PostMetadataByPublicationDocument),
      variables: {
        host: HASHNODE_HOST,
        slug: params.slug,
      },
    }),
    next: { revalidate: 60 },
  });
  const data = await response.json();
  const post = data.data.publication?.post;
  const parentMetadata = await parent;
  if (!post) {
    return parentMetadata as unknown as Metadata;
  }
  // Ensure canonical URL uses www subdomain
  const canonicalUrl = post.canonicalUrl
    ? post.canonicalUrl.replace('https://coderabbit.ai/', 'https://www.coderabbit.ai/')
    : `https://www.coderabbit.ai/blog/${params.slug}`;

  return generateBlogMetadata({
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.brief,
    image: post.ogMetaData?.image ?? post.coverImage?.url,
    url: canonicalUrl,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author.name, ...(post.coAuthors || []).map((author: any) => author.name)],
    tags: post.tags?.map((tag: any) => tag.name) || [],
  });
}

// We turned off the feature flag for translations by now, until we have all hashnode articles translated
// const REDIRECT_TO_TRANSLATED_ARTICLE = process.env.NEXT_PUBLIC_FEATURE_FLAG_TRANSLATION === 'true';
const REDIRECT_TO_TRANSLATED_ARTICLE = false;

async function getPostBySlug(slug: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT ?? '', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(SinglePostByPublicationDocument),
      variables: {
        host: HASHNODE_HOST,
        slug,
      },
    }),
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data?.data?.publication?.post;
}

const ArticlePage = async ({ params }: { params: ArticlePageParams }) => {
  const { slug, locale: localeFromParams } = params;
  const localeFromCookie = await getUserLocale();
  const locale = localeFromParams || localeFromCookie;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug);

  if (REDIRECT_TO_TRANSLATED_ARTICLE) {
    let urlLocale = 'en';
    locales.forEach(localeItem => {
      if (slug.startsWith(`${localeItem}-`)) {
        urlLocale = localeItem;
      }
    });
    if (urlLocale !== locale) {
      const cleanSlug = slug.replace(`${urlLocale}-`, '');
      if (locale === defaultLocale) {
        return redirect(`/blog/${cleanSlug}`);
      }
      return redirect(`/blog/${locale}-${cleanSlug}`);
    }
  }

  if (!post) {
    return <NotFound />;
  }

  const tagSelection: string[] = [LANGUAGES_TAGS[locale]];
  const relatedResponse = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT ?? '', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_HASHNODE_POSTS_FILTERED,
      variables: {
        first: QUANTITY_RELATED_POSTS,
        publicationId: PUBLICATION_ID,
        tags: tagSelection,
      },
    }),
    next: { revalidate: 60 },
  });
  const relatedData = await relatedResponse.json();
  const relatedPosts = (relatedData?.data?.searchPostsOfPublication?.edges ?? []).map((edge: any) => edge.node as Post);

  const strapiData = await getStrapiData('blog-internal');
  if (strapiData?.data === null) {
    notFound();
  }

  const relatedText = strapiData?.data?.attributes?.Related;
  const shareText = strapiData?.data?.attributes?.Share;
  const socials = strapiData?.data?.attributes?.Socials;
  const contact = strapiData?.data?.attributes?.Contact;
  const promoCard = strapiData?.data?.attributes?.PromoCard;
  const socialLinks =
    socials?.Socials.length > 0 &&
    socials?.Socials.map((social: { Url: string; Text: string }) => {
      const baseUrl =
        social.Text === 'X' ? ensureWww(process.env.NEXT_PUBLIC_BASE_URL!) : process.env.NEXT_PUBLIC_BASE_URL!;
      return {
        ...social,
        Url: `${social.Url}${baseUrl}/blog/${slug}&text=${post?.title}&utm_source=blog&utm_medium=web&utm_campaign=social_share_blog`,
      };
    });

  // Prepare metadata for explicit meta tags
  const canonicalUrl = post.canonicalUrl
    ? post.canonicalUrl.replace('https://coderabbit.ai/', 'https://www.coderabbit.ai/')
    : `https://www.coderabbit.ai/blog/${slug}`;
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.brief;
  const image = post.ogMetaData?.image ?? post.coverImage?.url;

  return (
    <Suspense fallback={<div />}>
      <MetaTags
        title={title}
        description={description}
        image={image}
        url={canonicalUrl}
        type='article'
        siteName='CodeRabbit'
      />
      <div>
        <div className='container mt-8 space-y-16 md:mt-4 md:space-y-30 lg:space-y-38'>
          <div className='block md:flex md:justify-between'>
            {/* Left sidebar with Back button and Content table */}
            {post.features.tableOfContents.isEnabled && (
              <div className='hidden lg:flex flex-col sticky top-[130px] h-fit'>
                <div>
                  <Button
                    text='Back to blog'
                    href='/blog'
                    variant='buttonLink'
                    arrowPosition='left'
                    arrowRotation='left'
                  />

                  <div id='content-table' className='flex flex-col gap-4 mt-[20px] w-[15.5rem] xl:w-[19.375rem] h-fit'>
                    <h2 className='text-neutral-900 font-bold mb-[20px] dark:text-neutral-0'>Content</h2>
                    <ContentTable parentId={null} data={post.features.tableOfContents.items} />
                  </div>
                </div>
              </div>
            )}

            {/* Main content */}
            <div className='flex-grow mx-auto md:mx-0'>
              <div
                className={`w-full  mx-auto ${
                  post.features.tableOfContents.isEnabled
                    ? 'lg:hidden md:max-w-[35.75rem]'
                    : 'md:ml-8 xl:ml-28 md:mb-[1.9rem]'
                }
               
                `}>
                <Button
                  text='Back to blog'
                  href='/blog'
                  variant='buttonLink'
                  arrowPosition='left'
                  arrowRotation='left'
                />
              </div>
              <MainContent
                data={post}
                className={`${post.features.tableOfContents.isEnabled ? '' : 'md:!max-w-[95%] xl:!max-w-[90%]'}`}
              />
            </div>

            {/* Right sidebar with Share component */}
            <div className='hidden lg:flex flex-col sticky top-[130px] h-fit ml-8 gap-7'>
              <Share text={shareText} links={socialLinks} className='w-[16.5rem] xl:w-[19.375rem]' />
              {promoCard && <PromoCard data={promoCard} className='w-[16.5rem] xl:w-[19.375rem]' />}
            </div>
          </div>

          {/* Mobile Share component */}
          <Container className='w-full md:max-w-[35.75rem] md:px-4 mx-auto lg:max-w-full'>
            <Share text={shareText} links={socialLinks} className='lg:hidden mt-[3.75rem] mb-6 md:my-20 mx-auto' />

            {promoCard && <PromoCard data={promoCard} className='w-full mb-6 lg:hidden' />}
            <Related title={relatedText} items={relatedPosts} />
          </Container>
        </div>
        {contact && (
          <div className='mt-[64px] md:mt-[120px]'>
            <Contact data={contact} />
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default ArticlePage;
