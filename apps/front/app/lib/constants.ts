export const ARROW_POSITION = {
  left: 'left',
  right: 'right',
};

export const RELOAD_ICON_POSITION = {
  left: 'left',
  right: 'right',
};

export const ARROW_ROTATION = {
  left: '-rotate-180',
  right: 'rotate-0',
  up: '-rotate-90',
  down: 'rotate-90',
};

export const INITIAL_ACTIVE_CATEGORY = 'All';

// These are the tags that are mapped to the hashnode blog
export const HASHNODE_BLOG_TAGS: Record<string, string> = {
  popular: '5dec87f2b6829d7f1423a0b0',
  featured: '665a7b1113ca95e7b7d53aec',
  announcements: '56744721958ef13879b94ab4',
  product: '577f7bc442d3fa70a37e450e',
};

export const CASE_STUDY_TAG = '5e4ac93b205a551d167e6438';
export const PINNED_POST_TAG = '63d713e88dd6c5e9129b67af';
export const PUBLICATION_ID = '66febaf505405329db5c20d9';
export const HASHNODE_HOST = 'coderabbit-blog.hashnode.dev';
export const EDUCATIONAL_TAG = '62fe6feaf1a220fcdbb64d2c';
export const LANGUAGES_TAGS: Record<string, string> = {
  en: '5749242562a5c1ef797820b7',
  fr: '59f3752776fb33237f0ad586',
  ja: '5e12db321a3128c630de7ce6',
};

export const getTagId = (tag: string) => {
  if (!HASHNODE_BLOG_TAGS[tag]) {
    return [];
  }
  return [HASHNODE_BLOG_TAGS[tag]];
};

export const GET_HASHNODE_POSTS_FILTERED = `query SearchPostsFiltered($publicationId: ObjectId!, $first: Int!, $after: String, $query: String, $tags: [ID!]) {
          searchPostsOfPublication(
        first: $first,
        after: $after,
        filter: {
            publicationId: $publicationId
            requiredTagsIds: $tags
            query: $query
        },
        sortBy:DATE_PUBLISHED_DESC
    ) {
        pageInfo {
            hasNextPage
            endCursor
        }
        edges {
            cursor
            node {
                id
                slug
                previousSlugs
                title
                subtitle
                url
                canonicalUrl
                cuid
                brief
                readTimeInMinutes
                views
                reactionCount
                replyCount
                responseCount
                featured
                bookmarked
                featuredAt
                publishedAt
                updatedAt
                hasLatexInPost
                isFollowed
                isAutoPublishedFromRSS
                sourcedFromGithub
                author {
                    id
                    username
                    name
                    profilePicture
                    followersCount
                    followingsCount
                    tagline
                    dateJoined
                    location
                    availableFor
                    ambassador
                    deactivated
                    following
                }
                coAuthors {
                    id
                    username
                    name
                    profilePicture
                    followersCount
                    followingsCount
                    tagline
                    dateJoined
                    location
                    availableFor
                    ambassador
                }
                tags {
                    id
                    name
                    slug
                    logo
                    tagline
                    followersCount
                    postsCount
                }
                coverImage {
                    url
                    isPortrait
                    attribution
                    photographer
                    isAttributionHidden
                }
                series {
                    id
                    name
                    createdAt
                    coverImage
                    cuid
                    slug
                    sortOrder
                }
                content {
                    markdown
                    html
                    text
                }
                seo {
                    title
                    description
                }
                ogMetaData {
                    image
                }
            }
        }
    }
      }`;

export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};
