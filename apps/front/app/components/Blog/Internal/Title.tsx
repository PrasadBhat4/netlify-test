interface Props {
  text: string;
}

const Title = ({ text }: Readonly<Props>) => (
  <h1 className='mt-8 md:mt-[3.75rem] lg:mt-0 font-heading text-heading-md-sm lg:text-heading-md font-medium dark:text-neutral-0'>
    {text}
  </h1>
);

export default Title;
