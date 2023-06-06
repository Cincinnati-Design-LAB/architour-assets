import { CloudinaryImage } from '@/utils/cloudinary';
import { SelectableImage } from './SelectableImage';
import { UploadButton } from './UploadButton';

type Props = {
  images: CloudinaryImage[];
  folder?: string;
  uploadKey: string;
  imagesToken: string;
};

export const PageLayout = (props: Props) => {
  return (
    <main className="p-4">
      <div className="mb-4 text-right">
        <UploadButton
          imagesToken={props.imagesToken}
          uploadKey={props.uploadKey}
          folder={props.folder}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {props.images.map((image, index) => (
          <SelectableImage image={image} key={index} />
        ))}
      </div>
    </main>
  );
};
