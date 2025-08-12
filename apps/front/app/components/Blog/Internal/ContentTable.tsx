'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHash } from '@/app/lib/hooks/useHash';
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
  const currentHash = useHash();
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
    <ul
      className={`flex flex-col gap-2 font-normal ${
        parentId ? 'pl-2' : 'overflow-auto max-h-[400px] content-table-wrapper'
      }`}>
      {children.map(item => (
        <li key={item.id}>
          <a
            href={`#heading-${item.slug}`}
            onClick={goToLinkSection}
            className={`heading-${item.slug} table-header text-[14px] text-neutral-900 dark:text-neutral-0 ${
              currentHash === `#heading-${item.slug}` ? 'font-bold' : ''
            }`}>
            <Image
              className='arrow-ct inline-block pr-[8px]'
              src='/images/icons/arrow-right-aqua.svg'
              alt='open close icon'
              id={`arrow-heading-${item.slug}`}
              width={24}
              height={24}
              style={
                currentHash === `#heading-${item.slug}`
                  ? {
                      display: 'inline-block',
                    }
                  : { display: 'none' }
              }
            />

            {decodeHtmlEntities(item.title)}
          </a>

          <ContentTable data={data} parentId={item.id} />
        </li>
      ))}
    </ul>
  );
};

export default ContentTable;
