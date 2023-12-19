'use client';

import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useRef } from 'react';
import { Portal } from 'react-portal';

type ModalProps = {
  heading: string;
  setVisibility: Dispatch<SetStateAction<boolean>>;
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = (props) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) props.setVisibility(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') props.setVisibility(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <Portal>
      <div
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur"
        onClick={handleOutsideClick}
        ref={backdropRef}
      >
        <div
          className="relative bg-white border border-gray-200 rounded-sm shadow-md max-w-[calc(100%-2rem)] w-[32rem]"
          data-modal
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-b-gray-200">
            <h2 className="font-semibold text-gray-600">{props.heading}</h2>
            <button className="text-lg text-gray-400" onClick={() => props.setVisibility(false)}>
              X
            </button>
          </div>
          <div className="px-4 py-8">{props.children}</div>
        </div>
      </div>
    </Portal>
  );
};
