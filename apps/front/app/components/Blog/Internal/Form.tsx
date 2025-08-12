import { useState } from 'react';
import { twMerge as tm } from 'tailwind-merge';
import { z } from 'zod';
import TextField from '@/app/components/Common/Form/components/TextField';
import { HandleChangeType, StrapiField } from '@/app/lib/types';

interface Props {
  data: StrapiField;
  className?: string;
  inputClassName?: string;
}

const Form = ({ data, className = '', inputClassName = '' }: Readonly<Props>) => {
  const schema = z.object({
    '0-1/email': data.isRequired
      ? z
          .string({
            required_error: 'This field is required',
            invalid_type_error: 'This field must be a string',
          })
          .min(1, { message: 'This field is required' })
          .email({ message: 'Invalid email address' })
          .toLowerCase()
          .trim()
      : z.string().optional(),
  });
  const [formValues, setFormValues] = useState<z.infer<typeof schema>>({
    '0-1/email': '',
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState<{
    [key: string]: string;
  }>({});
  const [isFormSent, setIsFormSent] = useState(false);
  const [resetField, setResetField] = useState(false);

  const handleChange = (value: HandleChangeType) => {
    if (value['0-1/email'] === '') return;
    setFormValues({ ...formValues, ...value });
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setErrors({});
    setResetField(false);

    const validationSchema = schema.safeParse(formValues);

    if (!validationSchema.success && validationSchema.error.issues.length) {
      setErrors({});
      setSuccessMessage({});
      const issues = validationSchema.error.issues.reduce((acc: { [key: string]: string }, current) => {
        const path = current.path.join('/');
        acc[path] = current.message;
        return acc;
      }, {});
      setErrors(issues);
      setSuccessMessage(issues);
      return;
    }

    // send data
    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '';
    const formGuid = process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID ?? '';

    if (!portalId || !formGuid) {
      setErrors({ '0-1/email': 'Configuration error. Please try again later.' });
      return;
    }
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const mappedFields = Object.entries(validationSchema.data as Record<string, string>).map(([key, value]) => {
      const [objectTypeId, name] = key.split('/');
      return {
        name,
        value,
        objectTypeId,
      };
    });

    const formDataToSend = {
      submittedAt: `${new Date().getTime()}`,
      fields: mappedFields,
      context: {
        pageUri: window?.location?.href ?? 'https://coderabbit.ai',
      },
    };

    try {
      setErrors({});
      setSuccessMessage({});

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });
      setIsFormSent(true);
      setSuccessMessage({
        '0-1/email': data?.SuccessMessage || "You've subscribed to CodeRabbit's Newsletter!",
      });
      setFormValues({ '0-1/email': '' });
      setResetField(true);
    } catch (error) {
      setErrors({ '0-1/email': 'An error occurred while submitting the form' });
      throw new Error('An error occurred while submitting the form');
    }
  };

  return (
    <div className={tm('flex flex-col w-full md:w-[21.25rem] lg:w-[27rem] mt-6 md:mt-0', className)}>
      <form onSubmit={submitHandler} className='relative'>
        <TextField
          label=''
          placeholder={data?.Placeholder}
          isEmail={data?.isEmail}
          isTextarea={data?.isTextarea}
          isRequired={data?.isRequired}
          hasError={!!errors['0-1/email']}
          message={isFormSent ? successMessage['0-1/email'] : errors['0-1/email']}
          name='0-1/email'
          handleChange={handleChange}
          className={tm('w-full dark:text-neutral-0 text-neutral-900 -mt-4 ', inputClassName)}
          arrowPosition='right'
          arrowSubmits
          resetField={resetField}
        />
      </form>
    </div>
  );
};

export default Form;
