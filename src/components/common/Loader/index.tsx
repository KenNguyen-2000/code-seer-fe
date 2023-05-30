import React from 'react';
import styles from './Loader.module.scss';

interface ILoader {
  className?: string;
  width?: string;
  height?: string;
  color?: string;
  borderWidth?: string;
}

const Loader: React.FC<ILoader> = ({
  className,
  width,
  height,
  color,
  borderWidth,
}) => {
  return (
    <div
      className={`${styles.lds_ring} ${className} `}
      style={{
        width: width,
        height: height,
      }}
    >
      <div style={{ borderWidth: borderWidth, color: color }}></div>
      <div style={{ borderWidth: borderWidth, color: color }}></div>
      <div style={{ borderWidth: borderWidth, color: color }}></div>
      <div style={{ borderWidth: borderWidth, color: color }}></div>
    </div>
  );
};

export default Loader;
