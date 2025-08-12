'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '@/app/components/Common/Container';
import Hero from '@/app/components/Common/Heroes/Blog';
import CardList from '@/app/components/Blog/CardList';
import CategoryCarousel from '@/app/components/Blog/CategoryCarousel';
import Card from '@/app/components/Blog/Card';
import { INITIAL_ACTIVE_CATEGORY } from '@/app/lib/constants';
import { SliderType } from '@/app/lib/types';
import { Post } from '@/generated/graphql';

interface Props {
  hero: Partial<{
    Title: string;
    Description: string;
    SearchPlaceholder: string;
  }>;
  sliders: SliderType[] & { posts?: Post[] };
  initialPosts: any;
  initialPageInfo: any;
  featuredPost: any;
  locale?: string;
  isResults: boolean;
  isCaseStudies?: boolean;
  hideFilters?: boolean;
  strapiLayout: {
    ResultsFor: string;
    NoResultsTitle: string;
    NoResultsSubtext: string;
    ResultsError: string;
    AllArticles: string;
    Loading: string;
    LoadMoreArticles: string;
    CategoryAll: string;
    CategoryPopular: string;
    CategoryFeatured: string;
    CategoryAnnouncements: string;
    CategoryProduct: string;
  };
}

const BlogClient = ({
  hero,
  sliders = [],
  initialPosts,
  initialPageInfo,
  featuredPost,
  isResults,
  strapiLayout,
  isCaseStudies = false,
  hideFilters = false,
  locale = 'en',
}: Readonly<Props>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (search) {
      setSearchValue(search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryHandler = (tags: string) => {
    const sanitizedTags = tags.trim().toLowerCase();
    const newSearch = new URLSearchParams();
    if (sanitizedTags === INITIAL_ACTIVE_CATEGORY.toLowerCase()) {
      router.replace('/blog');
      return;
    }
    newSearch.set('tags', sanitizedTags);
    router.replace(`/blog?${newSearch.toString()}`);
  };

  const searchHandler = (e: string) => {
    setSearchValue(e);
  };

  const onSearch = () => {
    if (!searchValue) return;
    const newSearch = new URLSearchParams();
    newSearch.set('search', searchValue);
    router.replace(`/blog?${newSearch.toString()}`);
  };

  return (
    <div className='space-y-16 lg:space-y-[6.25rem]'>
      {hero && (
        <Suspense>
          <Hero
            strapiLayout={strapiLayout}
            data={hero}
            categoryHandler={categoryHandler}
            handleSearch={onSearch}
            search={searchValue}
            searchHandler={searchHandler}
            hideFilters={hideFilters}
          />
        </Suspense>
      )}
      {isResults && initialPosts.length === 0 && (
        <Container className='md:!p-0 md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
          <h2 className='text-center font-heading text-[20px] md:text-[28px] lg:text-[32px]'>
            <strong>{strapiLayout.NoResultsTitle}</strong>
          </h2>
          <p className='text-center text-[18px] md:text-[20px]'>{strapiLayout.NoResultsSubtext}</p>
        </Container>
      )}
      {!isResults && (
        <Container className='md:!p-0 md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
          {featuredPost && (
            <Card
              post={featuredPost}
              isFeatured
              cardClassName='flex items-center justify-center'
              className='items-center justify-center'
            />
          )}
        </Container>
      )}
      {!isResults &&
        sliders?.length > 0 &&
        sliders.map((slider: SliderType & { posts?: Post[] }) =>
          slider?.posts && slider?.posts?.length ? (
            <CategoryCarousel title={{ title: slider?.Title }} items={slider?.posts ?? []} key={slider?.id} showBrief />
          ) : null
        )}
      {initialPosts.length > 0 && (
        <Container className='space-y-16 lg:space-y-[6.25rem] md:!p-0 md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
          <div className='flex flex-col gap-y-6 lg:gap-y-10'>
            {!isResults && (
              <h2 className='font-medium font-heading text-subtitle-sm md:text-heading-sm-sm lg:text-heading-sm'>
                {strapiLayout.AllArticles}
              </h2>
            )}
            <CardList
              strapiLayout={strapiLayout}
              initialPosts={initialPosts}
              initialPageInfo={initialPageInfo}
              featuredId={featuredPost?.id}
              isCaseStudies={isCaseStudies}
              isResults={isResults}
              locale={locale}
            />
          </div>
        </Container>
      )}
    </div>
  );
};

export default BlogClient;
