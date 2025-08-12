import { twMerge as tm } from 'tailwind-merge';

interface Props {
  message: string;
  hasError?: boolean;
  isDarkBackground?: boolean;
  className?: string;
}

const Message = ({ message, hasError = false, className = '' }: Readonly<Props>) => {
  return <p className={tm(`mt-1 text-body-sm`, className, hasError ? 'text-[#FF1515] text-[16px]' : '')}>{message}</p>;
};

export default Message;
