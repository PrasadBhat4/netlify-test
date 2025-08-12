import Image from 'next/image';
import Button from '@/app/components/Common/Button';
import { StrapiContact } from '@/app/lib/types';

interface Props {
  data: StrapiContact;
}

const Contact = ({ data }: Readonly<Props>) => (
  <div className='flex items-center'>
    <div className='transform relative hidden sm:block sm:-translate-x-[10%] md:-translate-x-[35%] lg:-translate-x-[10rem] xl:translate-x-0'>
      <Image
        src='/images/contact/gradient-pill-xl.png'
        alt='pill'
        width={496}
        height={240}
        className='object-cover h-[13.4375rem] rounded-se-[18.75rem] rounded-ee-[18.75rem] w-[120%] sm:w-[90%] md:w-auto'
      />
    </div>
    <div className='transform translate-x-0 sm:-translate-x-[9.5%] md:-translate-x-[15%] lg:-translate-x-[10rem] xl:translate-x-0'>
      <div className='flex items-center justify-center w-auto sm:w-[90%] md:w-auto'>
        <Image
          src='/images/contact/grainy-pill-xl.png'
          alt='pill'
          width={1020}
          height={239}
          className='object-cover !h-[13.4375rem] rounded-[18.75rem]'
        />
        <div className='absolute'>
          <div className='flex flex-col items-center justify-center md:flex-row w-[13.375rem] md:w-auto'>
            <p className='w-[11rem] sm:w-[20rem] lg:w-[29.9375rem] md:mr-6 lg:mr-12 font-bold font-heading text-center text-heading-sm lg:text-heading-md  dark:text-neutral-900'>
              {data.Title}
            </p>
            {data.Button && (
              <Button
                className='w-[13.375rem] md:w-auto mt-6 md:mt-0'
                text={data.Button.Text}
                variant='primary'
                href={data.Button.Url}
                isExternal={data.Button.isExternal}
                arrowPosition='right'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
