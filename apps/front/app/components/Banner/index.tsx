import { getStrapiData } from '@/app/actions/getStrapiData';
import BannerClient from '@/app/components/Banner/BannerClient';

const Banner = async () => {
  const strapiData = await getStrapiData('home-page');
  const attributes = strapiData?.data?.attributes;
  const announcement = attributes?.Announcment;

  if (!announcement) return null;

  return <BannerClient announcement={announcement} />;
};

export default Banner;
