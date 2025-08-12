import { twMerge as tm } from 'tailwind-merge';
import Image from 'next/image';
import { getStrapiMedia } from '@/app/lib/utils';

interface Props {
  src: string;
  alt: string;
  title?: string;
  height: number;
  width: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const StrapiImage = ({ src, alt, title, height, width, sizes, className = '', priority = false }: Readonly<Props>) => {
  if (!src) return null;
  return (
    <Image
      src={getStrapiMedia(src) ?? ''}
      alt={alt ?? 'image description not available'}
      title={title ?? ''}
      height={height}
      width={width}
      className={tm(`object-cover object-center`, className)}
      priority={priority}
      sizes={sizes}
    />
  );
};

export default StrapiImage;
