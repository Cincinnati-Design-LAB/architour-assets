'use client';

import { CloudinaryImage } from '@/utils/cloudinary';
import { Image } from '@unpic/react';
import { useRouter } from 'next/navigation';
import { Dispatch, MouseEvent, MouseEventHandler, SetStateAction, useState } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';
import { Modal } from './Modal';

type Props = {
  image: CloudinaryImage;
  imagesToken: string;
};

export const SelectableImage = (props: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClick = () => {
    const { public_id, width, height, url } = props.image;
    const imageData = { type: 'clearyst-cloudinary-assets', public_id, width, height, url };
    console.log('Chose image:', public_id);
    if (window.parent) {
      window.parent.postMessage(imageData, '*');
    }
  };

  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setShowDeleteModal(true);
  };

  return (
    <div className="group">
      <div
        className="overflow-hidden transition-all relative duration-300 border-4 border-transparent _select-image hover:cursor-pointer hover:border-blue-300 hover:bg-gray-100 pb-[calc(100%-0.5rem)] group"
        onClick={handleClick}
      >
        <div className="absolute z-10 w-full h-full transition-opacity duration-300 opacity-0 bg-white/60 group-hover:opacity-100" />
        <button
          className="absolute z-20 w-6 transition-opacity duration-300 opacity-0 top-2 right-2 text-slate-500 group-hover:opacity-100"
          onClick={handleDeleteClick}
        >
          <Icon icon="delete" />
        </button>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <Image
            src={props.image.url}
            width={props.image.width}
            height={props.image.height}
            alt={props.image.public_id}
          />
        </div>
      </div>
      <span className="block text-sm font-medium tracking-wide text-gray-500">
        {props.image.filename}
      </span>
      {showDeleteModal && (
        <DeleteImageModal {...props} setDeleteModalVisible={setShowDeleteModal} />
      )}
    </div>
  );
};

/* ----- Delete Image Modal ----- */

type DeleteImageModalProps = Props & { setDeleteModalVisible: Dispatch<SetStateAction<boolean>> };

const DeleteImageModal: React.FC<DeleteImageModalProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setLoading(true);

    console.log(`Deleting image: ${props.image.public_id}`);

    const body = {
      image: props.image,
      __token__: props.imagesToken,
      __secret__: '', // Secret key should be an empty string
    };

    try {
      const res = await fetch('/api/delete-image', { method: 'POST', body: JSON.stringify(body) });

      if (!res.ok) {
        const error = await res.json();
        console.error('[UPLOAD ERROR]', error.error);
        setError('Something went wrong, check your console.');
        return;
      }
    } catch (error) {
      console.error('[UPLOAD ERROR]', error);
      setError('Something went wrong, check your console.');
      return;
    }

    setLoading(false);
    props.setDeleteModalVisible(false);
    router.refresh();
  };

  return (
    <Modal heading="Delete image confirmation" setVisibility={props.setDeleteModalVisible}>
      {loading && !error && <p>Please wait ...</p>}
      {!loading && !error && (
        <div className="flex items-center gap-4">
          <p className="mb-2">Are you sure?</p>
          <Button label="Delete Image" onClick={handleDelete} />
        </div>
      )}
      {error && <p className="font-bold text-red-600">{error}</p>}
    </Modal>
  );
};
