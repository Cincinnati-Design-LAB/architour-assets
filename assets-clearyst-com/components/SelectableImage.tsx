'use client';

import { CloudinaryImage } from '@/utils/cloudinary';
import { Image } from '@unpic/react';

type Props = {
  image: CloudinaryImage;
};

export const SelectableImage = (props: Props) => {
  const handleClick = () => {
    const { public_id, width, height, url } = props.image;
    const imageData = { type: 'clearyst-cloudinary-assets', public_id, width, height, url };
    console.log('Chose image:', public_id);
    if (window.parent) {
      window.parent.postMessage(imageData, '*');
    }
  };

  return (
    <div
      className="overflow-hidden transition-all duration-300 border-4 border-transparent _select-image hover:cursor-pointer hover:border-blue-300"
      onClick={handleClick}
    >
      <Image src={props.image.url} aspectRatio={1} layout="fullWidth" alt={props.image.public_id} />
    </div>
  );
};
