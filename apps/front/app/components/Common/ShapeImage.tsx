import Image from 'next/image';
import { ShapeType } from '@/app/lib/types';

interface Props {
  shape: ShapeType;
  h?: number;
  w?: number;
  isIcon?: boolean;
  className?: string;
}

const ShapeImage = ({ shape, h = 400, w = 400, isIcon = false, className = '' }: Readonly<Props>) => (
  <Image
    src={`/images/shapes/${isIcon ? 'icons/' : ''}${shape}.png`}
    alt={`${shape} shape`}
    height={h}
    width={w}
    className={`object-cover ${className}`}
  />
);

export default ShapeImage;
