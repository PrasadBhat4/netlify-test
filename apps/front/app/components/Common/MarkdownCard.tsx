import Markdown from './Markdown';

interface Props {
  data: { Body: string };
}

const Card = ({ data }: Readonly<Props>) => (
  <div className='container mx-auto'>
    <div className='relative mx-auto sm:max-w-[550px] md:max-w-[770px] lg:fit-content mt-1 p-6 md:p-12 border border-cream-600 dark:border-neutral-800 shadow-default shadow-cream-600 dark:shadow-none rounded-[1.25rem] bg-neutral-0 dark:bg-neutral-900'>
      <Markdown text={data.Body} />
    </div>
  </div>
);

export default Card;
