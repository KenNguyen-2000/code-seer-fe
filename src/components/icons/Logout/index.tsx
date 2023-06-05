import { IIcon } from '@/interfaces';
import React from 'react';

const LogoutIcon = ({
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
      className={'icon icon-tabler icon-tabler-logout' + ' ' + className}
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
      <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2'></path>
      <path d='M9 12h12l-3 -3'></path>
      <path d='M18 15l3 -3'></path>
    </svg>
  );
};

export default LogoutIcon;
