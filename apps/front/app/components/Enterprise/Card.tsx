import Image from 'next/image';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Button from '@/app/components/Common/Button';

interface Props {
  testimonial: any;
}

const Card = ({ testimonial }: Readonly<Props>) => (
  <div className='p-6 pb-8 lg:p-10 lg:pb-[3.25rem] mt-10 md:mt-[8.5625rem] lg:mt-24 border bg-neutral-0 dark:bg-neutral-900 border-cream-600 dark:border-neutral-800 rounded-2xl max-w-[34rem]'>
    <div className='flex flex-col gap-y-5 lg:gap-y-6'>
      <div className='flex items-center justify-center w-full max-w-[8.625rem] lg:max-w-[9.875rem] h-[4.5rem] lg:h-20'>
        <StrapiImage
          src={testimonial?.Company?.data?.attributes?.url}
          alt='company logo'
          width={158}
          height={80}
          className='object-cover dark:hidden'
        />
        <StrapiImage
          src={testimonial?.CompanyDark?.data?.attributes?.url}
          alt='company logo'
          width={158}
          height={80}
          className='hidden object-cover dark:block'
        />
      </div>
      <p className='text-body-md'>{testimonial.Opinion}</p>
      <div className='flex gap-x-4'>
        {testimonial.Avatar.data ? (
          <StrapiImage
            src={testimonial?.Avatar?.data?.attributes?.url}
            alt={`avatar from ${testimonial.Name}`}
            width={56}
            height={56}
            className='w-14 h-14 rounded-full'
          />
        ) : (
          <Image
            src='/images/testimonials/avatar.png'
            alt='placeholder avatar'
            width={56}
            height={56}
            className='w-14 h-14 rounded-full'
          />
        )}
        <div>
          <p className='font-semibold text-body-md'>{testimonial.Name}</p>
          <p>{testimonial.Job}</p>
        </div>
      </div>
    </div>
    {testimonial?.Button && (
      <Button
        className='mt-16 lg:mt-20 text-neutral-900'
        text={testimonial?.Button.Text}
        variant='buttonLink'
        href={testimonial?.Button.Url}
        isExternal={testimonial?.Button.isExternal}
        arrowPosition='right'
        key={testimonial?.Button.id}
      />
    )}
  </div>
);

export default Card;
