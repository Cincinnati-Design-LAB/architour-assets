import { PageLayout } from '@/components/PageLayout';
import { getPaginatedImages } from '@/utils/cloudinary';
import { IMAGES_TOKEN, UPLOAD_KEY } from '@/utils/constants';
import { notFound } from 'next/navigation';

export default async function StackbitModal({ params }: { params: { folder: string } }) {
  let folder = [params.folder].flat().filter(Boolean).join('/');
  console.log({ folder });

  if (!folder || !folder.length) return notFound();

  const imagePages = await getPaginatedImages({ folder });
  // const images = imagePages[0].images;
  const images = imagePages.flatMap((page) => page.images);

  if (!images || !images.length) return notFound();

  return (
    <PageLayout images={images} imagesToken={IMAGES_TOKEN} uploadKey={UPLOAD_KEY} folder={folder} />
  );
}
