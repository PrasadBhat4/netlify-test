import { twMerge as tm } from 'tailwind-merge';
import FaqItem from '@/app/components/Common/Faq/FaqItem';
import { FaqType } from '@/app/lib/types';

interface Props {
  faqs: FaqType[];
  className?: string;
}

const FaqList = ({ faqs, className = '' }: Readonly<Props>) => (
  <div className={tm('space-y-4', className)}>
    {faqs.map((item: FaqType) => (
      <FaqItem key={item.Question} item={item} />
    ))}
  </div>
);

export default FaqList;
