import classNames from 'classnames';

type BadgeProps = {
  label: string;
  theme: 'blue' | 'slate';
  href?: string;
  active?: boolean;
};

const themeClassMap: Record<BadgeProps['theme'], Record<'default' | 'active' | 'hover', string>> = {
  blue: {
    default: 'bg-blue-100 text-blue-600',
    active: 'bg-blue-500 text-white',
    hover: 'hover:bg-blue-200 hover:text-blue-700',
  },
  slate: {
    default: 'bg-slate-100 text-slate-600',
    active: 'bg-slate-500 text-white',
    hover: 'hover:bg-slate-200 hover:text-slate-700',
  },
};

export const Badge: React.FC<BadgeProps> = (props) => {
  const classes = classNames(
    'block',
    'text-xs',
    'tracking-wider',
    'rounded-full',
    'py-1',
    'px-2',
    'transition-colors',
    'duration-300',
    { [themeClassMap[props.theme].active]: props.active },
    { [themeClassMap[props.theme].default]: !props.active },
    { [themeClassMap[props.theme].hover]: props.href },
  );

  return props.href ? (
    <a className={classes} href={props.href}>
      {props.label}
    </a>
  ) : (
    <span className={classes}>{props.label}</span>
  );
};
