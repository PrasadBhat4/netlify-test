'use client';

import { useMemo } from 'react';
import { Post } from '@/generated/graphql';
import Card from '@/app/components/Blog/Card';
import Container from '@/app/components/Common/Container';
import ShowMore from './ShowMore';

const CardList = ({
  initialPosts,
  isCaseStudies = false,
  hasNextPage = false,
  loadMore = () => {},
}: Readonly<{
  initialPosts: Post[];
  isCaseStudies?: boolean;
  hasNextPage?: boolean;
  loadMore?: () => void;
}>) => {
  const filteredPosts = useMemo(() => {
    return initialPosts;
  }, [initialPosts]);

  const internalLoadMore = () => {
    loadMore();
  };

  return (
    <Container className='relative md:!p-0 md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
      <div className='flex flex-wrap gap-10 md:gap-10'>
        {filteredPosts.map(post => (
          <div className='w-full md:w-[47.4%] lg:w-[30.9%]' key={post.id}>
            <Card post={post as Post} isCaseStudy={isCaseStudies} />
          </div>
        ))}
      </div>
      <ShowMore buttonText='See more' isShowing={hasNextPage} clickHandler={internalLoadMore} />
    </Container>
  );
};

export default CardList;
