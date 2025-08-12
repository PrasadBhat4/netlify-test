'use client';

import InnerContainer from '@/app/components/Common/InnerContainer';
import Container from '@/app/components/Common/Container';
import ColorPalette, { ColorPaletteData } from './ColorPalette';

const ColorPaletteList = ({
  colorPalette,
}: {
  colorPalette: { Title?: string; Description?: string; AssetCard: ColorPaletteData[] };
}) => {
  return (
    <Container className='!mt-16 !mt-20'>
      <InnerContainer>
        <div className='md:p-4 bg-gray-900 rounded-2xl p-8 mb-16'>
          <h2 className='text-heading-md font-bold font-heading dark:text-white text-neutral-900 mb-4'>
            {colorPalette?.Title}
          </h2>
          <p className='mt-4 text-body-xl-sm font-[400] text-gray-300 mb-8'>{colorPalette?.Description}</p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {colorPalette?.AssetCard?.map(card => {
              return (
                <div key={card.id} className=''>
                  <ColorPalette data={card} />
                </div>
              );
            })}
          </div>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default ColorPaletteList;
