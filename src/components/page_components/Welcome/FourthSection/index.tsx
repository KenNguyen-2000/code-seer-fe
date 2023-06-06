import React from 'react';
import styles from './fourth-section.module.scss';

const FourthSection = () => {
  return (
    <div className='overflow-hidden'>
      <div className='max-w-[1440px] my-0 mx-auto relative'>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className='text-center mb-4'>
              <span className={styles.label__number}>3</span>
              <h3 className={styles.label__heading}>
                <span className={styles.label__text}>Ship</span>
              </h3>
            </div>
            <h4 className={styles.title__title}>
              <span className='inline-block align-top decoration-inherit '>
                Delight every visitor
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthSection;
