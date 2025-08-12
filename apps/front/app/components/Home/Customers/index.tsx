import { twMerge as tm } from 'tailwind-merge';
import Carousel from '@/app/components/Home/Customers/Carousel';
import ShapeImage from '@/app/components/Common/ShapeImage';
import CustomersLogos from '@/app/components/Common/Customers';

interface Props {
  data: any;
  className?: string;
}

const Customers = ({ data = {}, className = '' }: Readonly<Props>) => {
  return (
    <div className={tm('flex items-center mt-[4.5rem] md:mt-16 overflow-hidden', className)}>
      <ShapeImage shape='double-halfmoon1' h={168} w={168} className='hidden lg:block' />
      <ShapeImage shape='double-halfmoon1' h={144} w={141} className='hidden md:max-lg:block' />
      <div className='items-center hidden w-full h-full pl-6 overflow-hidden rounded-full md:flex md:pl-12 lg:pl-16 rounded-se-none rounded-ee-none bg-neutral-900'>
        <p className='relative flex items-center h-24 w-full min-w-[7.5rem] max-w-[9rem] md:h-36 lg:h-[10.4375rem] font-semibold text-neutral-0 text-body-md-sm lg:text-body-md with-after-gradient'>
          {data.Title}
        </p>
        <Carousel items={data} />
      </div>
      <div className='mx-auto md:hidden'>
        <CustomersLogos data={data} />
      </div>
    </div>
  );
};

export default Customers;
