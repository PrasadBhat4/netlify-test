import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/app/components/Common/Heroes/TrustCenter';
import Pills from '@/app/components/Common/Pills';
import Security from '@/app/components/TrustCenter/Security';
import SecurityDevelopment from '@/app/components/TrustCenter/SecurityDevelopment';
import PrivacyPolicy from '@/app/components/TrustCenter/PrivacyPolicy';
import Contact from '@/app/components/Common/Contact';
import { getPageMetadata, getStrapiData } from '@/app/actions/getStrapiData';
import { parseMetadata } from '@/app/lib/utils';

export async function generateMetadata(__: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const pageMetadata = await getPageMetadata('trust-center');
  const parentMetadata = await parent;
  return parseMetadata({ pageMetadata, parentMetadata });
}

const TrustCenterPage = async () => {
  const strapiData = await getStrapiData('trust-center');

  if (strapiData?.data === null) notFound();

  const hero = strapiData?.data?.attributes?.Hero;
  const compliance = strapiData?.data?.attributes?.Pills;
  const security = strapiData?.data?.attributes?.Security;
  const secureDevelopment = strapiData?.data?.attributes?.SecureDevelopment;
  const privacyPolicy = strapiData?.data?.attributes?.PrivacyPolicy;
  const contact = strapiData?.data?.attributes?.Contact;

  return (
    <div className='space-y-16 md:space-y-30 lg:space-y-38'>
      {hero && <Hero data={hero} />}
      {compliance && <Pills data={compliance} />}
      {security && <Security data={security} />}
      {secureDevelopment && <SecurityDevelopment data={secureDevelopment} />}
      {privacyPolicy && <PrivacyPolicy data={privacyPolicy} />}
      {contact && <Contact data={contact} />}
    </div>
  );
};

export default TrustCenterPage;
