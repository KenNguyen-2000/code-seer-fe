import React from 'react';
import styles from './second-section.module.scss';
import { ClockIcon } from '@/components/icons';
import Image from 'next/image';
import codeseer from '/public/codeseer-logo.svg';

const SecondSection = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.path__line}></span>
        <div className='text-center mb-4'>
          <span className={styles.label__number}>1</span>
          <h3 className={styles.label__heading}>
            <span className={styles.label__text}>Integrate</span>
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
          <div className={styles.develop__demo__benefits}>
            <div className={styles.develop__demo__benefits__item}>
              <div className={styles.icon__wrapper}>
                <ClockIcon />
              </div>
              <h5 className={styles.small__heading}>
                <span>The complete toolkit for the Web</span>
              </h5>
              <p className={styles.paragraph}>
                Everything you need to build your site exactly how you imagine,
                from automatic API handling to built-in image and performance
                optimizations.
              </p>
            </div>
            <div className={styles.develop__demo__benefits__item}>
              <div className={styles.icon__wrapper}>
                <ClockIcon />
              </div>
              <h5 className={styles.small__heading}>
                <span>Easy integration with your backend</span>
              </h5>
              <p className={styles.paragraph}>
                Connect your pages to any data source, headless CMS, or API and
                make it work in everyone’s dev environment.
              </p>
            </div>
            <div className={styles.develop__demo__benefits__item}>
              <div className={styles.icon__wrapper}>
                <ClockIcon />
              </div>
              <h5 className={styles.small__heading}>
                <span>End-to-end testing on Localhost</span>
              </h5>
              <p className={styles.paragraph}>
                From caching to Serverless Functions, all our cloud primitives
                work perfectly on localhost.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className='text-center mb-6'>
              <small className='text-sm tracking-[0.2em] font-medium mt-0 pl-1 text-[#666] text-center'>
                <span className='inline-block align-top decoration-inherit mt-0'>
                  Collaboration on a sigle workplace
                </span>
              </small>
            </div>
          </div>
        </div>
        <div className={styles.frameworks}>
          <Image src={codeseer} alt='codeseer icon' className='w-14 h-full' />
          <Image src={codeseer} alt='codeseer icon' className='w-14 h-full' />
          <Image src={codeseer} alt='codeseer icon' className='w-14 h-full' />
          <Image src={codeseer} alt='codeseer icon' className='w-14 h-full' />
          <Image src={codeseer} alt='codeseer icon' className='w-14 h-full' />
          <Image src={codeseer} alt='codeseer icon' className='w-14 h-full' />
          <Image src={codeseer} alt='codeseer icon' className='w-14 h-full' />
          <Image src={codeseer} alt='codeseer icon' className='w-14 h-full' />
          <Image src={codeseer} alt='codeseer icon' className='w-14 h-full' />
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
