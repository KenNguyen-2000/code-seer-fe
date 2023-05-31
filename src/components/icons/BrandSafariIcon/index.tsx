import { IIcon } from '@/interfaces';
import React from 'react';

const BrandSafariIcon = ({
  width,
  height,
  fill,
  onClick,
  className,
  id,
  strokeWidth,
}: IIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={'icon icon-tabler icon-tabler-brand-safari ' + className}
      id={id}
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth || '2'}
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      onClick={onClick}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill={'none' || fill}></path>
      <path d='M8 16l2 -6l6 -2l-2 6l-6 2'></path>
      <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0'></path>
    </svg>
  );
};

export default BrandSafariIcon;
