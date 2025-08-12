import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ isWhite = false }: { isWhite?: boolean }) => (
  <Link href='/' className='h-fit'>
    {isWhite ? (
      <div>
        <Image src='/images/logo-white.svg' alt='Coderabbit logo' height={45} width={206} className='hidden lg:block' />
        <Image src='/images/logo-white.svg' alt='Coderabbit logo' height={34} width={158} className='lg:hidden' />
      </div>
    ) : (
      <div>
        <Image
          src='/images/logo-orange.svg'
          alt='Coderabbit logo'
          height={45}
          width={206}
          className='hidden lg:block dark:lg:hidden'
        />
        <Image
          src='/images/logo-orange.svg'
          alt='Coderabbit logo'
          height={34}
          width={158}
          className='dark:hidden lg:hidden'
        />
        <Image
          src='/images/logo-dark.svg'
          alt='Coderabbit logo'
          height={45}
          width={206}
          className='hidden lg:dark:block'
        />
        <Image
          src='/images/logo-dark.svg'
          alt='Coderabbit logo'
          height={34}
          width={158}
          className='hidden dark:block lg:dark:hidden'
        />
      </div>
    )}
  </Link>
);

export default Logo;
