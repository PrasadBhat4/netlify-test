import Image from 'next/image';
import { format } from 'date-fns';

interface Props {
  date: string;
  readTime: number;
  author: any;
  coAuthors: any[];
}

const CommaSeparatedAuthors = ({ authors }: { authors: any[] }) => {
  return authors.map((author, index) => {
    let separator = ', ';
    if (!author) return null;
    if (index === authors.length - 2) separator = ' and ';
    if (index === authors.length - 1) separator = '';

    return (
      <span key={`${author.id}-comma-separated-id-key`} className='font-semibold text-body-sm-sm md:text-body-sm'>
        {author.name}
        <span className='font-normal text-neutral-600 dark:text-neutral-300'>{separator}</span>
      </span>
    );
  });
};

const AuthorDate = ({ date, readTime, author, coAuthors }: Readonly<Props>) => {
  const authorsArray = [author, ...(coAuthors || [])];
  const formatedDate = format(new Date(date), 'MMMM dd, yyyy');
  return (
    <div className='flex flex-wrap md:flex-nowrap md:justify-between items-center p-4 mt-6 md:mt-8 bg-cream-400 dark:bg-neutral-900 rounded-[1.25rem]'>
      <div id='PicturesAndAuthorsNames' className='flex items-center flex-nowrap gap-x-1'>
        <div className='flex'>
          {authorsArray.map((coAuthor, index) => (
            <div
              key={`${coAuthor?.id?.toString()}-blog-author`}
              style={{ zIndex: index + 1 }}
              className='overflow-hidden rounded-full bg-neutral-0 dark:bg-neutral-900 md:mr-3 h-8 w-8 border-2 border-cream-400 dark:border-neutral-900 md:h-9 md:w-9 [&:not(:first-of-type)]:-ml-2 md:[&:not(:first-of-type)]:-ml-5 '>
              <Image
                src={coAuthor?.profilePicture || ''}
                width={40}
                height={40}
                alt={coAuthor?.name}
                className='object-cover w-10 h-10 m-0'
              />
            </div>
          ))}
        </div>
        <p className='m-0 text-body-sm-sm text-neutral-900 dark:text-neutral-0'>
          <span className='text-neutral-600 dark:text-neutral-300 '>by </span>
          <CommaSeparatedAuthors authors={authorsArray as any[]} />
        </p>
      </div>
      <div className='flex flex-row items-end pl-2 mt-2 gap-x-1 md:mt-0 gap-y-1 md:gap-0 md:flex-col'>
        <p className='m-0 text-body-sm-sm text-neutral-600 dark:text-neutral-300 md:text-right text-nowrap'>
          {formatedDate}
        </p>
        <p className='m-0 font-semibold text-pink-600 text-body-sm-sm'>{readTime} min read</p>
      </div>
    </div>
  );
};

export default AuthorDate;
