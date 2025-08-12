import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import BlogClient from '@/app/components/Blog/BlogClient';
import Newsletter from '@/app/components/Blog/Newsletter';
import Contact from '@/app/components/Common/Contact';
import { parseMetadata } from '@/app/lib/utils';
import { getCookieLocale } from '@/i18n/locale';
import { getHashnodeArticles, getHashnodeArticlesByTag } from '@/utils/hashnode';
import type { SliderType } from '@/app/lib/types';

const QUANTITY_ALL_POSTS = 9;

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('blog');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const BlogPage = async ({ searchParams }: { searchParams?: { search?: string; tags?: string } }) => {
  const strapiData = await getStrapiData('blog');
  const locale = await getCookieLocale();
  const query = searchParams?.search;
  const tags = searchParams?.tags;

  if (strapiData?.data === null || !strapiData?.data?.attributes) notFound();

  const hero = strapiData.data.attributes.Hero;
  const sliders = strapiData.data.attributes.Sliders?.Slider;
  const newsletter = strapiData.data.attributes.Newsletter;
  const contact = strapiData.data.attributes.Contact;
  const {
    ResultsFor,
    NoResultsTitle,
    NoResultsSubtext,
    ResultsError,
    AllArticles,
    Loading,
    LoadMoreArticles,
    CategoryAll,
    CategoryPopular,
    CategoryFeatured,
    CategoryAnnouncements,
    CategoryProduct,
  } = strapiData.data.attributes;

  const { initialPosts, initialPageInfo, featuredPost } = await getHashnodeArticles({
    query,
    tags,
    limit: QUANTITY_ALL_POSTS,
  });

  const slidersWithPosts = await Promise.allSettled(
    sliders.map(async (slider: SliderType) => {
      return getHashnodeArticlesByTag({ tag: slider.Category });
    })
  );
  const slidersWithPostsData = sliders.map((slider: SliderType, index: number) => {
    return {
      ...slider,
      posts: slidersWithPosts[index].status === 'fulfilled' ? slidersWithPosts[index].value.initialPosts : [],
    };
  });

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      <BlogClient
        strapiLayout={{
          ResultsFor,
          NoResultsTitle,
          NoResultsSubtext,
          ResultsError,
          AllArticles,
          Loading,
          LoadMoreArticles,
          CategoryAll,
          CategoryPopular,
          CategoryFeatured,
          CategoryAnnouncements,
          CategoryProduct,
        }}
        hero={hero}
        sliders={slidersWithPostsData}
        initialPosts={initialPosts}
        initialPageInfo={initialPageInfo}
        featuredPost={featuredPost}
        isResults={!!query || !!tags}
        locale={locale}
      />
      <Newsletter data={newsletter} />
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default BlogPage;
