import Image from 'next/image';
import StrapiImage from '@/app/components/Common/StrapiImage';

interface Props {
  testimonial: any;
}

const Card = ({ testimonial }: Readonly<Props>) => {
  const cardClass = `px-8 pt-5 pb-5 mb-6 border break-inside-avoid-column bg-neutral-0 dark:bg-neutral-900 dark:text-neutral-200 text-neutral-900 border-cream-600 shadow-default shadow-cream-600 rounded-2xl flex flex-col justify-between `;

  return (
    <div className={`${cardClass} hover:border-pink-600`}>
      <Image src='/images/icons/quote-pink.svg' alt='quote' width={24} height={24} className='mb-3' />
      <p className='text-body-md'>{testimonial.Opinion}</p>

      <div className='flex mt-8 gap-x-4'>
        {testimonial.Avatar.data ? (
          <StrapiImage
            src={testimonial?.Avatar?.data?.attributes?.url}
            alt={`avatar from ${testimonial.Name}`}
            width={56}
            height={56}
            className='rounded-full w-14 h-14'
          />
        ) : (
          <Image
            src='/images/testimonials/avatar.png'
            alt='placeholder avatar'
            width={56}
            height={56}
            className='rounded-full w-14 h-14'
          />
        )}
        <div>
          <p className='font-semibold text-body-md '>{testimonial.Name}</p>
          <p>{testimonial.Job}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
