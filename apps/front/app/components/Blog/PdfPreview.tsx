'use client';

import { useCallback, useEffect, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import Image from 'next/image';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
};

const resizeObserverOptions = {};
const maxWidth = 800;

type PDFFile = string | File | null;

export default function Sample({ PdfUrl }: { PdfUrl: string }) {
  const [file] = useState<PDFFile>(PdfUrl);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

  // ResizeObserver for container width
  const onResize = useCallback<ResizeObserverCallback>(entries => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);
  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  // Window resize listener for mobile/desktop detection based on 768px
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
    setCurrentPage(1);
  }

  function previousPage() {
    setCurrentPage(prev => {
      if (isMobile) {
        return Math.max(prev - 1, 1);
      }
      return Math.max(prev - 2, 1);
    });
  }

  function nextPage() {
    setCurrentPage(prev => {
      if (isMobile) {
        return Math.min(prev + 1, numPages);
      }
      return Math.min(prev + 2, numPages);
    });
  }

  // Stable callback to update loaded pages
  const handlePageLoadSuccess = useCallback((pageNumber: number) => {
    setLoadedPages(prev => new Set([...prev, pageNumber]));
  }, []);

  // Memoized callbacks for onLoadSuccess to avoid inline functions in JSX
  const onPageLoadSuccessCurrent = useCallback(
    () => handlePageLoadSuccess(currentPage),
    [currentPage, handlePageLoadSuccess]
  );
  const onPageLoadSuccessNext = useCallback(
    () => handlePageLoadSuccess(currentPage + 1),
    [currentPage, handlePageLoadSuccess]
  );
  const onPageLoadSuccessPreload = useCallback(
    (pageNum: number) => () => handlePageLoadSuccess(pageNum),
    [handlePageLoadSuccess]
  );

  // Page widths based on mobile/desktop and container size
  const pageWidth = (() => {
    if (!containerWidth) return maxWidth;
    if (isMobile) {
      return Math.min(containerWidth, maxWidth) - 24;
    }
    return Math.min(containerWidth, maxWidth) / 2 - 12;
  })();

  // Generate pages to preload
  const getPagesToPreload = () => {
    const pages = [];
    const range = 2;

    for (
      let i = Math.max(1, currentPage - range);
      i <= Math.min(numPages, currentPage + range + (isMobile ? 0 : 1));
      i += 1 // replaced i++ with i += 1
    ) {
      pages.push(i);
    }
    return pages;
  };

  // Refactor nested ternary for next button disabled and className
  let isNextDisabled;
  if (isMobile) {
    isNextDisabled = currentPage >= numPages;
  } else {
    isNextDisabled = currentPage + 1 >= numPages;
  }
  const nextBtnClass = isNextDisabled
    ? 'pointer-events-none group-hover:opacity-30'
    : 'group-hover:opacity-100 hover:opacity-70';

  return (
    <div ref={setContainerRef} className='relative group w-full max-w-[800px] mx-auto select-none'>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
        <div className={`flex justify-center w-full ${isMobile ? '' : 'gap-1'}`}>
          <Page
            pageNumber={currentPage}
            width={pageWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            renderMode='canvas'
            className='pdf-page'
            onLoadSuccess={onPageLoadSuccessCurrent}
            loading={
              <div
                className='flex items-center justify-center bg-gray-100'
                style={{ width: pageWidth, height: pageWidth * 1.4 }}>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
              </div>
            }
          />
          {!isMobile && currentPage + 1 <= numPages && (
            <Page
              pageNumber={currentPage + 1}
              width={pageWidth}
              renderTextLayer={false}
              renderMode='canvas'
              renderAnnotationLayer={false}
              className='pdf-page'
              onLoadSuccess={onPageLoadSuccessNext}
              loading={
                <div
                  className='flex items-center justify-center bg-gray-100'
                  style={{ width: pageWidth, height: pageWidth * 1.4 }}>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
                </div>
              }
            />
          )}
        </div>

        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden' }}>
          {getPagesToPreload().map(pageNum =>
            !loadedPages.has(pageNum) && pageNum !== currentPage && (isMobile || pageNum !== currentPage + 1) ? (
              <Page
                key={`preload-${pageNum}`}
                pageNumber={pageNum}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                renderMode='canvas'
                onLoadSuccess={onPageLoadSuccessPreload(pageNum)}
              />
            ) : null
          )}
        </div>

        <p className='pl-2 text-left text-sm bg-neutral-800 m-0 text-neutral-100 w-full'>
          Pages {currentPage}
          {!isMobile && <span> - {Math.min(currentPage + 1, numPages)}</span>} / {numPages}
        </p>
      </Document>

      <button
        type='button'
        onClick={previousPage}
        aria-label='Previous Page'
        disabled={currentPage <= 1}
        className={`absolute flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 z-50 top-1/2 left-1 transform -translate-y-1/2 cursor-pointer
          opacity-0 transition-opacity duration-300
          ${
            currentPage <= 1 ? 'pointer-events-none group-hover:opacity-30' : 'group-hover:opacity-100 hover:opacity-70'
          }`}>
        <Image
          src='/images/icons/arrow-right-black.svg'
          width={28}
          height={28}
          alt='Previous Page'
          className='rotate-180'
        />
      </button>

      <button
        type='button'
        onClick={nextPage}
        aria-label='Next Page'
        disabled={isNextDisabled}
        className={`absolute flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 z-50 top-1/2 right-1 transform -translate-y-1/2 cursor-pointer
          opacity-0 transition-opacity duration-300
          ${nextBtnClass}`}>
        <Image src='/images/icons/arrow-right-black.svg' width={28} height={28} alt='Next Page' />
      </button>
    </div>
  );
}
