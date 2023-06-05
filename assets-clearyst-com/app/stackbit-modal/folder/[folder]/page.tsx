import { SelectableImage } from '@/components/SelectableImage';
import { UploadButton } from '@/components/UploadButton';
import { getPaginatedImages } from '@/utils/cloudinary';

export default async function StackbitModal({ params }: { params: { folder: string } }) {
  const imagePages = await getPaginatedImages({ folder: params.folder });
  // const images = imagePages[0].images;
  const images = imagePages.flatMap((page) => page.images);

  // console.log(images);

  return (
    <main className="p-4">
      <div className="mb-4 text-right">
        <UploadButton />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => {
          return <SelectableImage image={image} key={index} />;
        })}
      </div>
    </main>
  );
}
