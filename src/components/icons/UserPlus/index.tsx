import { IIcon } from '@/interfaces';
import React from 'react';

const UserPlus = ({
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
      className={'icon icon-tabler icon-tabler-user-plus ' + className}
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
      <path stroke='none' d='M0 0h24v24H0z' fill={fill || 'none'}></path>
      <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0'></path>
      <path d='M16 19h6'></path>
      <path d='M19 16v6'></path>
      <path d='M6 21v-2a4 4 0 0 1 4 -4h4'></path>
    </svg>
  );
};

export default UserPlus;
