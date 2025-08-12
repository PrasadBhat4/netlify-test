'use client';

/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { z } from 'zod';
import CheckBox from '@/app/components/Common/Form/components/CheckBox';
import SubmitButton from '@/app/components/Common/Form/components/SubmitButton';
import TextField from '@/app/components/Common/Form/components/TextField';
import Success from '@/app/components/Common/Form/Success';
import { HandleChangeType, StrapiFormStartupProgram, StrapiSuccess } from '@/app/lib/types';
import { GDPRConsentText } from '../GDPRConsentText';

interface Props {
  data: StrapiFormStartupProgram;
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
            .min(1, { message: 'This field is required' })
            .toLowerCase()
            .trim()
        : z.string().optional(),
    '0-1/lastname':
      data?.LastName?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(1, { message: 'This field is required' })
            .toLowerCase()
            .trim()
        : z.string().optional(),
    '0-1/company':
      data?.CompanyWebsite?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(1, { message: 'This field is required' })
            .toLowerCase()
            .trim()
        : z.string().optional(),
    '0-1/funding_info__link_':
      data?.FundingDetails?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(1, { message: 'This field is required' })
            .toLowerCase()
            .trim()
        : z.string().optional(),
    '0-2/github_repo_name':
      data?.GitOrgName?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(1, { message: 'This field is required' })
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
    '0-1/email':
      data?.Email?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
              invalid_type_error: 'This field must be a string',
            })
            .min(1, { message: 'This field is required' })
            .email({ message: 'Invalid email address' })
            .toLowerCase()
            .trim()
        : null,
    '0-1/please_confirm_you_ve_signed_up_for_a_trial_so_that_we_can_extend_it_':
      data?.TrialCheckbox?.isRequired === true
        ? z
            .string({
              required_error: 'This field is required',
            })
            .min(1, { message: 'This field is required' })
            .refine(value => value === 'true', { message: 'This field is required' })
        : z.string().optional(),
  });

  const [formValues, setFormValues] = useState<z.infer<typeof schema>>({
    '0-1/firstname': '',
    '0-1/lastname': '',
    '0-1/company': 'Student Program',
    '0-1/funding_info__link_': 'Student Program',
    '0-2/github_repo_name': '',
    '0-1/jobtitle': 'Student Program',
    '0-1/email': '',
    '0-1/please_confirm_you_ve_signed_up_for_a_trial_so_that_we_can_extend_it_': '',
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [isFormSent, setIsFormSent] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleChange = (value: HandleChangeType) => {
    setFormValues({ ...formValues, ...value });
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setErrors({});
    setSubmissionError(null);

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
    const formGuid = process.env.NEXT_PUBLIC_HUBSPOT_STARTUP_FORM_GUID ?? '';
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
        pageUri: window?.location?.href ?? 'https://coderabbit.ai/startup-program',
        pageName: 'Student Program',
      },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // eslint-disable-next-line no-console
        console.error('Submission Error:', errorData);
        setSubmissionError(errorData.message || 'An error occurred while submitting the form.');
        return;
      }

      setIsFormSent(true);
      // eslint-disable-next-line no-restricted-globals
      scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmissionError('An error occurred while submitting the form.');
    }
  };

  return !isFormSent ? (
    <form onSubmit={submitHandler}>
      <p className='font-semibold text-body-md-sm lg:text-body-md'>{data.Title}</p>
      <div className='flex flex-wrap w-full'>
        <div className='flex flex-col w-full gap-6 mt-6 md:flex-row md:justify-between md:items-start'>
          {data?.FirstName && (
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
          )}

          {data?.LastName && (
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
          )}
        </div>
        {data?.CompanyWebsite && (
          <TextField
            label={data?.CompanyWebsite?.Label}
            placeholder={data?.CompanyWebsite?.Placeholder}
            isEmail={data?.CompanyWebsite?.isEmail}
            isTextarea={data?.CompanyWebsite?.isTextarea}
            isRequired={data?.CompanyWebsite?.isRequired}
            hasError={!!errors['0-1/company']}
            message={errors['0-1/company']}
            name='0-1/company'
            handleChange={handleChange}
            className='w-full mt-8'
          />
        )}

        {data?.FundingDetails && (
          <TextField
            label={data?.FundingDetails?.Label}
            placeholder={data?.FundingDetails?.Placeholder}
            isEmail={data?.FundingDetails?.isEmail}
            isTextarea={data?.FundingDetails?.isTextarea}
            isRequired={data?.FundingDetails?.isRequired}
            hasError={!!errors['0-1/funding_info__link_']}
            message={errors['0-1/funding_info__link_']}
            name='0-1/funding_info__link_'
            handleChange={handleChange}
            className='w-full mt-8'
          />
        )}
        {data?.GitOrgName && (
          <TextField
            label={data?.GitOrgName?.Label}
            placeholder={data?.GitOrgName?.Placeholder}
            isEmail={data?.GitOrgName?.isEmail}
            isTextarea={data?.GitOrgName?.isTextarea}
            isRequired={data?.GitOrgName?.isRequired}
            hasError={!!errors['0-2/github_repo_name']}
            message={errors['0-2/github_repo_name']}
            name='0-2/github_repo_name'
            handleChange={handleChange}
            className='w-full mt-8'
          />
        )}
        {data?.JobTitle && (
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
        )}
        {data?.Email && (
          <TextField
            label={data?.Email?.Label}
            placeholder={data?.Email?.Placeholder}
            isEmail={data?.Email?.isEmail}
            isTextarea={data?.Email?.isTextarea}
            isRequired={data?.Email?.isRequired}
            hasError={!!errors['0-1/email']}
            message={errors['0-1/email']}
            name='0-1/email'
            handleChange={handleChange}
            className='w-full mt-8'
          />
        )}
        {data?.TrialCheckbox && (
          <CheckBox
            label={data?.TrialCheckbox?.Label}
            isRequired={data?.TrialCheckbox?.isRequired}
            hasError={!!errors['0-1/please_confirm_you_ve_signed_up_for_a_trial_so_that_we_can_extend_it_']}
            message={errors['0-1/please_confirm_you_ve_signed_up_for_a_trial_so_that_we_can_extend_it_']}
            name='0-1/please_confirm_you_ve_signed_up_for_a_trial_so_that_we_can_extend_it_'
            handleChange={handleChange}
            className='w-full mt-8'
          />
        )}
      </div>
      <div className='flex items-center justify-between'>
        <GDPRConsentText />
        <SubmitButton text={data?.Button?.Text} submitHandler={submitHandler} />
      </div>
      {submissionError && <p className='mt-4 text-red-500'>{submissionError}</p>}
    </form>
  ) : (
    <Success success={success} />
  );
};

export default Form;
