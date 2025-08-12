import Link from '@/app/components/Common/Link';

const TermsPrivacyCopy = ({ terms, privacy, copyright }: any) => (
  <>
    {terms && (
      <>
        <Link
          text={terms.Text}
          href={terms.Url}
          isExternal={terms.isExternal}
          className='dark:!text-neutral-0 text-neutral-900 hover:!text-pink-500'
        />
        <div className='hidden w-px h-6 md:block dark:bg-neutral-0 bg-neutral-900' />
      </>
    )}
    {privacy && (
      <>
        <Link
          text={privacy.Text}
          href={privacy.Url}
          isExternal={privacy.isExternal}
          className='dark:!text-neutral-0 text-neutral-900 hover:!text-pink-500'
        />
        <div className='w-full h-px md:block md:w-px md:h-6 dark:bg-neutral-0 bg-neutral-900' />
      </>
    )}
    <p className='dark:text-neutral-0 text-neutral-900 '>{copyright}</p>
  </>
);

export default TermsPrivacyCopy;
