import { NextResponse } from 'next/server';
import RSS from 'rss';
import { request } from 'graphql-request';
import { DocumentNode } from 'graphql';
import { SlugPostsByPublicationDocument, PostEdge, SlugPostsByPublicationQuery } from '@/generated/graphql';

const hashnodeHost = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST || 'coderabbit-blog.hashnode.dev';
const CACHE_DURATION = 3600;
const BATCH_SIZE = 50;

async function fetchWithRetry<T>(
  endpoint: string,
  document: DocumentNode,
  variables: Record<string, unknown>
): Promise<T> {
  try {
    return await request(endpoint, document, variables, {
      'Content-Type': 'application/json',
      'User-Agent': 'CodeRabbit-RSS-Generator/1.0',
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
    throw new Error('Failed to fetch data: Unknown error');
  }
}

async function fetchAllPosts(
  endpoint: string,
  host: string,
  after: string | null = null,
  allPosts: PostEdge[] = []
): Promise<{ posts: PostEdge[]; publication: SlugPostsByPublicationQuery['publication'] }> {
  const data = await fetchWithRetry<SlugPostsByPublicationQuery>(endpoint, SlugPostsByPublicationDocument, {
    host,
    first: BATCH_SIZE,
    after,
  });

  if (!data.publication) {
    throw new Error('Publication not found');
  }

  const { edges: posts } = data.publication.posts;
  const { hasNextPage, endCursor: nextCursor } = data.publication.posts.pageInfo;

  const updatedPosts = [...allPosts, ...(posts as PostEdge[])];

  if (!hasNextPage || !nextCursor) {
    return { posts: updatedPosts, publication: data.publication };
  }

  await new Promise(resolve => {
    setTimeout(resolve, 100);
  });

  return fetchAllPosts(endpoint, host, nextCursor, updatedPosts);
}

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT) {
      return new NextResponse(JSON.stringify({ error: 'GQL endpoint not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { posts: allPosts, publication: publicationData } = await fetchAllPosts(
      process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
      hashnodeHost
    );

    if (allPosts.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'No posts found' }), { status: 404 });
    }

    const feed = new RSS({
      title: publicationData.title,
      description: publicationData.descriptionSEO || '',
      feed_url: 'https://www.coderabbit.ai/feed',
      site_url: 'https://www.coderabbit.ai/blog',
      image_url: publicationData.preferences?.logo || '',
      language: 'en',
      pubDate: new Date(),
      copyright: `All rights reserved ${new Date().getFullYear()}, CodeRabbit`,
      custom_namespaces: {
        dc: 'http://purl.org/dc/elements/1.1/',
        hashnode: 'https://hashnode.com/',
      },
    });

    allPosts.forEach(({ node: post }) => {
      feed.item({
        title: post.title,
        description: post.content?.html || '',
        url: `https://www.coderabbit.ai/blog/${post.slug}`,
        guid: post.slug,
        categories: post.tags?.map((tag: { name: string }) => tag.name) || [],
        author: post.author?.name || '',
        date: new Date(post.publishedAt),
        custom_elements: [
          { 'dc:creator': post.author?.name || '' },
          { 'hashnode:coverImage': post.coverImage?.url || '' },
          { 'content:encoded': post.content?.html || '' },
        ],
      });
    });

    const rssContent = feed.xml();

    return new NextResponse(rssContent, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': `public, max-age=${CACHE_DURATION}`,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating RSS feed:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
