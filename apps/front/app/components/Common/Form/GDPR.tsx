'use client';

/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { z } from 'zod';
import SelectField from '@/app/components/Common/Form/components/SelectField';
import SubmitButton from '@/app/components/Common/Form/components/SubmitButton';
import TextField from '@/app/components/Common/Form/components/TextField';
import Success from '@/app/components/Common/Form/Success';
import { HandleChangeType, StrapiForm, StrapiSuccess } from '@/app/lib/types';
import { GDPRConsentText } from '../GDPRConsentText';

interface Props {
  data: StrapiForm;
  success: StrapiSuccess;
}

const Form = ({ data, success }: Readonly<Props>) => {
  const schema = z.object({
    '0-1/firstname':
      data?.FirstName?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(2, { message: 'This field is required' })
            .trim()
        : z.string().optional(),
    '0-1/lastname':
      data?.LastName?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(2, { message: 'This field is required' })
            .toLowerCase()
            .trim()
        : z.string().optional(),
    '0-1/company':
      data?.CompanyName?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(2, { message: 'This field is required' })
            .toLowerCase()
            .trim()
        : z.string().optional(),
    '0-1/email':
      data?.WorkEmail?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(2, { message: 'This field is required' })
            .email({ message: 'Invalid email address' })
            .toLowerCase()
            .trim()
        : z.string().optional(),
    '0-1/jobtitle':
      data?.JobTitle?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(1, { message: 'This field is required' })
            .trim()
            .toLowerCase()
        : z.string().optional(),
    '0-2/company_size_dropdown':
      data?.NumberOfDevelopers?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(1, { message: 'This field is required' })
            .trim()
            .toLowerCase()
        : z.string().optional(),
  });
  const [formValues, setFormValues] = useState<z.infer<typeof schema>>({
    '0-1/firstname': '',
    '0-1/lastname': '',
    '0-1/company': '',
    '0-1/email': '',
    '0-1/jobtitle': '',
    '0-2/company_size_dropdown': '',
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [isFormSent, setIsFormSent] = useState(false);

  const handleChange = (value: HandleChangeType) => {
    setFormValues({ ...formValues, ...value });
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setErrors({});

    const validationSchema = schema.safeParse(formValues);
    if (!validationSchema.success && validationSchema.error.issues.length) {
      const issues = validationSchema.error.issues.reduce((acc: { [key: string]: string }, current) => {
        const path = current.path.join('/');
        acc[path] = current.message;
        return acc;
      }, {});

      setErrors(issues);
      return;
    }

    // send data
    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '';
    const formGuid = process.env.NEXT_PUBLIC_HUBSPOT_GDPR_FORM_GUID ?? '';
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const mappedFields = Object.entries(validationSchema.data as unknown as Record<string, string>).map(
      ([key, value]) => {
        const [objectTypeId, name] = key.split('/');
        return {
          name,
          value,
          objectTypeId,
        };
      }
    );

    const formDataToSend = {
      submittedAt: `${new Date().getTime()}`,
      fields: mappedFields,
      context: {
        pageUri: window?.location?.href ?? 'https://coderabbit.ai/trust-center/gdpr',
        pageName: 'GDPR',
      },
    };

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });
      setIsFormSent(true);
      // eslint-disable-next-line no-restricted-globals
      scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      throw new Error('An error occurred while submitting the form');
    }
    setIsFormSent(true);
  };

  return !isFormSent ? (
    <form onSubmit={submitHandler}>
      <p className='font-semibold text-body-md-sm lg:text-body-md'>{data.Title}</p>
      <div className='flex flex-wrap w-full'>
        <div className='flex flex-col w-full gap-6 mt-6 md:flex-row md:justify-between md:items-start'>
          <TextField
            label={data?.FirstName?.Label}
            placeholder={data?.FirstName?.Placeholder}
            isEmail={data?.FirstName?.isEmail}
            isTextarea={data?.FirstName?.isTextarea}
            isRequired={data?.FirstName?.isRequired}
            hasError={!!errors['0-1/firstname']}
            message={errors['0-1/firstname']}
            name='0-1/firstname'
            handleChange={handleChange}
            className={`w-full  ${errors.firstname ? 'mt-9' : 'mt-3'}`}
          />
          <TextField
            label={data?.LastName?.Label}
            placeholder={data?.LastName?.Placeholder}
            isEmail={data?.LastName?.isEmail}
            isTextarea={data?.LastName?.isTextarea}
            isRequired={data?.LastName?.isRequired}
            hasError={!!errors['0-1/lastname']}
            message={errors['0-1/lastname']}
            name='0-1/lastname'
            handleChange={handleChange}
            className={`w-full  ${errors.lastname ? 'mt-9' : 'mt-3'}`}
          />
        </div>
        <TextField
          label={data?.CompanyName?.Label}
          placeholder={data?.CompanyName?.Placeholder}
          isEmail={data?.CompanyName?.isEmail}
          isTextarea={data?.CompanyName?.isTextarea}
          isRequired={data?.CompanyName?.isRequired}
          hasError={!!errors['0-1/company']}
          message={errors['0-1/company']}
          name='0-1/company'
          handleChange={handleChange}
          className='w-full mt-8'
        />
        <TextField
          label={data?.WorkEmail?.Label}
          placeholder={data?.WorkEmail?.Placeholder}
          isEmail={data?.WorkEmail?.isEmail}
          isTextarea={data?.WorkEmail?.isTextarea}
          isRequired={data?.WorkEmail?.isRequired}
          hasError={!!errors['0-1/email']}
          message={errors['0-1/email']}
          name='0-1/email'
          handleChange={handleChange}
          className='w-full mt-8'
        />
        <TextField
          label={data?.JobTitle?.Label}
          placeholder={data?.JobTitle?.Placeholder}
          isEmail={data?.JobTitle?.isEmail}
          isTextarea={data?.JobTitle?.isTextarea}
          isRequired={data?.JobTitle?.isRequired}
          hasError={!!errors['0-1/jobtitle']}
          message={errors['0-1/jobtitle']}
          name='0-1/jobtitle'
          handleChange={handleChange}
          className='w-full mt-8'
        />
        <SelectField
          label={data?.NumberOfDevelopers?.Label}
          placeholder={data?.NumberOfDevelopers?.Placeholder}
          options={data?.NumberOfDevelopers?.Options}
          isRequired={data?.NumberOfDevelopers?.isRequired}
          hasError={!!errors['0-2/company_size_dropdown']}
          message={errors['0-2/company_size_dropdown']}
          name='0-2/company_size_dropdown'
          handleChange={handleChange}
          className='w-full mt-8'
        />
      </div>
      <div className='flex items-center justify-between gap-6'>
        <GDPRConsentText />
        <SubmitButton text={data?.Button?.Text} submitHandler={submitHandler} className='whitespace-nowrap' />
      </div>
    </form>
  ) : (
    <Success success={success} />
  );
};

export default Form;
