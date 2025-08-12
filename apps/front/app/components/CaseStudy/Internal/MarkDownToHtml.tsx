/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { memo } from 'react';
import { twMerge as tm } from 'tailwind-merge';
import { markdownToHtml } from '@/utils/renderer/markdownToHtml';

type Props = {
  contentMarkdown: string;
  className?: string;
};

const _MarkdownToHtml = ({ contentMarkdown, className = '' }: Props) => {
  const content = markdownToHtml(contentMarkdown);

  return (
    <div
      className={tm(
        'w-full mx-auto hashnode-content-style md:max-w-screen-md markdown-blog  [&_p]:!text-body-md px-0 [&_li]:marker:text-neutral-900 [&_li]:marker:dark:text-neutral-0',
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export const MarkdownToHtml = memo(_MarkdownToHtml);
