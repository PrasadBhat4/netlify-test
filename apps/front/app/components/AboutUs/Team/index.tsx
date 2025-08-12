import InnerContainer from '@/app/components/Common/InnerContainer';
import Member from '@/app/components/AboutUs/Team/Member';
import { MemberType, StrapiAdvisor, StrapiTeam } from '@/app/lib/types';
import StrapiImage from '../../Common/StrapiImage';

interface Props {
  data: {
    team: StrapiTeam;
    advisors: StrapiAdvisor;
  };
}

const Team = ({ data }: Readonly<Props>) => (
  <section className='px-4 py-16 md:py-20 xl:py-30 bg-neutral-900 text-neutral-0'>
    <InnerContainer>
      {data?.team?.Title ? (
        <h2 className='font-bold font-heading text-heading-lg-sm lg:text-heading-lg'>{data?.team?.Title}</h2>
      ) : null}
      {data?.team?.Description ? (
        <p className='mt-4 text-body-md-sm lg:text-body-md max-w-[49.375rem]'>{data?.team?.Description}</p>
      ) : null}
      <StrapiImage
        src={data?.team?.Image?.data?.attributes?.url}
        width={1058}
        height={1078}
        alt={`Avatar ${data?.team?.Image?.data?.attributes?.alternativeText}`}
        className='w-full mt-20 grayscale rounded-[40px]'
      />
      {data?.team?.Members?.length > 0 && (
        <div className='flex flex-wrap justify-center mt-8 md:justify-start gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12 lg:gap-y-16 md:mt-12 lg:mt-20'>
          {data?.team?.Members?.map((member: MemberType) => (
            <Member key={member.id} data={member} />
          ))}
        </div>
      )}
    </InnerContainer>
    <InnerContainer className='mt-8 md:mt-12 lg:mt-24'>
      {data?.advisors?.Title ? (
        <h2 className='font-bold font-heading text-heading-lg-sm lg:text-heading-lg'>{data?.advisors?.Title}</h2>
      ) : null}
      {data?.advisors?.Description ? (
        <p className='mt-4 text-body-md-sm lg:text-body-md max-w-[49.375rem]'>{data?.advisors?.Description}</p>
      ) : null}
      {data?.advisors?.Members?.length && (
        <div className='flex flex-wrap mt-8 justify-center sm:justify-start gap-x-7 gap-y-8 md:gap-x-6 md:gap-y-12 lg:gap-y-16 md:mt-12 lg:mt-20'>
          {data?.advisors?.Members.map((member: MemberType) => (
            <Member key={member.id} data={member} />
          ))}
        </div>
      )}
    </InnerContainer>
  </section>
);

export default Team;
