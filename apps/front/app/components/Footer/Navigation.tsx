import Link from '@/app/components/Common/Link';

const Navigation = ({ navigation }: { navigation: any }) => (
  <div className={navigation.length > 3 ? 'grid grid-cols-2 gap-6 md:flex md:gap-x-12' : 'flex gap-x-12'}>
    {navigation.map((columns: any) => (
      <div className='flex flex-col gap-y-4 text-neutral-900 dark:text-neutral-0' key={columns.id}>
        <p className='font-semibold text-body-sm text-neutral-900 dark:text-neutral-0'>{columns.Title}</p>
        {columns.Links.map((link: any) => (
          <Link
            key={link.id}
            text={link.Text}
            href={link.Url}
            isExternal={link.isExternal}
            className='dark:!text-neutral-0 text-neutral-900 dark:hover:!text-pink-500'
          />
        ))}
      </div>
    ))}
  </div>
);

export default Navigation;
