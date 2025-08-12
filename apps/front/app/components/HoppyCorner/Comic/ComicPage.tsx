import Container from '@/app/components/Common/Container';
import CardList from '@/app/components/HoppyCorner/Card/CardList';
import { ComicPost } from '@/app/lib/types';

interface Props {
  data: ComicPost[];
  ComicPageTitle?: string;
}
const ComicPage = ({ data, ComicPageTitle }: Readonly<Props>) => {
  return (
    <Container className='space-y-16 lg:space-y-[6.25rem] md:!p-0 md:max-w-[48.25rem] lg:max-w-[69.75rem] xl:max-w-[87.25rem]'>
      <div className='flex flex-col gap-y-6 lg:gap-y-10'>
        {ComicPageTitle && (
          <h2 className='font-bold font-heading text-subtitle-sm md:text-heading-md '>{ComicPageTitle}</h2>
        )}
        <CardList initialPosts={data} />
      </div>
    </Container>
  );
};

export default ComicPage;
