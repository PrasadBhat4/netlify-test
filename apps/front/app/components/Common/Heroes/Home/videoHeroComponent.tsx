interface Props {
  srcWebm: string;
  srcMp4: string;
  srcWebmDark: string;
  srcMp4Dark: string;
}

const Video = ({ srcWebm, srcMp4, srcWebmDark, srcMp4Dark }: Readonly<Props>) => {
  const Placeholder = ({ height, width, display }: { height: number; width: number; display: string }) => (
    <div className='bg-black opacity-50 rounded-[1.25rem]' style={{ height, width, display }} />
  );

  return (
    <>
      <div className='hidden dark:hidden lg:block rounded-[1.25rem]'>
        {srcWebm || srcMp4 ? (
          <video style={{ height: 565, width: 1112, borderRadius: '0px 43px 0 0' }} loop autoPlay muted>
            <track default kind='captions' src='' />
            <source src={srcWebm} type='video/webm' />
            <source src={srcMp4} type='video/mp4' />
            Your browser does not support the video.
          </video>
        ) : (
          <Placeholder height={565} width={1112} display='hinherit' />
        )}
      </div>
      <div className='hidden lg:dark:block rounded-[1.25rem]'>
        {srcWebmDark || srcMp4Dark ? (
          <video style={{ height: 565, width: 1112 }} loop autoPlay muted>
            <track default kind='captions' src='' />
            <source src={srcWebmDark} type='video/webm' />
            <source src={srcMp4Dark} type='video/mp4' />
            Your browser does not support the video.
          </video>
        ) : (
          <Placeholder height={565} width={1112} display='hinherit' />
        )}
      </div>
      <div className='hidden dark:hidden md:max-lg:block rounded-[1.25rem]'>
        {(srcWebm || srcMp4) && (srcWebmDark || srcMp4Dark) ? (
          <video style={{ height: 390, width: 769 }} loop autoPlay muted>
            <track default kind='captions' src='' />
            <source src={srcWebm} type='video/webm' className='dark:hidden' />
            <source src={srcMp4} type='video/mp4' className='dark:hidden' />
            Your browser does not support the video.
          </video>
        ) : (
          <Placeholder height={390} width={769} display='hinherit' />
        )}
      </div>
      <div className='hidden md:max-lg:dark:block rounded-[1.25rem]'>
        {srcWebmDark || srcMp4Dark ? (
          <video style={{ height: 390, width: 769 }} loop autoPlay muted>
            <track default kind='captions' src='' />
            <source src={srcWebmDark} type='video/webm' />
            <source src={srcMp4Dark} type='video/mp4' />
            Your browser does not support the video.
          </video>
        ) : (
          <Placeholder height={390} width={769} display='hinherit' />
        )}
      </div>
    </>
  );
};

export default Video;
