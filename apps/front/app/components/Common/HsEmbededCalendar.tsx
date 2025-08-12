'use client';

import { useEffect } from 'react';
import Card from '@/app/components/Home/Features/Cards/Base';

interface Props {
  data: { Title: string; Description: string; SourceUrl: string };
}

const HsEmbededCalendar = ({ data }: Readonly<Props>) => {
  const { Title, Description, SourceUrl } = data;
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='container'>
      <Card>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='md:p-8'>
            <p className='font-bold font-heading text-heading-sm-sm lg:text-heading-md mb-[1rem]'>{Title}</p>
            <p>{Description}</p>
          </div>
          {SourceUrl ? <div className='meetings-iframe-container' data-src={`${SourceUrl}?embed=true`} /> : null}
        </div>
      </Card>
    </div>
  );
};

export default HsEmbededCalendar;
