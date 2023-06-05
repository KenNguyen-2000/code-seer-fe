import React from 'react';
import styles from './second-section.module.scss';

const SecondSection = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.path__line}></span>
        <div className='text-center mb-4'>
          <span className={styles.label__number}>1</span>
          <h3 className={styles.label__heading}>
            <span className={styles.label__text}>Develop</span>
          </h3>
        </div>
        <h4 className={styles.title__title}>
          <span className='inline-block align-top decoration-inherit '>
            Build when inspiration strikes
          </span>
        </h4>
        <p className={styles.subtitle}>
          <span className='inline-block align-top decoration-inherit'>
            Free developers from time-consuming, unnecessary processes that slow
            your work, so you and your team can focus on creating.
          </span>
        </p>
      </div>
      <div>
        <div className={styles.develop__demo}>
          <div className={styles.develop__demo__windows}></div>
          <div className={styles.develop__demo__benefits}></div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
