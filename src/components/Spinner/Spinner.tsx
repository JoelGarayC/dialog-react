import React, { type CSSProperties } from 'react';
import style from './spinner.module.css';

interface SpinnerProps {
  isPage?: boolean;
  minHeight?: string;
  styles?: CSSProperties;
}

export const Spinner: React.FC<SpinnerProps> = ({
  isPage = false,
  minHeight = '',
  styles
}) => {
  let classes = style.spinner;
  if (isPage) {
    classes += ` ${style.spinnerPage}`;
  }

  return (
    <div
      className={classes}
      style={minHeight.length > 0 ? { minHeight } : styles}
    >
      <div></div>
    </div>
  );
};
