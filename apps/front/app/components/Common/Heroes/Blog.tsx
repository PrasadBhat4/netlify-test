import Image from 'next/image';
import Container from '@/app/components/Common/Container';
import CategoriesFilter from '@/app/components/Common/CategoriesFilter';

interface Props {
  data: Partial<{
    Title: string;
    Description: string;
    SearchPlaceholder: string;
  }>;
  strapiLayout: {
    ResultsFor: string;
    NoResultsTitle: string;
    NoResultsSubtext: string;
    ResultsError: string;
    AllArticles: string;
    Loading: string;
    LoadMoreArticles: string;
    CategoryAll: string;
    CategoryPopular: string;
    CategoryFeatured: string;
    CategoryAnnouncements: string;
    CategoryProduct: string;
  };
  search: string;
  hideFilters?: boolean;
  categoryHandler: (category: string) => void;
  searchHandler: (search: string) => void;
  handleSearch: () => void;
}

const Hero = ({
  data = {},
  search,
  strapiLayout,
  categoryHandler,
  searchHandler,
  handleSearch,
  hideFilters = false,
}: Readonly<Props>) => {
  const categories = [
    strapiLayout.CategoryAll,
    strapiLayout.CategoryPopular,
    strapiLayout.CategoryFeatured,
    strapiLayout.CategoryAnnouncements,
    strapiLayout.CategoryProduct,
  ];
  return (
    <Container className='mt-14 md:mt-10'>
      <div className='relative flex flex-col items-center justify-center px-6 py-8 md:p-20 bg-cream-400 dark:bg-neutral-900 rounded-3xl md:rounded-[3rem] lg:rounded-[5rem] overflow-hidden'>
        <div className='flex flex-col items-center md:px-20'>
          <h1 className='font-bold text-center font-heading text-heading-lg-sm md:text-heading-xl-sm lg:text-heading-xl'>
            {data?.Title}
          </h1>
          <p className='mt-3 text-center md:mt-6 text-body-lg-sm lg:text-body-lg'>{data?.Description}</p>
        </div>
        <div
          className='relative flex flex-col justify-center w-full max-w-[45.25rem] my-6 md:my-10 lg:my-[3.375rem] px-4 bg-neutral-0 rounded-xl cursor-text autofill:bg-transparent  
    border-2 border-cream-600 hover:border-pink-600 dark:hover:border-pink-500
    focus-within:border-pink-600 dark:focus-within:border-pink-500 
    focus-within:outline-pink-600 dark:focus-within:outline-pink-500 
    focus-within:caret-pink-600 dark:focus-within:caret-pink-500
    disabled:border-neutral-300 disabled:text-neutral-400 disabled:pointer-events-none
    min-h-16 dark:bg-neutral-800  dark:border-neutral-600
    '>
          <input
            type='search'
            placeholder={data?.SearchPlaceholder}
            value={search}
            onChange={e => searchHandler(e.target.value)}
            className='w-full h-full bg-transparent ring-0 outline-none min-h-16 text-body-md text-neutral-900 dark:text-neutral-0 placeholder:text-neutral-900 placeholder:dark:text-neutral-0 autofill:bg-transparent'
            onKeyUp={e => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <Image
            src='/images/icons/search.svg'
            width={24}
            height={24}
            alt='search icon'
            className='absolute right-3 w-6 h-6 cursor-pointer bg-neutral-0 dark:hidden'
            onClick={handleSearch}
          />
          <Image
            src='/images/icons/search-dark.svg'
            width={24}
            height={24}
            alt='search icon'
            className='hidden absolute right-3 w-6 h-6 cursor-pointer dark:inline dark:bg-neutral-800'
            onClick={handleSearch}
          />
        </div>
        {!hideFilters && (
          <div className='flex relative -bottom-8 w-full md:absolute md:bottom-0'>
            <CategoriesFilter
              categoryHandler={categoryHandler}
              categories={categories}
              className='w-screen [&>div>p]:h-[3.25rem] [&>div>p]:md:h-[5.5rem]'
            />
          </div>
        )}
        <div className='hidden md:block absolute top-[4.0625rem] -left-[1.625rem] lg:top-[3.09375rem] lg:-left-[2.625rem]'>
          <Image
            src='/images/shapes/double-halfmoon1.png'
            alt='hero shape'
            width={189}
            height={189}
            className='hidden object-cover lg:block'
            priority
          />
          <Image
            src='/images/shapes/double-halfmoon1.png'
            alt='hero shape'
            width={94.5}
            height={94.5}
            className='object-cover lg:hidden'
            priority
          />
        </div>
        <div className='hidden md:block absolute top-[4.0625rem] -right-[2.21875rem] lg:top-[2.5625rem] lg:-right-[6.5rem]'>
          <Image
            src='/images/shapes/circle-square1.png'
            alt='hero shape'
            width={208}
            height={208}
            className='hidden object-cover -rotate-90 lg:block'
            priority
          />
          <Image
            src='/images/shapes/circle-square1.png'
            alt='hero shape'
            width={94.5}
            height={94.5}
            className='object-cover -rotate-90 lg:hidden'
            priority
          />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
