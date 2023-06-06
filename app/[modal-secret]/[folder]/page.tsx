import { PageLayout } from '@/components/PageLayout';
import { getPaginatedImages } from '@/utils/cloudinary';
import { notFound } from 'next/navigation';

export default async function StackbitModal({ params }: { params: { folder: string } }) {
  const folder = params.folder;

  if (!folder || !folder.length) return notFound();

  const imagePages = await getPaginatedImages({ folder });
  // const images = imagePages[0].images;
  const images = imagePages.flatMap((page) => page.images);

  if (!images || !images.length) return notFound();

  return <PageLayout images={images} />;
}
