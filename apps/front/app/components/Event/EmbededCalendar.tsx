'use client';

import { useEffect } from 'react';
import Card from '@/app/components/Home/Features/Cards/Base';

interface Props {
  title: string;
  description: string;
}

const EmbededCalendar = ({ title, description }: Readonly<Props>) => {
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
            <p className='font-bold font-heading text-heading-sm-sm lg:text-heading-md mb-[1rem]'>{title}</p>
            <p>{description}</p>
          </div>
          <div
            className='meetings-iframe-container'
            data-src='https://meetings.coderabbit.ai/meetings/gur-singh/githubuniverse?embed=true'
          />
        </div>
      </Card>
    </div>
  );
};

export default EmbededCalendar;
