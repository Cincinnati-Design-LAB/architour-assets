import { PageLayout } from '@/components/PageLayout';
import { getPaginatedImages } from '@/utils/cloudinary';

export default async function StackbitModal({ params }: { params: { folder: string } }) {
  const folder = params.folder;
  const imagePages = await getPaginatedImages({ folder });
  // const images = imagePages[0].images;
  const images = imagePages.flatMap((page) => page.images);

  return <PageLayout images={images} />;
}
