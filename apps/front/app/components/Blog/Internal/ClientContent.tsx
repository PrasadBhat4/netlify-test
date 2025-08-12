'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { twMerge as tm } from 'tailwind-merge';
import { MarkdownToHtml } from '../../markdown-to-html';
import ContentTable from './ContentTableMobile';

import { ARROW_ROTATION } from '@/app/lib/constants';

const ArrowDownUp = ({ isShowing }: { isShowing: boolean }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`w-6 h-6 text-orange-500 ${isShowing ? ARROW_ROTATION.down : ARROW_ROTATION.up}`}>
      <path
        d='M20.2896 11.7569C16.0056 11.7569 12.5327 8.28404 12.5327 4'
        stroke='currentColor'
        strokeWidth='1.55139'
      />
      <path
        d='M20.2896 11.757C16.0056 11.757 12.5327 15.2299 12.5327 19.5139'
        stroke='currentColor'
        strokeWidth='1.55139'
      />
      <path d='M17.9625 11.7568L4 11.7568' stroke='currentColor' strokeWidth='1.55139' />
    </svg>
  );
};

const ShowMore = ({
  buttonText,
  isShowing = false,
  clickHandler,
  className = '',
}: Readonly<{
  buttonText: string;
  clickHandler: () => void;
  isShowing?: boolean;
  className?: string;
}>) => {
  return (
    <div
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          clickHandler();
        }
      }}
      className={tm(
        `absolute h-[7rem] inset-x-0 bottom-0 items-center justify-center flex *:first-letter:
        ${
          isShowing
            ? 'bg-gradient-to-t from-[#F6F6F1] via-[#F6F6F1] to-transparent dark:bg-gradient-to-t dark:from-[#000000] dark:via-[#000000] dark:to-transparent'
            : 'h-auto'
        }
        `,
        className
      )}
      onClick={clickHandler}>
      <div className='flex self-end'>
        <span className='mr-4 font-bold font-heading body-lg-xs dark:text-neutral-0'>{buttonText}</span>
        <ArrowDownUp isShowing={isShowing} />
      </div>
    </div>
  );
};

interface Props {
  data: any;
}

const MIN_QUANTITY_OF_ITEMS_TO_SHOW_MORE = 6;
const highlightJsMonokaiTheme =
  '.hljs{display:block;overflow-x:auto;padding:.5em;background:#23241f}.hljs,.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-builtin-name,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}';

const ClientContent = ({ data }: Readonly<Props>) => {
  const [showMore, setShowMore] = useState(true);
  const [currentHash, setCurrentHash] = useState('');
  const locale = useLocale();
  const headingElementsRef = useRef<any>({});
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  const showLoadMore = (data?.features?.tableOfContents?.items?.length ?? 0) > MIN_QUANTITY_OF_ITEMS_TO_SHOW_MORE;

  useEffect(() => {
    if (!currentHash || currentHash === '') return;
    // remove bold from other headers
    const prevHeaderElements = document?.querySelectorAll(`.table-header`) as NodeListOf<HTMLElement>;
    const prevArrowElements = document?.querySelectorAll(`.arrow-ct`) as NodeListOf<HTMLElement>;
    prevArrowElements?.forEach?.(prevArrowElement => {
      prevArrowElement?.style?.setProperty?.('display', 'none');
    });
    prevHeaderElements?.forEach?.(prevHeaderElement => {
      prevHeaderElement?.style?.setProperty?.('font-weight', '400');
    });

    // bold the current hash
    const headerElement = document?.querySelector(`.${currentHash}`) as HTMLElement;
    const arrowElement = document?.getElementById(`arrow-${currentHash}`) as HTMLElement;
    arrowElement?.style?.setProperty?.('display', 'inline-block');
    headerElement?.style?.setProperty?.('font-weight', '600');
  }, [currentHash]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'));
    const observer = new IntersectionObserver(
      entries => {
        headingElementsRef.current = entries.reduce((map, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        }, headingElementsRef.current);
        const visibleHeadings: any[] = [];
        Object.keys(headingElementsRef.current).forEach((key: any) => {
          const headingElement = headingElementsRef.current[key];
          if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
        });
        setCurrentHash(visibleHeadings?.[0]?.target?.id);
        if (visibleHeadings.length === 0) {
          const activeElement = headings.find(el => el.id === currentHash);
          const activeIndex = headings.findIndex(el => el.id === currentHash);

          const activeIdYcoord = activeElement?.getBoundingClientRect().y;
          if (activeIdYcoord && activeIdYcoord > 170 && activeIndex !== 0) {
            setCurrentHash(headings[activeIndex - 1].id);
          }
        }
        return null;
      },
      {
        rootMargin: '-12% 0% -75% 0%',
      }
    );
    headings.forEach(heading => {
      observer.observe(heading);
    });
    return () => observer.disconnect();
  }, [currentHash]);
  return (
    <>
      <div className='relative lg:hidden wrapper-content-table'>
        {data?.features?.tableOfContents?.isEnabled && (
          <>
            <h2 className='text-body-sm text-neutral-900 dark:text-neutral-0'>Content</h2>
            <ContentTable parentId={null} data={data.features.tableOfContents.items} />
          </>
        )}

        {showLoadMore && (
          <ShowMore
            isShowing={showMore}
            buttonText={showMore ? 'Show more' : 'Show less'}
            clickHandler={handleShowMore}
          />
        )}
      </div>
      <hr className='block mt-5 md:hidden' />

      <Suspense fallback={<div />}>
        <MarkdownToHtml
          className={`${data?.features?.tableOfContents?.isEnabled ? '' : '!max-w-full'}`}
          contentMarkdown={data.content.markdown}
          locale={locale}
        />
      </Suspense>
      <style dangerouslySetInnerHTML={{ __html: highlightJsMonokaiTheme }} />
    </>
  );
};

export default ClientContent;
