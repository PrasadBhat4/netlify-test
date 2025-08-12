import { twMerge as tm } from 'tailwind-merge';
import Image from 'next/image';
import Link from 'next/link';

const Socials = ({
  links,
  className = '',
  imageClassName = '',
}: {
  links: any;
  className?: string;
  imageClassName?: string;
}) =>
  links?.map((social: any) => (
    <Link key={social?.id} href={`${social?.Url ?? '#'}`} target='_blank' className={`${className}`}>
      <Image
        src={`/images/icons/${social?.Text?.toLowerCase()}-white.svg`}
        alt={`${social?.Text} icon`}
        height={32}
        width={32}
        className={tm('invert dark:invert-0', imageClassName)}
      />
    </Link>
  ));

export default Socials;
