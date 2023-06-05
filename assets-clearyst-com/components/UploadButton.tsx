'use client';

import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

export const UploadButton = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadReady, setUploadReady] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!fileInputRef.current) {
      console.error('Could not find file input');
      return;
    }
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    console.log('Submitting form ...');
    // if (!formRef.current) {
    //   console.error('Could not find form');
    //   return;
    // }
    // formRef.current.submit();

    const file = fileInputRef.current?.files ? fileInputRef.current?.files[0] : undefined;
    if (!file) {
      console.error('File not found');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      console.error('something went wrong, check your console.');
      return;
    }

    const data = await res.json();

    console.log({ data });
  };

  useEffect(() => {
    const checkIfJsReady = () => {
      if (typeof window === 'undefined') {
        setTimeout(checkIfJsReady, 100);
        return;
      }
      setUploadReady(true);
    };

    checkIfJsReady();
  }, []);

  return (
    <>
      <form action="/api/upload" method="POST" ref={formRef}>
        <input
          type="file"
          name="file"
          id="upload-image-file"
          ref={fileInputRef}
          onChange={handleSubmit}
          className="hidden"
        />
      </form>
      <button
        id="_upload-trigger"
        className={classNames('inline-block px-6 py-2 text-white bg-blue-500', {
          hidden: !uploadReady,
        })}
        onClick={handleClick}
      >
        Upload New Image
      </button>
    </>
  );
};
