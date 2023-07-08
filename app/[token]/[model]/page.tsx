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
      <ul>
        {folders.map((folder, index) => (
          <li key={index} className="block mb-1">
            <a className="underline" href={`/${token}/${folder.path}`}>
              {folder.name}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
