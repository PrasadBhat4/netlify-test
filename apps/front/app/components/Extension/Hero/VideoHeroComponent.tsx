/* eslint-disable no-nested-ternary */
import Image from 'next/image';

interface Props {
  srcMp4: string;
  srcMp4Dark: string;
  className?: string;
}
const Video = ({ srcMp4, srcMp4Dark, className = '' }: Readonly<Props>) => {
  const Placeholder = ({ height, width, display }: { height: number; width: number; display: string }) => (
    <div className='bg-black opacity-50 rounded-[1.25rem]' style={{ height, width, display }} />
  );
  const isImage = (src: string) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(src);
  };
  return (
    <div>
      <div className={`${className} hidden dark:hidden lg:block rounded-[1.25rem]`}>
        {srcMp4 ? (
          isImage(srcMp4) ? (
            <Image src={srcMp4} width={1112} height={565} alt='hero image' className=' object-cover max-h-[565px]' />
          ) : (
            <video style={{ height: 565, width: 1112, borderRadius: 43, objectFit: 'cover' }} loop autoPlay muted>
              <track default kind='captions' src='' />
              <source src={srcMp4} type='video/mp4' />
              Your browser does not support the video.
            </video>
          )
        ) : (
          <Placeholder height={565} width={1112} display='inherit' />
        )}
      </div>

      <div className='hidden lg:dark:block rounded-[1.25rem]'>
        {srcMp4Dark ? (
          isImage(srcMp4Dark) ? (
            <Image
              src={srcMp4Dark}
              width={1112}
              height={565}
              alt='hero image'
              className=' object-cover max-h-[565px]'
            />
          ) : (
            <video style={{ height: 565, width: 1112, borderRadius: 43, objectFit: 'cover' }} loop autoPlay muted>
              <track default kind='captions' src='' />
              <source src={srcMp4Dark} type='video/mp4' />
              Your browser does not support the video.
            </video>
          )
        ) : (
          <Placeholder height={565} width={1112} display='inherit' />
        )}
      </div>

      <div className='hidden dark:hidden md:max-lg:block rounded-[1.25rem]'>
        {srcMp4 ? (
          isImage(srcMp4) ? (
            <Image src={srcMp4} width={769} height={390} alt='hero image' className=' object-cover max-h-[390px]' />
          ) : (
            <video style={{ height: 390, width: 769, borderRadius: 43, objectFit: 'cover' }} loop autoPlay muted>
              <track default kind='captions' src='' />
              <source src={srcMp4} type='video/mp4' />
              Your browser does not support the video.
            </video>
          )
        ) : (
          <Placeholder height={390} width={769} display='inherit' />
        )}
      </div>

      <div className='hidden md:max-lg:dark:block rounded-[1.25rem]'>
        {srcMp4Dark ? (
          isImage(srcMp4Dark) ? (
            <Image src={srcMp4Dark} width={769} height={390} alt='hero image' className=' object-cover max-h-[390px]' />
          ) : (
            <video style={{ height: 390, width: 769, borderRadius: 43, objectFit: 'cover' }} loop autoPlay muted>
              <track default kind='captions' src='' />
              <source src={srcMp4Dark} type='video/mp4' />
              Your browser does not support the video.
            </video>
          )
        ) : (
          <Placeholder height={390} width={769} display='inherit' />
        )}
      </div>
    </div>
  );
};
export default Video;
