import React from 'react';
import styles from './first-section.module.scss';
import ButtonFilled from '@/components/common/ButtonFilled';
import ButtonOutline from '@/components/common/ButtonOutline';
import nextjs from '/public/favicon.ico';
import Image from 'next/image';
import { useRouter } from 'next/router';

const FirstSection = () => {
  const router = useRouter();

  return (
    <section className={styles.wrapper}>
      <div className={styles.hero__texts}>
        <div>
          <h1
            aria-label='Develop. Preview. Ship.'
            className={styles.hero__title}
          >
            <span className={styles.animated_gradient_text_background}>
              <span className={styles.animated_gradient_text_foreground}>
                Develop.
              </span>
            </span>
            <span className={styles.animated_gradient_text_background}>
              <span className={styles.animated_gradient_text_foreground}>
                Preview.
              </span>
            </span>
            <span className={styles.animated_gradient_text_background}>
              <span className={styles.animated_gradient_text_foreground}>
                Ship.
              </span>
            </span>
          </h1>
        </div>
        <h2 className={styles.hero__description + ' text-2xl'}>
          <span>
            Vercel is the platform for frontend developers, providing the speed
            and reliability innovators need to create at the moment of
            inspiration.
          </span>
        </h2>
        <div className={styles.hero__btns}>
          <div className='flex flex-wrap'>
            <div className='p-3'>
              <ButtonFilled className='rounded-md'>Start Depoying</ButtonFilled>
            </div>
            <div className='p-3'>
              <ButtonOutline
                className='rounded-md'
                onClick={() => router.push('/contact')}
              >
                Book a Demo
              </ButtonOutline>
            </div>
          </div>
        </div>
        <div className={styles.testimonials_container}>
          <div className='flex flex-1 flex-col relative min-w-[1px] max-w-full justify-start items-stretch'>
            <div className='px-6 -mb-3'>
              <div className='text-center mb-12'>
                <small>Trusted by the best frontend teams</small>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className={styles.testimonials__brandsDesktop}>
              {new Array(5).fill('').map((item, index) => (
                <>
                  <div key={index} className='mx-6 flex items-center gap-2'>
                    <Image
                      src={nextjs}
                      alt='nextjs icon'
                      className='w-full h-8'
                    />
                    <span className='font-medium text-lg'>Trusted</span>
                  </div>
                </>
              ))}
            </div>
            <div className={styles.testimonials__brandsDesktop}>
              {new Array(5).fill('').map((item, index) => (
                <>
                  <div key={index} className='mx-6 flex items-center gap-2'>
                    <Image
                      src={nextjs}
                      alt='nextjs icon'
                      className='w-full h-8'
                    />
                    <span className='font-medium text-lg'>Trusted</span>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tiny__heading}>
        <small>Explore the CodeSeer way</small>
      </div>
    </section>
  );
};

export default FirstSection;
