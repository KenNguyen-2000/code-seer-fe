import React from 'react';
import styles from './footer-section.module.scss';
import Image from 'next/image';
import githubLogo from '/public/brand-github-copilot.svg';
import depMap from '/public/map-version.png';
import logo from '/public/codeseer-logo.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';

const FooterSection = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.tiny__heading}>
        <small>BEGIN YOUR VERCEL JOURNEY</small>
      </div>
      <div className={styles.stack__container}>
        <div className={styles.stack__stack}>
          <div className={styles.stack__stack__container}>
            <div className={styles.stack__left}>
              <div
                className={`${styles.stack__left__inner} ${styles.reuse__container} `}
              >
                <div className={styles.stack__left__layout}>
                  <div className={styles.stack__left__heading}>
                    <h1 className='text-2xl tracking-tight font-semibold'>
                      Import Git Repository
                    </h1>
                  </div>
                  <span className='w-[1px] h-[1px] mt-[11px] ml-[23px]'></span>
                  <div className={`${styles.reuse__container}`}>
                    <div
                      className={`${styles.reuse__container} ${styles.stack__left__provider}`}
                    >
                      <div className={styles.reuse__container}>
                        <p className='text-sm font-normal text-center text-[#444]'>
                          Select a Git provider to import an existing project
                          from a Git Repository.
                        </p>
                        <span className={styles.stack__spacer}></span>
                        <div className={styles.stack__stack}>
                          <div className='w-full max-w-[320px]'>
                            <span className={`${styles.skeleton__wrapper}`}>
                              <button
                                className='min-w-full max-w-full text-white bg-[#24292e]'
                                onClick={() => router.push('/login')}
                              >
                                <span className='mr-2 flex'>
                                  <Image src={githubLogo} alt='Github Logo' />
                                </span>
                                <span className='overflow-ellipsis whitespace-nowrap overflow-hidden inline-block'>
                                  <span className='hidden md:inline-block'>
                                    Continue with
                                  </span>{' '}
                                  Github
                                </span>
                              </button>
                            </span>
                            <span
                              className={`${styles.skeleton__wrapper} mt-2`}
                            >
                              <button
                                className='min-w-full max-w-full text-white bg-[#6b4fbb]'
                                onClick={() => router.push('/login')}
                              >
                                <span className='mr-2 flex'>
                                  <Image src={githubLogo} alt='Github Logo' />
                                </span>
                                <span className='overflow-ellipsis whitespace-nowrap overflow-hidden inline-block'>
                                  <span className='hidden md:inline-block'>
                                    Continue with
                                  </span>{' '}
                                  Gitlab
                                </span>
                              </button>
                            </span>
                            <span
                              className={`${styles.skeleton__wrapper} mt-2`}
                            >
                              <button
                                className='min-w-full max-w-full text-white bg-[#0052CC]'
                                onClick={() => router.push('/login')}
                              >
                                <span className='mr-2 flex'>
                                  <Image src={githubLogo} alt='Github Logo' />
                                </span>
                                <span className='overflow-ellipsis whitespace-nowrap overflow-hidden inline-block'>
                                  <span className='hidden md:inline-block'>
                                    Continue with
                                  </span>{' '}
                                  Bitbucket
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className='w-[1px] h-[1px] mt-[11px] ml-[23px]'></span>
                  <div className={styles.reuse__container}>
                    <p className='text-sm font-medium color-[#666] relative top-[6px]'>
                      Import Third-Party Git Repository →
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span className={styles.stack__spacer}></span>
            <div className={styles.stack__right}>
              <div
                className={`${styles.stack__right__inner} ${styles.reuse__container} `}
              >
                <div className={styles.stack__right__heading}>
                  <h2 className='text-2xl tracking-tight font-semibold'>
                    Generate Dependency Map
                  </h2>
                </div>
                <p className='text-sm leading-6 font-normal text-left text-[#666] mt-[7px] -mx-[1px]'>
                  Alternatively, get started with a template
                </p>
                <span className='w-[1px] h-[1px] mt-[11px] ml-[23px]'></span>
                <div className={`${styles.reuse__list}`}>
                  <div className={styles.list__item}>
                    <Link href={'/login'} className={styles.framework__card}>
                      <div className='relative'>
                        <div className='h-[120px] w-full relative'>
                          <Image
                            className='w-full h-full object-cover absolute text-transparent'
                            src={depMap}
                            alt='Dependency Map'
                          />
                        </div>
                      </div>
                      <div className={styles.framework__card__content}>
                        <Image height={20} src={logo} alt='codeseer' />
                        <span className='w-[1px] h-[1px] ml-[11px] mt-[23px]'></span>
                        <p className='text-sm font-semibold tracking-[-.005625rem]'>
                          Dep Map
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className={styles.list__item}>
                    <Link href={'/login'} className={styles.framework__card}>
                      <div className='relative'>
                        <div className='h-[120px] w-full relative'>
                          <Image
                            className='w-full h-full object-cover absolute text-transparent'
                            src={depMap}
                            alt='Dependency Map'
                          />
                        </div>
                      </div>
                      <div className={styles.framework__card__content}>
                        <Image height={20} src={logo} alt='codeseer' />
                        <span className='w-[1px] h-[1px] ml-[11px] mt-[23px]'></span>
                        <p className='text-sm font-semibold tracking-[-.005625rem]'>
                          Dep Map
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className={styles.list__item}>
                    <Link href={'/login'} className={styles.framework__card}>
                      <div className='relative'>
                        <div className='h-[120px] w-full relative'>
                          <Image
                            className='w-full h-full object-cover absolute text-transparent'
                            src={depMap}
                            alt='Dependency Map'
                          />
                        </div>
                      </div>
                      <div className={styles.framework__card__content}>
                        <Image height={20} src={logo} alt='codeseer' />
                        <span className='w-[1px] h-[1px] ml-[11px] mt-[23px]'></span>
                        <p className='text-sm font-semibold tracking-[-.005625rem]'>
                          Dep Map
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className={styles.list__item}>
                    <Link href={'/login'} className={styles.framework__card}>
                      <div className='relative'>
                        <div className='h-[120px] w-full relative'>
                          <Image
                            className='w-full h-full object-cover absolute text-transparent'
                            src={depMap}
                            alt='Dependency Map'
                          />
                        </div>
                      </div>
                      <div className={styles.framework__card__content}>
                        <Image height={20} src={logo} alt='codeseer' />
                        <span className='w-[1px] h-[1px] ml-[11px] mt-[23px]'></span>
                        <p className='text-sm font-semibold tracking-[-.005625rem]'>
                          Dep Map
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <span className='w-[1px] h-[1px] mt-[23px] ml-[23px]'></span>
                <div className={styles.reuse__container}>
                  <p className='text-sm font-medium color-[#666] relative top-[6px]'>
                    Browse All Templates →
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
