/* eslint-disable react/no-danger */
import Script from 'next/script';
import Image from 'next/image';
import Card from '@/app/components/Home/Features/Cards/Base';
import LumaButton from './LumaButton';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  index: number;
}

const EventMainCard = ({ data = {}, index }: Readonly<Props>) => (
  <div className='container'>
    {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
    <Script src='https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js' strategy='lazyOnload' />
    <Card className={`flex flex-col gap-12 min-w-full ${index === 5 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      <div className='w-full flex flex-col min-h-[500px] justify-between'>
        <div>
          <p
            className={`${
              index === 5 ? 'lg:max-w-[34.2rem]' : ''
            } font-bold font-heading text-heading-sm-sm lg:text-heading-md`}>
            {data.Title}
          </p>
          <p className='text-body-md-sm lg:text-body-md mt-4 mb-8'>{data.Description}</p>
        </div>
        <div className='mt-auto'>
          <LumaButton />
        </div>
      </div>
      <div className='relative w-full aspect-square max-w-[500px] mx-auto'>
        <Image
          src='/images/shapes/halfmoon-opposite2-sm.png'
          alt='Event illustration'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-contain rounded-[2.5rem]'
        />
      </div>
    </Card>
  </div>
);

export default EventMainCard;
