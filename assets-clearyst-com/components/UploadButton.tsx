'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

type Props = {
  folder?: string;
};

export const UploadButton = (props: Props) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        className={classNames('inline-block px-6 py-2 text-white bg-blue-500')}
        onClick={() => setShowForm(true)}
      >
        Upload New Image
      </button>
      {showForm && <UploadForm {...props} />}
    </>
  );
};

/* ----- Upload Form ----- */

const UploadForm: React.FC<Props> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Uploading image ...');

    const file = fileInputRef.current?.files ? fileInputRef.current?.files[0] : undefined;
    if (!file) {
      console.error('File not found');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    if (props.folder) formData.append('folder', props.folder);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('[UPLOAD ERROR]', error.error);
      alert('Something went wrong, check your console.');
      return;
    }

    // const data = await res.json();
    // console.log({ data });

    router.refresh();
    if (fileInputRef.current?.value) fileInputRef.current.value = '';
  };

  return (
    <form action="/api/upload" method="POST" onSubmit={handleSubmit}>
      <input type="file" name="file" id="upload-image-file" ref={fileInputRef} />
      <input type="submit" value="Upload Files" />
    </form>
  );
};
