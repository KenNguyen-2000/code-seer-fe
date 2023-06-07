import React from 'react';
import styles from './second-section.module.scss';
import { ClockIcon, CodeCircle, UsersIcon } from '@/components/icons';
import Image from 'next/image';
import codeseer from '/public/codeseer-logo.svg';
import DeveloperEditor from '../DeveloperEditor';
import DevelopBrowser from '../DevelopBrowser';

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
          <div className={styles.develop__demo__windows}>
            <DeveloperEditor />
            <DevelopBrowser />
          </div>
          <div className={styles.develop__demo__benefits}>
            <div className={styles.develop__demo__benefits__item}>
              <div className={styles.icon__wrapper}>
                <ClockIcon />
              </div>
              <h5 className={styles.small__heading}>
                <span>Time Efficiency</span>
              </h5>
              <p className={styles.paragraph}>
                Our intuitive interface and interactive diagrams significantly
                reduce the time required to understand complex codebases. Spend
                more time developing and less time grappling with unfamiliar
                code.
              </p>
            </div>
            <div className={styles.develop__demo__benefits__item}>
              <div className={styles.icon__wrapper}>
                <CodeCircle />
              </div>
              <h5 className={styles.small__heading}>
                <span>Easy integrate with your codebase</span>
              </h5>
              <p className={styles.paragraph}>
                CodeSeer seamlessly integrates with your existing GitHub
                repositories, eliminating the need for additional setup or data
                migration.
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
