'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useId } from 'react';
import { twMerge as tm } from 'tailwind-merge';
import Image from 'next/image';
import Label from '@/app/components/Common/Form/components/Label';
import Message from '@/app/components/Common/Form/components/Message';
import { HandleChangeType } from '@/app/lib/types';

interface Props {
  label: string;
  name: string;
  handleChange: (value: HandleChangeType) => void;
  isRequired?: boolean;
  message?: string;
  hasError?: boolean;
  className?: string;
}

const TextField = ({
  label,
  message = '',
  name,
  handleChange,
  isRequired = false,
  hasError = false,
  className = '',
}: Readonly<Props>) => {
  const labelID = useId();
  const [value, setValue] = useState(false);
  const onChange = () => {
    setValue(!value);
    handleChange({ [name]: String(!value) });
  };
  const stateClass = `
    border-cream-600
    ${hasError ? 'border-[#FF1515] text-[#FF1515]' : ''}
    hover:border-pink-600 dark:hover:border-pink-500
    focus:border-2 focus:border-pink-600 dark:focus:border-pink-500 
    focus:outline focus:outline-4 focus:outline-pink-600/30 focus:outline-offset-0
    checked:border-aqua-500 dark:checked:border-aqua-500
    dark:border-cream-600 dark:bg-cream-300
    checked:focus:border checked:focus:border-aqua-500 dark:checked:focus:border-aqua-500 checked:focus:outline-4
    disabled:border-neutral-300 
    disabled:text-neutral-400 
    disabled:pointer-events-none
  `;

  return (
    <label className={tm('flex flex-col', className)} htmlFor={labelID}>
      <div className='flex group gap-x-4'>
        <div className='relative w-6 h-6'>
          <input
            type='checkbox'
            className={tm('peer appearance-none w-6 h-full rounded border cursor-pointer', stateClass)}
            checked={value}
            name={name}
            onChange={onChange}
            id={labelID}
          />
          <Image
            src='/images/icons/checkbox-tick.svg'
            alt='checkbox tick'
            width={14}
            height={10}
            className='absolute hidden left-[0.3rem] top-2 peer-checked:block'
          />
        </div>
        <Label label={label} isRequired={isRequired} className='text-body-md' />
      </div>
      {message && <Message message={message} hasError={hasError} />}
    </label>
  );
};

export default TextField;
