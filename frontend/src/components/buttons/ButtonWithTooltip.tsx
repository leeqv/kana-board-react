import {
  useRef,
  useState,
  type ComponentType,
  type MouseEventHandler,
  type ReactNode,
} from 'react';
import { TOOLTIP_TEXTS } from '../../constants/tooltipTexts';

type ButtonWithTooltipType = {
  type: 'Favorites' | 'Copy' | 'Clear' | 'Insert';
  clickHandler?: () => void;
  Icon?: ComponentType<{ className?: string }>;
  mouseDownHandler?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  isFavorite?: boolean;
  children?: ReactNode;
};

function ButtonWithTooltip({
  clickHandler,
  mouseDownHandler,
  disabled,
  className,
  isFavorite,
  type,
  Icon,
  children,
}: ButtonWithTooltipType) {
  const defaultText = isFavorite
    ? TOOLTIP_TEXTS[type][2]
    : TOOLTIP_TEXTS[type][0];

  const [text, setText] = useState(defaultText);
  const [visible, setVisible] = useState(false);

  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function tooltipHandler() {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }

    setText(isFavorite ? TOOLTIP_TEXTS[type][3] : TOOLTIP_TEXTS[type][1]);
    setVisible(true);

    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 2000);
  }

  function handleClick() {
    if (clickHandler) {
      clickHandler();
    }
    tooltipHandler();
  }

  const handleMouseEnter = () => {
    showTimeoutRef.current = setTimeout(() => {
      setText(defaultText);
      setVisible(true);
    }, 2000);
  };

  const handleMouseLeave = () => {
    if (showTimeoutRef.current !== null) {
      clearTimeout(showTimeoutRef.current);
    }

    setVisible(false);
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={mouseDownHandler}
      type="button"
      className={`btn-tooltip${className ? ' ' + className : ''}${isFavorite ? ' active' : ''}${Icon ? ' btn-icon' : ''}`}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children && children}
      {Icon && <Icon className="icon" />}
      <span className={`btn-tooltip__tooltip${visible ? ' show' : ''}`}>
        {text}
      </span>
    </button>
  );
}

export default ButtonWithTooltip;