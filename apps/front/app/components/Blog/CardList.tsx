'use client';

import { useMemo, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import request from 'graphql-request';
import { PageInfo, Post } from '@/generated/graphql';
import Card from '@/app/components/Blog/Card';
import Container from '@/app/components/Common/Container';
import ShowMore from '@/app/components/Common/ShowMore';
import {
  CASE_STUDY_TAG,
  EDUCATIONAL_TAG,
  GET_HASHNODE_POSTS_FILTERED,
  getTagId,
  LANGUAGES_TAGS,
  PUBLICATION_ID,
} from '@/app/lib/constants';

const QUANTITY_PER_PAGE = 9;

const CardList = ({
  initialPosts,
  initialPageInfo,
  strapiLayout,
  isCaseStudies = false,
  locale = 'en',
}: Readonly<{
  initialPosts: Post[];
  initialPageInfo: PageInfo;
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
  featuredId?: string;
  isCaseStudies?: boolean;
  isResults?: boolean;
  locale?: string;
}>) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasRemainingPosts, setHasRemainingPosts] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const tags = searchParams.get('tags');
  const prevTagsRef = useRef<string | null>(null);
  const prevSearchRef = useRef<string | null>(null);

  if (prevTagsRef.current !== tags || prevSearchRef.current !== search) {
    setPosts([]);
    setPageInfo(initialPageInfo);
    setIsLoadingMore(false);
    setIsError(false);
    setHasRemainingPosts(false);
    prevTagsRef.current = tags;
    prevSearchRef.current = search;
  }

  const filteredPosts = useMemo(() => {
    const combinedPosts = [...initialPosts, ...posts];
    const uniquePosts = combinedPosts.filter((post, index, self) => index === self.findIndex(p => p.id === post.id));

    return uniquePosts.sort((a: Post, b: Post) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [posts, initialPosts]);

  const hasNextPage = useMemo(() => {
    const hasMorePages = pageInfo?.hasNextPage;
    const hasRemaining = hasRemainingPosts;
    if (!hasMorePages && !hasRemaining) {
      return false;
    }
    return hasMorePages || hasRemaining;
  }, [pageInfo, hasRemainingPosts]);

  const tagSelection = useMemo(() => {
    const selection = isCaseStudies
      ? [CASE_STUDY_TAG]
      : getTagId(
          String(tags || '')
            .trim()
            .toLowerCase()
        );
    selection.push(LANGUAGES_TAGS[locale]);
    return selection;
  }, [isCaseStudies, tags, locale]);

  const loadMore = async () => {
    try {
      setIsLoadingMore(true);
      if (isError) setIsError(false);

      const existingPostIds = new Set([...initialPosts, ...posts].map(post => post.id));

      let currentCursor = posts.length === 0 ? null : pageInfo?.endCursor;
      let postsToAdd: Post[] = [];
      let finalPageInfo = pageInfo;

      if (hasRemainingPosts && (currentCursor === undefined || !pageInfo?.hasNextPage)) {
        const response = await request<any, any>(
          process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT ?? '',
          GET_HASHNODE_POSTS_FILTERED,
          {
            first: 20,
            publicationId: PUBLICATION_ID,
            query: search ?? undefined,
            tags: tagSelection,
            after: pageInfo?.endCursor,
          }
        );

        const fetchedPosts = response.searchPostsOfPublication.edges?.map((edge: any) => edge.node as Post) ?? [];
        const validPosts = fetchedPosts.filter(
          (post: Post) => !post.tags?.some((tag: any) => tag.id === EDUCATIONAL_TAG) && !existingPostIds.has(post.id)
        );

        if (validPosts.length > 0) {
          postsToAdd = validPosts.slice(0, QUANTITY_PER_PAGE);
          finalPageInfo = {
            hasNextPage: false,
            endCursor: undefined,
          };
          setHasRemainingPosts(false);
        } else {
          setHasRemainingPosts(false);
        }
      } else {
        // eslint-disable-next-line no-await-in-loop
        while (postsToAdd.length < QUANTITY_PER_PAGE && currentCursor !== undefined) {
          // eslint-disable-next-line no-await-in-loop
          const response = await request<any, any>(
            process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT ?? '',
            GET_HASHNODE_POSTS_FILTERED,
            {
              first: 20,
              publicationId: PUBLICATION_ID,
              query: search ?? undefined,
              tags: tagSelection,
              after: currentCursor,
            }
          );

          const fetchedPosts = response.searchPostsOfPublication.edges?.map((edge: any) => edge.node as Post) ?? [];
          const validPosts = fetchedPosts.filter(
            (post: Post) => !post.tags?.some((tag: any) => tag.id === EDUCATIONAL_TAG) && !existingPostIds.has(post.id)
          );
          const needed = QUANTITY_PER_PAGE - postsToAdd.length;
          const postsToTake = validPosts.slice(0, needed);
          postsToAdd = [...postsToAdd, ...postsToTake];

          postsToTake.forEach((post: Post) => existingPostIds.add(post.id));

          if (postsToTake.length > 0) {
            const lastTakenPost = postsToTake[postsToTake.length - 1];
            const lastTakenIndex = fetchedPosts.findIndex((post: Post) => post.id === lastTakenPost.id);

            finalPageInfo = {
              hasNextPage: response.searchPostsOfPublication.pageInfo?.hasNextPage || false,
              endCursor:
                response.searchPostsOfPublication.edges?.[lastTakenIndex]?.cursor ||
                response.searchPostsOfPublication.pageInfo?.endCursor,
            };

            if (postsToTake.length === validPosts.length && response.searchPostsOfPublication.pageInfo?.hasNextPage) {
              currentCursor = response.searchPostsOfPublication.pageInfo?.endCursor;
            } else {
              const remainingPosts = validPosts.slice(postsToTake.length);
              if (remainingPosts.length > 0) {
                setHasRemainingPosts(true);
              }
              break;
            }
          } else {
            finalPageInfo = response.searchPostsOfPublication.pageInfo;
            currentCursor = response.searchPostsOfPublication.pageInfo?.hasNextPage
              ? response.searchPostsOfPublication.pageInfo?.endCursor
              : undefined;
          }
        }
      }

      if (postsToAdd.length > 0) {
        setPosts([...posts, ...postsToAdd]);
        setPageInfo(finalPageInfo);
      } else if (currentCursor === undefined && !finalPageInfo?.hasNextPage && !hasRemainingPosts) {
        setHasRemainingPosts(false);
      }
    } catch (__) {
      setIsError(true);
    } finally {
      setIsLoadingMore(false);
    }
  };
  return (
    <Container className='relative md:!p-0 md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
      {search && search.length > 0 && (
        <h3 className='mb-6 font-heading text-[20px] sm:text-[28px] md:text-[32px]'>
          {strapiLayout.ResultsFor} <strong>&quot;{search}&quot;</strong>
        </h3>
      )}
      <div className='flex flex-wrap gap-6 md:gap-10'>
        {filteredPosts.map(post => (
          <div className='w-full md:w-[47.4%] lg:w-[30.9%]' key={post.id}>
            <Card post={post} />
          </div>
        ))}
      </div>
      <ShowMore
        buttonText={isLoadingMore ? strapiLayout.Loading : strapiLayout.LoadMoreArticles}
        isShowing={!hasNextPage}
        clickHandler={loadMore}
      />
      {isError && <span>{strapiLayout.ResultsError}</span>}
    </Container>
  );
};

export default CardList;
