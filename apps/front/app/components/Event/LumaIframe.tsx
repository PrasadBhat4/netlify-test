interface Props {
  title: string;
}

const LumaIframe = ({ title }: Readonly<Props>) => {
  return (
    <div className='container flex justify-center flex-col items-center'>
      <p className='font-bold font-heading text-heading-sm-sm lg:text-heading-md text-center mb-[6rem]'>{title}</p>
      <div className='overflow-x-auto w-full flex justify-center'>
        <iframe
          title='GitHub Universe 2024'
          src='https://lu.ma/embed/event/evt-4665PXTocmMLBGu/simple'
          width='600'
          height='1000'
          style={{ border: '1px solid #bfcbda88', borderRadius: '4px' }}
          allowFullScreen
          aria-hidden='false'
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        />
      </div>
    </div>
  );
};

export default LumaIframe;
