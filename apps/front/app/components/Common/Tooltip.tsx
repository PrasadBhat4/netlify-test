const RoundedArrow = ({ className }: { className: string }) => (
  <svg className={className} width='30' height='29' viewBox='0 0 30 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M0.549609 10C2.67133 10 4.70616 9.15718 6.20644 7.65689L12.0177 1.84563C13.5798 0.28353 16.1125 0.283531 17.6746 1.84563L23.4858 7.6569C24.9861 9.15719 27.0209 10 29.1427 10.0001L29.75 10.0001L29.75 28.6119L0.25 28.6119L0.249996 10L0.549609 10Z'
      fill='#171717'
    />
  </svg>
);
const Tooltip = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div
      className={`absolute left-0 right-0 z-10 invisible w-auto px-4 py-3 mx-auto text-center -bottom-6 peer-hover:invisible lg:hover:visible lg:peer-hover:visible max-w-fit ${className}`}>
      <div className='flex justify-center'>
        <RoundedArrow className='' />
      </div>
      <div className='flex justify-center mt-[-19px] max-w-fit lg:py-4 lg:px-5 text-body-sm-sm lg:text-body-sm text-neutral-0 bg-neutral-900 border-neutral-900 rounded-xl'>
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
