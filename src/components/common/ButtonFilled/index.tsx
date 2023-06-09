import React from 'react';

interface IButtonFilled {
  id?: string;
  className?: string;
  onClick?: any;
  children?: any;
  text?: string;
  style?: React.CSSProperties;
  type?: 'submit' | 'reset' | 'button' | undefined;
  isLoading?: boolean;
  disabled?: boolean;
}

const ButtonFilled = ({
  id,
  className,
  onClick,
  children,
  text,
  style,
  type,
  isLoading = false,
  disabled = false,
}: IButtonFilled) => {
  return (
    <button
      id={id}
      className={` ${
        disabled ? 'opacity-30' : ''
      } bg-dark_blue border-2 border-solid border-dark_blue py-2 px-8 font-semibold text-white hover:bg-opacity-95 hover:text-white transition relative ${className}`}
      style={style}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {!isLoading ? (
        [...children]
      ) : (
        <div className='h-[20px] w-[20px] rounded-full border-4 border-transparent border-t-white animate-spin'></div>
      )}
    </button>
  );
};

export default ButtonFilled;
