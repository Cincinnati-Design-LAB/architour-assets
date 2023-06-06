import { CloudinaryImage } from '@/utils/cloudinary';
import { SelectableImage } from './SelectableImage';
import { UploadButton } from './UploadButton';

type Props = {
  images: CloudinaryImage[];
};

export const PageLayout = (props: Props) => {
  return (
    <main className="p-4">
      <div className="mb-4 text-right">
        <UploadButton />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {props.images.map((image, index) => (
          <SelectableImage image={image} key={index} />
        ))}
      </div>
    </main>
  );
};
