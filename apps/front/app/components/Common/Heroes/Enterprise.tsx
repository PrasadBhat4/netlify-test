import Container from '@/app/components/Common/Container';
import Button from '@/app/components/Common/Button';
import ShapeImage from '@/app/components/Common/ShapeImage';
import Tag from '@/app/components/Common/Heroes/Tag';
import { StrapiButton, StrapiHero } from '@/app/lib/types';

interface Props {
  data: StrapiHero;
}

const Hero = ({ data }: Readonly<Props>) => (
  <Container className='mt-14 lg:pb-12 md:mt-10'>
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center w-full'>
        {data?.Tag && data.Tag.length > 0 ? <Tag text={data.Tag} /> : null}
        <h1 className='mt-8 font-bold text-center font-heading text-heading-lg-sm lg:text-heading-lg text-neutral-900 dark:text-neutral-0 max-w-[55rem]'>
          {data.Title}
        </h1>
        <p className='mt-2 text-center lg:mt-6 text-subtitle lg:text-body-lg text-neutral-900 dark:text-neutral-0  max-w-[81.25rem]'>
          {data.Description}
        </p>
        <div className='flex flex-col gap-x-6 justify-center items-center mt-6 w-full'>
          <div className='flex flex-col gap-2 w-full md:flex-row md:w-auto'>
            {data.Buttons.map((button: StrapiButton, index: number) => (
              <>
                {index === 0 && (
                  <Button
                    text={button.Text}
                    variant='primary'
                    href={button.Url}
                    isExternal={button.isExternal}
                    arrowPosition='right'
                    key={button.id}
                    className='w-full md:w-auto'
                  />
                )}
                {index === 1 && (
                  <Button
                    text={button.Text}
                    variant='secondary'
                    href={button.Url}
                    isExternal={button.isExternal}
                    key={button.id}
                    className='mb-8 w-full md:w-auto md:mb-0'
                  />
                )}
              </>
            ))}
          </div>
          <div className='flex flex-col gap-4 items-center mt-4 text-center md:mt-6 md:flex-row'>
            {data.Description_1 && (
              <>
                <p className='font-semibold text-body-lg-sm lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
                  {data.Description_1}
                </p>
                {data.Description_2 && (
                  <div className='hidden w-4 h-px md:block md:w-px md:h-4 bg-neutral-900 dark:bg-neutral-0' />
                )}
              </>
            )}
            {data.Description_2 && (
              <>
                <p className='text-body-lg-sm lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
                  {data.Description_2}
                </p>
                {data.Description_3 && (
                  <div className='hidden w-4 h-px md:block md:w-px md:h-4 bg-neutral-900 dark:bg-neutral-0' />
                )}
              </>
            )}
            {data.Description_3 && (
              <p className='text-body-lg-sm lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
                {data.Description_3}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className='relative mt-12'>
        <div className='hidden xl:block absolute -top-24 -right-[51rem] -z-10 max-w-[9.8125rem] max-h-80'>
          <ShapeImage shape='halfmoon-1' h={320} w={157} className='w-full h-full' />
        </div>
        <div className='hidden lg:max-xl:block absolute -top-20 -right-[40rem] -z-10 max-w-[8.5625rem] max-h-[17.375rem]'>
          <ShapeImage shape='halfmoon-1' h={278} w={137} className='w-full h-full' />
        </div>
        <div className='hidden md:max-lg:block absolute -top-20 -right-[26.1rem] -z-10 max-w-[6.5625rem] max-h-[13.1875rem]'>
          <ShapeImage shape='halfmoon-1' h={211} w={105} className='w-full h-full' />
        </div>
      </div>
    </div>
  </Container>
);

export default Hero;
