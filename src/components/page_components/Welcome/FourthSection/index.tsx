import React from 'react';
import styles from './fourth-section.module.scss';
import EarthRotate from '@/components/common/EarthRotate';
import { UsersIcon } from '@/components/icons';

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
            <div className={styles.ship__headWrapper}>
              <h5 className={styles.ship__small__heading}>
                <span>Speed is critical to customers — and SEO</span>
              </h5>
              <p className={styles.ship__text__wrapper}>
                Next.js and Vercel work together to deliver the best performance
                for your end users, while maintaining best-in-class SEO
                practices.
              </p>
            </div>
            <div className={styles.preview__content}>
              <p className={styles.text__wrapper}>
                Built on cutting-edge serverless technology, Vercel can
                withstand any traffic spike, with automatic failover and global
                replication of assets.
              </p>
              <div className={styles.develop__demo__benefits__item}>
                <div className={styles.icon__wrapper}>
                  <UsersIcon />
                </div>
                <h5 className={styles.small__heading}>
                  <span>Enhanced Collaboration</span>
                </h5>
                <p className={styles.paragraph}>
                  With CodeSeer, everyone can have a shared understanding of the
                  codebase, leading to better communication and accelerated
                  development cycles.
                </p>
              </div>
              <div className={styles.develop__demo__benefits__item}>
                <div className={styles.icon__wrapper}>
                  <UsersIcon />
                </div>
                <h5 className={styles.small__heading}>
                  <span>Enhanced Collaboration</span>
                </h5>
                <p className={styles.paragraph}>
                  With CodeSeer, everyone can have a shared understanding of the
                  codebase, leading to better communication and accelerated
                  development cycles.
                </p>
              </div>
            </div>
            <div className={styles.earth__wrapper}>
              <div className={styles.earth__container}>
                <div className={styles.earth__globe}>
                  <EarthRotate />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthSection;
