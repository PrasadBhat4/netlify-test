import request from 'graphql-request';
import { Post } from '@/generated/graphql';
import {
  EDUCATIONAL_TAG,
  GET_HASHNODE_POSTS_FILTERED,
  getTagId,
  LANGUAGES_TAGS,
  PINNED_POST_TAG,
  PUBLICATION_ID,
} from '@/app/lib/constants';
import { getCookieLocale } from '@/i18n/locale';

const QUANTITY_PER_PAGE = 9;
const QUANTITY_PER_PAGE_FEATURED = 1;
const MAX_FETCH_ATTEMPTS = 5; // Prevent infinite loops
const FETCH_BATCH_SIZE = 20; // Fetch 20 posts at a time

export const getHashnodeArticles = async ({
  query,
  tags,
  limit = QUANTITY_PER_PAGE,
  after,
}: {
  query?: string;
  tags?: string;
  limit?: number;
  after?: string;
}): Promise<{ initialPosts: Post[]; initialPageInfo: any; featuredPost: Post }> => {
  'use server';
  const locale = await getCookieLocale();
  let tagSelection: string[] = [];

  if (tags) {
    tagSelection = getTagId(String(tags).trim().toLowerCase());
    tagSelection.push(LANGUAGES_TAGS[locale]);
  } else {
    tagSelection = [LANGUAGES_TAGS[locale]];
  }

  let initialPosts: Post[] = [];
  let finalPageInfo = null;
  let currentAfter = after;
  let attempts = 0;

  const featuredPosts = await request<any, any>(
    process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT ?? '',
    GET_HASHNODE_POSTS_FILTERED,
    {
      first: QUANTITY_PER_PAGE_FEATURED,
      publicationId: PUBLICATION_ID,
      tags: [PINNED_POST_TAG, LANGUAGES_TAGS[locale]],
    }
  );

  while (initialPosts.length < limit && attempts < MAX_FETCH_ATTEMPTS) {
    attempts++;

    const filteredPosts = await request<any, any>(
      process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT ?? '',
      GET_HASHNODE_POSTS_FILTERED,
      {
        first: FETCH_BATCH_SIZE,
        publicationId: PUBLICATION_ID,
        query: query ?? undefined,
        tags: tagSelection,
        after: currentAfter,
      }
    );

    const fetchedPosts = (filteredPosts.searchPostsOfPublication.edges ?? []).map((edge: any) => edge.node as Post);

    const filteredPostsWithoutEducational = fetchedPosts.filter(
      (post: Post) => !post.tags?.some((tag: any) => tag.id === EDUCATIONAL_TAG)
    );

    const postsNeeded = limit - initialPosts.length;
    const postsToTake = filteredPostsWithoutEducational.slice(0, postsNeeded);
    initialPosts = [...initialPosts, ...postsToTake];

    if (postsToTake.length < filteredPostsWithoutEducational.length) {
      const lastTakenPost = postsToTake[postsToTake.length - 1];
      const lastTakenIndex = fetchedPosts.findIndex((post: Post) => post.id === lastTakenPost.id);

      finalPageInfo = {
        hasNextPage: true,
        endCursor:
          filteredPosts.searchPostsOfPublication.edges?.[lastTakenIndex]?.cursor ||
          filteredPosts.searchPostsOfPublication.pageInfo?.endCursor,
      };
      break;
    }

    finalPageInfo = filteredPosts.searchPostsOfPublication.pageInfo;
    currentAfter = filteredPosts.searchPostsOfPublication.pageInfo?.endCursor;

    if (!filteredPosts.searchPostsOfPublication.pageInfo?.hasNextPage) {
      break;
    }
  }

  const featuredPost = featuredPosts.searchPostsOfPublication.edges?.[0]?.node as Post;

  return { initialPosts, initialPageInfo: finalPageInfo, featuredPost };
};

export const getHashnodeArticlesByTag = async ({
  tag,
}: {
  tag: string;
}): Promise<{ initialPosts: Post[]; initialPageInfo: any }> => {
  'use server';
  const locale = await getCookieLocale();
  const tagSelection = getTagId(String(tag).trim().toLowerCase());
  tagSelection.push(LANGUAGES_TAGS[locale]);

  let initialPosts: Post[] = [];
  let finalPageInfo = null;
  let attempts = 0;

  while (initialPosts.length < QUANTITY_PER_PAGE && attempts < MAX_FETCH_ATTEMPTS) {
    attempts++;

    const filteredPosts = await request<any, any>(
      process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT ?? '',
      GET_HASHNODE_POSTS_FILTERED,
      {
        first: FETCH_BATCH_SIZE,
        publicationId: PUBLICATION_ID,
        tags: tagSelection,
      }
    );

    const fetchedPosts = (filteredPosts.searchPostsOfPublication.edges ?? []).map((edge: any) => edge.node as Post);

    const filteredPostsWithoutEducational = fetchedPosts.filter(
      (post: Post) => !post.tags?.some((tag: any) => tag.id === EDUCATIONAL_TAG)
    );

    const postsNeeded = QUANTITY_PER_PAGE - initialPosts.length;
    const postsToTake = filteredPostsWithoutEducational.slice(0, postsNeeded);
    initialPosts = [...initialPosts, ...postsToTake];

    if (postsToTake.length < filteredPostsWithoutEducational.length) {
      const lastTakenPost = postsToTake[postsToTake.length - 1];
      const lastTakenIndex = fetchedPosts.findIndex((post: Post) => post.id === lastTakenPost.id);

      finalPageInfo = {
        hasNextPage: true,
        endCursor:
          filteredPosts.searchPostsOfPublication.edges?.[lastTakenIndex]?.cursor ||
          filteredPosts.searchPostsOfPublication.pageInfo?.endCursor,
      };
      break;
    }
    finalPageInfo = filteredPosts.searchPostsOfPublication.pageInfo;

    if (!filteredPosts.searchPostsOfPublication.pageInfo?.hasNextPage) {
      break;
    }
  }

  return { initialPosts, initialPageInfo: finalPageInfo };
};
