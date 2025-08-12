'use client';

import Card from '@/app/components/HoppyCorner/Card/ComicCard';
import Container from '@/app/components/Common/Container';
import { ComicPost } from '@/app/lib/types';

const CardList = ({
  initialPosts,
}: Readonly<{
  initialPosts: ComicPost[];
}>) => {
  return (
    <Container className='relative md:!p-0 md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
      <div className='flex flex-wrap gap-6 md:gap-10'>
        {initialPosts?.map(post => (
          <div className='w-full md:w-[47.4%] lg:w-[30.9%]' key={post?.id}>
            <Card post={post?.attributes} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CardList;
