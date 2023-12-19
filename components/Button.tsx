import classNames from 'classnames';

type ButtonProps = {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={classNames(
        'inline-block px-4 py-2 text-white transition-all duration-300 bg-blue-500 rounded-sm hover:bg-blue-600',
      )}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
