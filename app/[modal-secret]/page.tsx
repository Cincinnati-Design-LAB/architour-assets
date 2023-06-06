import { PageLayout } from '@/components/PageLayout';
import { getPaginatedImages } from '@/utils/cloudinary';

export default async function StackbitModal() {
  const imagePages = await getPaginatedImages();
  // const images = imagePages[0].images;
  const images = imagePages.flatMap((page) => page.images);

  return <PageLayout images={images} />;
}
