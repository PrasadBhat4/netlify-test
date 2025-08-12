import FeatureCard from './Cards/FeatureCard';

interface Props {
  data: any;
}

const FeatureCardList = ({ data }: Readonly<Props>) => {
  const getGridClass = () => {
    const count = data?.length;

    if (count <= 3) {
      return 'grid-cols-1 md:grid-cols-3';
    }
    if (count === 4) {
      return 'grid-cols-1 md:grid-cols-4';
    }
    if (count <= 6) {
      return 'grid-cols-1 md:grid-cols-3';
    }
    if (count <= 8) {
      return 'grid-cols-1 md:grid-cols-4';
    }
    return 'grid-cols-1 md:grid-cols-4';
  };

  return (
    <div className='my-[4.5rem]'>
      <div className={`grid gap-4 ${getGridClass()} auto-rows-auto`}>
        {data?.map((content: any) => (
          <FeatureCard card={content} key={content.id} />
        ))}
      </div>
    </div>
  );
};

export default FeatureCardList;
