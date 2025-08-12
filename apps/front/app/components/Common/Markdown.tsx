import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { twMerge as tm } from 'tailwind-merge';
import Link from '@/app/components/Common/Link';

interface Props {
  text: string;
  className?: string;
}

const options: MarkdownToJSX.Options = {
  overrides: {
    a: {
      component: ({ children, href }: any) => (
        <Link href={href} text={children} isExternal className='underline-offset-4' />
      ),
    },
  },
};

const MarkdownComponent = ({ text, className = '' }: Readonly<Props>) => {
  return (
    <div className={tm('prose dark:prose-invert', className)}>
      <Markdown options={options}>{text ?? ''}</Markdown>
    </div>
  );
};

export default MarkdownComponent;
