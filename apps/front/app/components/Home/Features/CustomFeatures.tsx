import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import Button from '@/app/components/Common/Button';

import BigCard from '@/app/components/Home/Features/Cards/Big';
import MediumCard from '@/app/components/Home/Features/Cards/Medium';
import SmallCard from '@/app/components/Home/Features/Cards/Small';

type CardType = 'medium' | 'small' | 'big';

interface Feature {
  id: string;
  CardType?: CardType;
}

const getCardTypeByIndex = (index: number): CardType => {
  if ([0, 3, 4].includes(index)) return 'medium';
  if ([1, 2, 5].includes(index)) return 'small';
  return 'big';
};

const CardComponent = ({
  feature,
  index,
  cardType,
  customLayout,
}: {
  feature: Feature;
  index: number;
  cardType: CardType;
  customLayout: boolean;
}) => {
  const props = { data: feature };
  if (cardType === 'medium') return <MediumCard index={customLayout ? 0 : index} key={feature.id} {...props} />;
  if (cardType === 'small') return <SmallCard index={customLayout ? 1 : index} key={feature.id} {...props} />;
  return <BigCard index={customLayout ? 6 : index} key={feature.id} {...props} />;
};

interface Props {
  data: {
    CustomLayout: boolean;
    Features: Feature[];
    Button: any;
  };
}

const Features = ({ data = { CustomLayout: false, Features: [], Button: {} } }: Readonly<Props>) => (
  <Container id='features'>
    <InnerContainer className='lg:max-xl:max-w-[68.25rem]'>
      <div className='flex flex-wrap gap-6 justify-center'>
        {data.CustomLayout
          ? data.Features.map((feature: Feature, index: number) => (
              <CardComponent
                customLayout={data.CustomLayout}
                cardType={feature.CardType as CardType}
                feature={feature}
                index={index}
                key={feature.id}
              />
            ))
          : data.Features.map((feature: Feature, index: number) => {
              const cardType = getCardTypeByIndex(index);
              return (
                <CardComponent
                  customLayout={data.CustomLayout}
                  cardType={cardType}
                  feature={feature}
                  index={index}
                  key={feature.id}
                />
              );
            })}
      </div>
    </InnerContainer>

    <InnerContainer className='flex justify-center mt-12 lg:justify-start'>
      <div className='w-full md:w-auto'>
        {data.Button && (
          <Button
            text={data.Button.Text}
            variant='primary'
            href={data.Button.Url}
            isExternal={data.Button.isExternal}
            arrowPosition='right'
            className='w-full md:w-auto'
          />
        )}
      </div>
    </InnerContainer>
  </Container>
);

export default Features;
