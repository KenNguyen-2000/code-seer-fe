import React from 'react';
import Loader from '../Loader';

interface IButtonOutline {
  id?: string;
  className?: string;
  onClick?: any;
  children?: any;
  text?: string;
  style?: React.CSSProperties;
  type?: 'submit' | 'reset' | 'button' | undefined;
  isLoading?: boolean;
}

const ButtonOutline = ({
  id,
  className,
  onClick,
  children,
  text,
  style,
  type,
  isLoading = false,
}: IButtonOutline) => {
  return (
    <button
      id={id}
      className={`${className} bg-white border-2 border-solid border-dark_blue py-2 px-8 font-semibold text-dark_blue hover:bg-dark_blue hover:text-white transition relative`}
      style={style}
      onClick={onClick}
      type={type}
    >
      {!isLoading ? (
        [...children]
      ) : (
        <div className='h-[20px] w-[20px] rounded-full border-4 border-transparent border-t-dark_blue animate-spin'></div>
      )}
    </button>
  );
};

export default ButtonOutline;
