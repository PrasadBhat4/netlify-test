'use client';

/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useId, useEffect } from 'react';
import { twMerge as tm } from 'tailwind-merge';
import Label from '@/app/components/Common/Form/components/Label';
import Placeholder from '@/app/components/Common/Form/components/Placeholder';
import Message from '@/app/components/Common/Form/components/Message';
import { HandleChangeType, ArrowPositionType, ArrowRotationType } from '@/app/lib/types';
import { ARROW_POSITION, ARROW_ROTATION } from '@/app/lib/constants';

interface Props {
  label: string;
  placeholder: string;
  name: string;
  handleChange: (value: HandleChangeType) => void;
  isEmail?: boolean;
  isRequired?: boolean;
  isTextarea?: boolean;
  arrowPosition?: ArrowPositionType;
  arrowRotation?: ArrowRotationType;
  arrowSubmits?: boolean;
  message?: string;
  hasError?: boolean;
  resetField?: boolean;
  isDarkBackground?: boolean;
  className?: string;
}

const TextField = ({
  label,
  placeholder,
  message = '',
  name,
  handleChange,
  isEmail = false,
  isRequired = false,
  isTextarea = false,
  hasError = false,
  isDarkBackground = false,
  resetField = false,
  arrowPosition,
  arrowSubmits,
  arrowRotation = 'right',
  className = '',
}: Readonly<Props>) => {
  const labelID = useId();
  const [value, setValue] = useState('');

  const onChange = (e: string) => {
    setValue(e);
    handleChange({ [name]: e });
  };

  useEffect(() => {
    if (resetField) setValue('');
  }, [resetField]);

  const containerClass =
    'flex flex-col justify-center min-h-16 mt-3 px-4 py-[0.5625rem] border-2 rounded-xl cursor-text';

  const inputTextBaseClass = `
  w-full h-full group-focus-within:max-h-5 bg-transparent 
  text-body-md ${isDarkBackground ? 'text-neutral-0' : 'text-neutral-900 dark:text-neutral-0'} 
  outline-none ring-0 text-neutral-900 dark:text-neutral-0
  transition-all ease-in-out duration-300
`;
  const textareaBaseClass = `
  min-h-24 w-full resize-none bg-transparent 
  text-body-md text-neutral-900 
  dark:text-neutral-0 outline-none ring-0
  transition-all ease-in-out duration-300
`;

  const stateClass = `
    border-orange-400
    ${hasError ? 'border-[#FF1515] text-[#FF1515]' : ''}
    hover:border-pink-600 dark:hover:border-pink-500
    focus-within:border-pink-600 dark:focus-within:border-pink-500 
    focus-within:outline-pink-600 dark:focus-within:outline-pink-500 
    focus-within:caret-pink-600 dark:focus-within:caret-pink-500
    disabled:border-neutral-300 
    disabled:text-neutral-400 
    disabled:pointer-events-none
  `;

  return (
    <label className={tm('group flex flex-col', className)} htmlFor={labelID}>
      {!hasError && label && <Label label={label} isRequired={isRequired} isDarkBackground={isDarkBackground} />}
      <div className={tm(containerClass, stateClass)}>
        <Placeholder placeholder={placeholder} hasError={hasError} isDarkBackground={isDarkBackground} />
        {isTextarea ? (
          <textarea
            className={textareaBaseClass}
            name={name}
            onChange={e => onChange(e.target.value)}
            value={value}
            rows={4}
            id={labelID}
          />
        ) : (
          <input
            type={isEmail ? 'email' : 'text'}
            className={tm(inputTextBaseClass, `  ${value.length > 0 ? 'max-h-5' : 'max-h-0'} `)}
            value={value}
            name={name}
            onChange={e => onChange(e.target.value)}
            id={labelID}
            autoComplete='off'
          />
        )}
        {arrowPosition === ARROW_POSITION.right &&
          (arrowSubmits ? (
            <button type='submit' className='absolute right-4'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className={`w-6 h-6  dark:invert-0 ${ARROW_ROTATION[arrowRotation]} `}>
                <path
                  d='M20.2896 11.7569C16.0056 11.7569 12.5327 8.28404 12.5327 4'
                  stroke='currentColor'
                  strokeWidth='1.55139'
                />
                <path
                  d='M20.2896 11.757C16.0056 11.757 12.5327 15.2299 12.5327 19.5139'
                  stroke='currentColor'
                  strokeWidth='1.55139'
                />
                <path d='M17.9625 11.7568L4 11.7568' stroke='currentColor' strokeWidth='1.55139' />
              </svg>
            </button>
          ) : (
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className={`w-6 h-6  dark:invert-0 ${ARROW_ROTATION[arrowRotation]} `}>
              <path
                d='M20.2896 11.7569C16.0056 11.7569 12.5327 8.28404 12.5327 4'
                stroke='currentColor'
                strokeWidth='1.55139'
              />
              <path
                d='M20.2896 11.757C16.0056 11.757 12.5327 15.2299 12.5327 19.5139'
                stroke='currentColor'
                strokeWidth='1.55139'
              />
              <path d='M17.9625 11.7568L4 11.7568' stroke='currentColor' strokeWidth='1.55139' />
            </svg>
          ))}
      </div>
      {message && (
        <Message
          message={message}
          hasError={hasError}
          className={`${isDarkBackground ? 'text-neutral-0' : 'text-neutral-900 dark:text-neutral-0'} text-body-md`}
        />
      )}
    </label>
  );
};

export default TextField;
