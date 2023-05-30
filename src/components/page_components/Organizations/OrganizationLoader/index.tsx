import React from 'react';
import styles from './OrganizationLoader.module.scss';

interface IOrganizationLoader {}

const OrganizationLoader: React.FC<IOrganizationLoader> = () => {
  return (
    <div
      className={
        styles.wrapper +
        ' w-full min-w-[300px] md:w-[300px] rounded-xl overflow-hidden relative'
      }
    >
      <div className='absolute left-0 top-0 bottom-0 w-6 bg-dark_blue'></div>
      <div className='ml-6 py-3 flex flex-col gap-4'>
        <div className='flex flex-col px-3 gap-3'>
          <h4 className={`h-7`}>
            <div className={`h-4 w-16 ${styles.skeleton_box}`} />
          </h4>
          <div className='h-5'>
            <div className={`h-4 w-44 ${styles.skeleton_box}`} />
          </div>

          <div className='h-6'>
            <div className={`h-4 w-32 ${styles.skeleton_box}`} />
          </div>
          <div className='h-5'>
            <div className={`h-4 w-20 ${styles.skeleton_box}`} />
          </div>
          <div className='h-5 flex justify-between'>
            <div className={`h-4 w-28 ${styles.skeleton_box}`} />
            <div className={`h-4 w-8 ${styles.skeleton_box}`} />
          </div>
        </div>
        <div className='h-[1px] bg-slate-700' />
        <div className='flex justify-between px-3'>
          <div className={`h-4 w-24 ${styles.skeleton_box}`}></div>
          <div className={`h-4 w-14 ${styles.skeleton_box}`} />
        </div>
      </div>
    </div>
  );
};

export default OrganizationLoader;
