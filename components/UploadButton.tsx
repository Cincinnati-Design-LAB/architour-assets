'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Modal } from './Modal';

type Props = {
  folder?: string;
  uploadKey: string;
  imagesToken: string;
};

export const UploadButton = (props: Props) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        className={classNames(
          'justify-center w-16 h-16 flex items-center bg-blue-500 fixed bottom-4 right-4 rounded-full z-40 shadow-md hover:bg-blue-600 transition-all duration-300',
        )}
        onClick={() => setShowForm(true)}
      >
        <span className="font-bold text-white text-4xl block leading-[1]">+</span>
      </button>
      {showForm && <UploadForm {...props} setModalVisible={setShowForm} />}
    </>
  );
};

/* ----- Upload Form ----- */

const UploadForm: React.FC<Props & { setModalVisible: Dispatch<SetStateAction<boolean>> }> = (
  props,
) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    console.log('Uploading image ...');

    const file = fileInputRef?.current?.files ? fileInputRef?.current?.files[0] : undefined;
    if (!file) {
      console.error('File not found');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    // Add filename
    formData.append('filename', file.name);
    // Add folder
    if (props.folder) formData.append('folder', props.folder);

    // Add secret keys
    formData.append('__key__', props.uploadKey);
    formData.append('__token__', props.imagesToken);
    formData.append('__secret__', ''); // Secret key should be left blank

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

    router.refresh();
    if (fileInputRef?.current?.value) fileInputRef.current.value = '';
    setUploading(false);
    props.setModalVisible(false);
  };

  return (
    <Modal heading="Upload new file" setVisibility={props.setModalVisible}>
      {!uploading && (
        <form
          className="flex items-center justify-between"
          action="/api/upload"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="file" name="file" id="upload-image-file" ref={fileInputRef} required />
          <input
            type="submit"
            value="Upload File"
            className="inline-block px-4 py-2 text-white transition-all duration-300 bg-blue-500 rounded-sm hover:bg-blue-600"
          />
        </form>
      )}
      {uploading && <div>Image is uploading ...</div>}
    </Modal>
  );
};
