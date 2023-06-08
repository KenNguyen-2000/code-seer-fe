import React, { useState } from 'react';

interface IInputModal {
  isShown: boolean;
  title?: string;
  action: any;
  closeModal: any;
}

const InputModal = ({ isShown, closeModal, action, title }: IInputModal) => {
  const [input, setInput] = useState('');

  const handleConfirm = async () => {
    await action(input);
    closeModal();
  };

  return (
    <div
      className={`relative ${isShown ? 'z-10' : '-z-10'}`}
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      {/* <!--
        Background backdrop, show/hide based on modal state.
    
        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      --> */}
      <div
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity opacity-0'
        style={
          isShown
            ? {
                opacity: 100,
              }
            : {}
        }
      ></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          {/* <!--
            Modal panel, show/hide based on modal state.
    
            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          --> */}
          <div
            className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            style={
              isShown
                ? {
                    opacity: 100,
                    transform: 'translateY(0)',
                  }
                : {}
            }
          >
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                <label
                  className='text-base font-semibold leading-6 text-gray-900'
                  id='modal-title'
                >
                  {title ?? 'Input name'}
                </label>
                <div className='mt-2'>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    placeholder='Placeholder....'
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 flex sm:px-6'>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto mr-4'
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                type='button'
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
