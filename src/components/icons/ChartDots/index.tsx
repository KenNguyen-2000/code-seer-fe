import { IIcon } from '@/interfaces';
import React from 'react';

const ChartDots = ({
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
      className={'icon icon-tabler icon-tabler-chart-dots-2 ' + className}
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
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M3 3v18h18'></path>
      <path d='M9 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path>
      <path d='M13 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path>
      <path d='M18 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path>
      <path d='M21 3l-6 1.5'></path>
      <path d='M14.113 6.65l2.771 3.695'></path>
      <path d='M16 12.5l-5 2'></path>
    </svg>
  );
};

export default ChartDots;
