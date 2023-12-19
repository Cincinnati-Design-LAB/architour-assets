import { IMAGES_TOKEN } from '@/utils/constants';
import { Badge } from './Badge';
import { CaretRightIcon } from './Icon';

type Props = {
  model: string;
  folder?: string;
};

export const Header: React.FC<Props> = (props) => {
  const folder = props.folder ? props.folder.split('/').pop() : undefined;
  return (
    <div className="flex items-center gap-3 pt-6 pb-2">
      <Badge label={props.model} theme="slate" href={`/${IMAGES_TOKEN}/${props.model}`} />
      {folder && (
        <>
          <span className="block w-3 text-gray-300">
            <CaretRightIcon />
          </span>
          <Badge label={folder} theme="slate" href={`/${IMAGES_TOKEN}/${props.model}/${folder}`} />
        </>
      )}
    </div>
  );
};
