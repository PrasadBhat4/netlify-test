'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useId } from 'react';
import { twMerge as tm } from 'tailwind-merge';
import Label from '@/app/components/Common/Form/components/Label';
import Message from '@/app/components/Common/Form/components/Message';
import { ContactSelectOptionType, HandleChangeType } from '@/app/lib/types';

interface Props {
  label: string;
  placeholder: string;
  message: string;
  name: string;
  handleChange: (value: HandleChangeType) => void;
  options: ContactSelectOptionType[];
  isRequired?: boolean;
  hasError?: boolean;
  className?: string;
}

const SelectField = ({
  label,
  placeholder,
  message = '',
  options = [],
  name,
  handleChange,
  isRequired = false,
  hasError = false,
  className = '',
}: Readonly<Props>) => {
  const labelID = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<ContactSelectOptionType>({ id: 0, Label: '', Value: '' });

  const onChange = (option: ContactSelectOptionType) => {
    setValue(option);
    setIsOpen(false);
    handleChange({ [name]: option.Value });
  };

  const containerClass =
    'peer flex items-center justify-between min-h-16 px-4 py-[0.5625rem] mt-3 border-2 rounded-xl cursor-pointer';

  const stateClass = `
    border-orange-400
    hover:border-pink-600 dark:hover:border-pink-500
    focus-within:border-pink-600 dark:focus-within:border-pink-500 
    ${
      hasError
        ? `
          border-[#FF1515] text-[#FF1515] 
          hover:border-[#FF1515] dark:hover:border-[#FF1515]
          focus-within:border-[#FF1515] dark:focus-within:border-[#FF1515]`
        : ''
    }
    ${
      isOpen
        ? `
          border-pink-600 dark:border-pink-500 
          divide-pink-600 dark:divide-pink-500 
          outline-pink-600 dark:outline-pink-500
        `
        : ``
    }
    focus-within:outline-pink-600 dark:focus-within:outline-pink-500 
    disabled:border-neutral-300 
    disabled:text-neutral-400 
    disabled:pointer-events-none
  `;

  const listClass = `divide-y-2 divide-pink-600 rounded-xl cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${
    isOpen ? 'border-2 max-h-full mt-2 opacity-100' : 'border-0 max-h-0 mt-0 opacity-0'
  }`;

  return (
    <label
      className={tm('group flex flex-col', className)}
      onMouseDown={() => setIsOpen(!isOpen)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      htmlFor={labelID}>
      {!hasError && <Label label={label} isRequired={isRequired} />}
      <div className={tm(containerClass, stateClass)} id={labelID} tabIndex={0}>
        <div className='text-body-md text-neutral-900 dark:text-neutral-0'>
          {value.Label.length ? value?.Label : placeholder}
        </div>
        <svg
          className={`w-6 h-6 transition-all duration-300 ease-in-out ${
            isOpen ? '-rotate-180 text-pink-600 hover:text-pink-600' : 'text-current'
          }`}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M6 9L12 15L18 9'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      {!!options.length && (
        <ul className={tm(listClass, stateClass)} id={labelID}>
          {options.map(option => (
            <li
              className='flex items-center min-h-16 px-4 py-[0.5625rem hover:bg-pink-600 dark:hover:bg-pink-500] focus:bg-pink-600 dark:focus:bg-pink-500] text-body-md text-neutral-900 dark:text-neutral-0 hover:text-neutral-0 focus:text-neutral-0 focus:outline-transparent focus-visible:outline-transparent'
              key={option.id}
              onClick={() => onChange(option)}
              onKeyDown={() => onChange(option)}
              tabIndex={0}>
              {option.Label}
            </li>
          ))}
        </ul>
      )}
      {message && <Message message={message} hasError={hasError} />}
    </label>
  );
};

export default SelectField;
