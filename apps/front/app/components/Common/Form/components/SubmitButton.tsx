'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Button from '@/app/components/Common/Button';

interface Props {
  text: string;
  submitHandler: (value: React.SyntheticEvent) => void;
  className?: string;
}

const SubmitButton = ({ text, submitHandler, className = '' }: Readonly<Props>) => (
  <div className={`flex mt-8 md:justify-end ${className}`} onClick={submitHandler}>
    <Button text={text} variant='primary' href='#' arrowPosition='right' className='w-full md:w-auto' noScroll />
  </div>
);

export default SubmitButton;
