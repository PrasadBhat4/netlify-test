import Container from '@/app/components/Common/Container';
import ShapeImage from '@/app/components/Common/ShapeImage';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Button from '@/app/components/Common/Button';
import { StrapiPill } from '@/app/lib/types';

interface PinkPillProps {
  title: string;
  description: string;
}

interface BlackPillProps {
  title: string;
  description: string;
  image: string;
  linkText: string;
  linkHref: string;
}

const BlackPill = ({ title, description, image, linkText, linkHref }: Readonly<BlackPillProps>) => {
  return (
    <div className='flex flex-col md:flex-row md:items-start gap-8 py-[6.5rem] pr-20 pl-[4.5rem] md:py-10 w-auto lg:max-w-[60rem] xl:max-w-[40.0625rem] rounded-full dark:bg-neutral-900 bg-cream-400'>
      <StrapiImage src={image} alt='pill icon' width={48} height={48} />
      <div>
        <h3 className='-mt-2 md:-mt-1.5 font-semibold dark:text-neutral-0 text-neutral-900 text-body-xl-sm lg:text-body-xl'>
          {title}
        </h3>
        <p className='-mt-1.5 md:-mt-1 dark:text-neutral-0 text-neutral-900 text-body-md-sm lg:text-body-md'>
          {description}
        </p>
        <Button
          variant='buttonLink'
          text={linkText}
          href={linkHref}
          className='mt-4 w-max dark:text-neutral-0 text-neutral-900'
          arrowPosition='right'
        />
      </div>
    </div>
  );
};

const PinkPill = ({ title, description }: Readonly<PinkPillProps>) => {
  return (
    <div className='flex md:max-lg:basis-4/5 md:mb-1 flex-col justify-center py-14 px-14 md:px-20 md:py-20 lg:py-10 xl:py-[2.75rem] lg:max-w-[60rem] xl:max-w-[40.0625rem] bg-pink-400 dark:bg-neutral-900 rounded-[2rem] md:rounded-full'>
      <h2 className='font-bold font-heading text-heading-sm-sm lg:text-heading-sm'>{title}</h2>
      <p className='mt-2 text-body-md-sm lg:text-body-md'>{description}</p>
    </div>
  );
};

interface Props {
  data: {
    Pills: StrapiPill[];
  };
}

const Pills = ({ data }: Readonly<Props>) => (
  <Container>
    <div className='w-full lg:max-xl:max-w-[69.75rem] mx-auto'>
      <div className='flex relative flex-col items-center lg:items-center lg:flex-row lg:justify-center lg:max-xl:flex-wrap'>
        {data.Pills.filter((pill: StrapiPill) => pill.Link).map((pill: any, index: number) =>
          index > 0 ? (
            <div key={pill.id} className='flex md:max-lg:flex-row'>
              <BlackPill
                key={pill.id}
                title={pill.Title}
                description={pill.Description}
                image={pill?.Image?.data?.attributes?.url}
                linkText={pill.Link.Text}
                linkHref={pill.Link.Url}
              />
              {index === 1 && (
                <ShapeImage
                  shape='double-halfmoon-smaller1'
                  h={195}
                  w={165}
                  className='hidden md:max-lg:flex md:max-lg:basis-1/5'
                />
              )}
            </div>
          ) : (
            <PinkPill key={pill.id} title={pill.Title} description={pill.Description} />
          )
        )}
        <ShapeImage shape='double-halfmoon-smaller1' h={195} w={165} className='hidden lg:block' />
      </div>
    </div>
  </Container>
);

export default Pills;
