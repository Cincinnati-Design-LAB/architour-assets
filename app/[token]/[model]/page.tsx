import { FolderSearch } from '@/components/FolderSearch';
import { getFoldersList } from '@/utils/cloudinary';
import { notFound } from 'next/navigation';

export default async function StackbitModal({
  params,
}: {
  params: { token: string; model: string };
}) {
  const { token, model } = params;

  if (!model || !model.length) return notFound();

  const folders = await getFoldersList(model);

  return (
    <main className="p-4">
      <FolderSearch model={model} imagesToken={token} folders={folders} />
    </main>
  );
}
