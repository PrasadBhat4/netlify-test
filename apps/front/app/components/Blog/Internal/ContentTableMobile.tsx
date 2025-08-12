'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PostFullFragment } from '@/generated/graphql';
import { decodeHtmlEntities } from '@/app/lib/utils';

type TableOfContentsItem = PostFullFragment['features']['tableOfContents']['items'][number];

export const mapTableOfContentItems = (toc: TableOfContentsItem[]) => {
  try {
    // `toc` is sometimes an array of arrays or an array of objects. Hashnode is trying to investigate this issue.
    // Meanwhile, we can use the following code to map the table of content items to handle both cases.
    return (toc ?? []).map(tocItem => {
      const item = Array.isArray(tocItem) ? tocItem[0] : tocItem;
      return {
        id: item.id,
        level: item.level,
        slug: item.slug,
        title: item.title,
        parentId: item.parentId ?? null,
      };
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while mapping table of content items', {
      error,
    });
    return [];
  }
};

const ContentTable = ({
  data,
  parentId,
}: {
  data: TableOfContentsItem[];
  parentId: TableOfContentsItem['parentId'];
}) => {
  const router = useRouter();
  const children = data.filter(item => item.parentId === parentId);
  if (children.length === 0) return null;

  const goToLinkSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('href');
    router.push(id);
    router.refresh();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const hash = window?.location?.hash;
    if (hash && hash !== '') {
      router.push(hash);
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // if it has parentId, then it is a nested list, else it is the main list
    <ul className={`flex flex-col gap-2 p-0 font-normal  ${parentId ? 'pl-2' : 'overflow-auto'}`}>
      {children.map(item => (
        <li key={item.id}>
          <a
            className='text-[14px] m-0 text-neutral-900 dark:text-neutral-0 font-normal'
            href={`#heading-${item.slug}`}
            onClick={goToLinkSection}>
            {decodeHtmlEntities(item.title)}
          </a>
          <ContentTable data={data} parentId={item.id} />
        </li>
      ))}
    </ul>
  );
};

export default ContentTable;
