'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoryCarousel from '@/app/components/Blog/CategoryCarousel';
import Stats from './Stats';
import CategoriesFilter from '../Common/CategoriesFilter';
import Container from '../Common/Container';
import CardList from './CardList';

const QUANTITY_PER_PAGE = 9;

interface Category {
  id: number;
  categoryName: string;
  Description: string;
}

interface Stat {
  id: string;
  Number: string;
  Description: string;
}

interface CaseStudyClientProps {
  stats: Stat[];
  heroTexts: {
    title: string;
    subtitle: string;
  };
  categories: Category[];
  initialPosts: any[];
}

export default function CaseStudyClient({
  heroTexts,
  stats,
  categories,
  initialPosts,
}: Readonly<CaseStudyClientProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const [visibleCount, setVisibleCount] = useState<number>(QUANTITY_PER_PAGE);

  const categoryHandler = (tag: string) => {
    const newCategory = tag.trim().toLowerCase();
    const newSearchParams = new URLSearchParams(searchParams);

    if (selectedCategory === newCategory || newCategory === 'all') {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', newCategory);
    }

    router.push(`?${newSearchParams.toString()}`);
    setVisibleCount(QUANTITY_PER_PAGE);
  };

  const categoryNames = ['All', ...(Array.isArray(categories) ? categories.map(c => c.categoryName) : [])];

  const transformedPosts = useMemo(
    () =>
      (initialPosts || [])
        .filter((post: any) => post?.attributes && post?.attributes.CaseHome)
        .map((post: any) => ({
          id: post.id.toString(),
          slug: post.attributes.slug,
          title: post.attributes.CaseHome.CaseTitle,
          brief: post.attributes.CaseHome.CaseDescription,
          coverImage: {
            url: post.attributes.CaseHome.Image?.data?.attributes?.url,
          },
          publishedAt: post.attributes.publishedAt,
          category: post.attributes.category?.data?.attributes?.name,
          isFeatured: post.attributes.isFeatured,
        }))
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    [initialPosts]
  );

  const carouselPosts = useMemo(
    () =>
      transformedPosts
        .filter(post => post.isFeatured)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    [transformedPosts]
  );

  const filteredPosts = useMemo(() => {
    if (!selectedCategory || selectedCategory.toLowerCase() === 'all') {
      return transformedPosts;
    }
    return transformedPosts.filter(post => post.category && post.category.toLowerCase() === selectedCategory);
  }, [selectedCategory, transformedPosts]);

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasNextPage = visibleCount < filteredPosts.length;

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + QUANTITY_PER_PAGE);
  };

  return (
    <div className='space-y-16 md:space-y-16 lg:space-y-16'>
      {carouselPosts?.length > 0 && (
        <CategoryCarousel
          title={heroTexts}
          items={carouselPosts as any}
          slidesPerView={1}
          slidesPerViewTablet={2}
          slidesPerViewDesktop={2.5}
          applyOverlay
          isCaseStudy
        />
      )}
      {stats && <Stats data={stats} />}
      <Container
        className='flex flex-col w-full md:flex-row md:flex-wrap gap-6 lg:flex-row 
      md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem] md:!p-0'>
        <CategoriesFilter
          categoryHandler={categoryHandler}
          categories={categoryNames}
          className=''
          defaultCategory={selectedCategory || ''}
          isCaseStudyFilter
        />
      </Container>

      <CardList initialPosts={visiblePosts as any} isCaseStudies hasNextPage={hasNextPage} loadMore={loadMore} />
    </div>
  );
}
