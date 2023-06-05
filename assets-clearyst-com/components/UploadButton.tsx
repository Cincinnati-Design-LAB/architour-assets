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

  const handleSubmit = () => {
    if (!formRef.current) {
      console.error('Could not find form');
      return;
    }
    formRef.current.submit();
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
          id="upload-image-file"
          ref={fileInputRef}
          multiple={true}
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
