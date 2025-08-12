import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import Markdown from '@/app/components/Common/Markdown';

interface Props {
  data: any;
}

const PrivacyPolicy = ({ data = {} }: Readonly<Props>) => (
  <Container className='relative'>
    <InnerContainer className='justify-between lg:flex'>
      <div className='lg:max-w-[34rem]'>
        <div className='sticky top-32 space-y-4 transition-all duration-300'>
          {!!data.Title && (
            <h2 className='font-bold font-heading text-heading-md-sm lg:text-heading-md'>{data.Title}</h2>
          )}
          {!!data.Description && (
            <Markdown className='mt-8 lg:mt-0 text-body-md-sm lg:text-body-md' text={data.Description} />
          )}
        </div>
      </div>

      {!!data.Questions && (
        <div className='mt-12 lg:mt-0 lg:max-w-[27.125rem] xl:max-w-[42.75rem] space-y-[5.5rem]'>
          {data.Questions.map((item: any) => (
            <div className='not:first:space-y-4' key={item.id}>
              {!!item.Question && (
                <h3 className='font-bold font-heading text-heading-sm-sm lg:text-heading-sm'>{item.Question}</h3>
              )}
              {!!item.Answer && <Markdown className='mt-4 text-body-md-sm lg:text-body-md' text={item.Answer} />}
              {!!item.Bullets.length && (
                <div className='mt-8 space-y-8 lg:mt-10 lg:space-y-10'>
                  {item.Bullets.map((bullet: any) => (
                    <div className='space-y-4' key={bullet.id}>
                      {!!bullet.Text && (
                        <p className='relative ml-5 font-semibold text-body-lg-sm lg:text-body-lg before:content-[""] before:w-3 before:h-3 before:rounded-full before:bg-pink-500 before:absolute before:top-[0.5rem] before:-left-5'>
                          {bullet.Text}
                        </p>
                      )}
                      {!!bullet.Description && (
                        <Markdown className='mt-4 text-body-md-sm lg:text-body-md' text={bullet.Description} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </InnerContainer>
  </Container>
);

export default PrivacyPolicy;
