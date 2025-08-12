import { Tweet } from 'react-tweet';
import { memo } from 'react';
import Image from 'next/image';
import type { TwitterComponents } from 'react-tweet';
import Script from 'next/script';
import Container from '@/app/components/Common/Container';
import Card from '@/app/components/Common/Testimonials/Card';

export const components: TwitterComponents = {
  AvatarImg: props => <Image {...props} />,
  MediaImg: props => <Image {...props} fill unoptimized />,
};

type Testimonial = {
  id: string;
  Name: string;
  Avatar: {
    data: any;
  };
  Job: string;
  Opinion: string;
  EmbedCode: string;
};
interface Props {
  data: {
    Testimonials: Array<Testimonial>;
    Button: {
      Text: string;
    };
    Title: string;
  };
}

const EmbeddedCode = memo(({ code }: { code: string }) => {
  const borderClass =
    'border border-cream-600 shadow-default shadow-cream-600 rounded-2xl bg-neutral-0 dark:bg-neutral-900 hover:border-pink-600';

  if (code.includes('twitter')) {
    const tweetId = code.split('status/')[1].split('?')[0];
    return (
      <div className={`relative ${borderClass} [&_.react-tweet-theme]:!mt-0 [&_.react-tweet-theme]:!mb-0`}>
        <Tweet id={tweetId} components={components} />
      </div>
    );
  }
  return (
    <div className={`relative  ${borderClass}`}>
      <Script id='reddit-embed'>{`!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://embed.redditmedia.com/widgets/platform.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","reddit-wjs");`}</Script>
      <div
        className='flex items-center justify-center [&_iframe]:rounded-[12px]'
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  );
});

const TestimonialItem = memo(({ testimonial }: { testimonial: Testimonial }) => {
  const isEmbed = Boolean(testimonial.EmbedCode);
  return (
    <div
      className={`flex-shrink-0 w-96 mb-6 break-inside-avoid ${
        testimonial.EmbedCode?.includes('twitter') ? 'mt-0' : ''
      }`}>
      <div className=' flex-1 flex flex-col'>
        {isEmbed ? (
          <EmbeddedCode code={testimonial.EmbedCode} />
        ) : (
          <div className='flex flex-col h-full'>
            <Card testimonial={testimonial} />
          </div>
        )}
      </div>
    </div>
  );
});

const Testimonials = ({ data }: Readonly<Props>) => {
  const testimonialCount = data.Testimonials.length;
  const animationDuration = testimonialCount * 5;

  return (
    <Container className='relative'>
      <h2 className='font-bold text-center font-heading text-heading-sm-sm sm:text-heading-lg-sm md:text-heading-md dark:bg-neutral-1000 bg-cream-300 p-8'>
        {data.Title}
      </h2>

      <div className='overflow-hidden relative'>
        <div
          className='marquee-container'
          style={{ '--marquee-duration': `${animationDuration}s` } as React.CSSProperties}>
          <div className='marquee-content'>
            {data.Testimonials.map(testimonial => (
              <TestimonialItem key={`first-${testimonial.id}`} testimonial={testimonial} />
            ))}
            {data.Testimonials.map(testimonial => (
              <TestimonialItem key={`second-${testimonial.id}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Testimonials;
