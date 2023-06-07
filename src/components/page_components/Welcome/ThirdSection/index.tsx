import React from 'react';
import styles from './third-section.module.scss';
import { AppsIcon, ClockIcon, UsersIcon } from '@/components/icons';
import DevelopBrowser from '../DevelopBrowser';
import Image from 'next/image';
import collaborateDepMap from '/public/collaborate-dep-map.svg';
import githubAction from '/public/github-action.png';
import depMap from '/public/depmap.png';
import ChartDots from '@/components/icons/ChartDots';

const ThirdSection = () => {
  const browserWindow = (image: any) => {
    return (
      <div className={styles.window}>
        <div className={styles.window__header}>
          <div className={styles.window__traffic}>
            <span
              className={styles.window__icon + ' ' + styles.window__close}
            ></span>
            <span
              className={styles.window__icon + ' ' + styles.window__minimize}
            ></span>
            <span
              className={styles.window__icon + ' ' + styles.window__fullscreen}
            ></span>
          </div>
          <div className={styles.window__title}>
            <div className={styles.window__browser__bar}>
              <div className={styles.browser__spacer}></div>
              <div className={styles.browser__input}>
                <div className={styles.browser__url}>
                  <span className={styles.browser__placeholder}>
                    codeseer.vercel.app
                  </span>
                </div>
              </div>
              <div className={styles.browser__spacer}></div>
            </div>
          </div>
        </div>
        <div className={styles.browser__body}>
          <Image src={image} alt='Github Action Browser' />
        </div>
      </div>
    );
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.path__line}></span>
        <div className='text-center mb-4'>
          <span className={styles.label__number}>2</span>
          <h3 className={styles.label__heading}>
            <span className={styles.label__text}>Preview</span>
          </h3>
        </div>
        <h4 className={styles.title__title}>
          <span className='inline-block align-top decoration-inherit '>
            Iterate with your team
          </span>
        </h4>
        <p className={styles.subtitle}>
          <span className='inline-block align-top decoration-inherit'>
            Make development a collaborative experience with labels or comments
            on files, folders, by seamlessly integrating with GitHub.
          </span>
        </p>
      </div>
      <section className={styles.preview__section}>
        <div className={styles.container}>
          <span className={styles.path__line}></span>
        </div>
        <div className={styles.preview__item__wrapper}>
          <div className={styles.preview__item__graphic}>
            <div className={styles.graphic__review__wrapper}>
              {browserWindow(githubAction)}
            </div>
          </div>
          <div className={styles.preview__item__line}>
            <span className={styles.preview__path__circle}></span>
            <span className={styles.preview__path__line}></span>
          </div>
          <div className={styles.preview__item__description}>
            <div className={styles.preview__description__inner}>
              <h5 className={styles.small__heading}>
                <span>
                  <div className={styles.icon__wrapper}>
                    <AppsIcon />
                  </div>
                  Run the CodeSeer bot
                </span>
              </h5>
              <p className={styles.paragraph}>
                The first step towards codebase enlightenment is running our
                intelligent CodeSeer bot. This sophisticated tool analyzes your
                codebase, identifies dependencies, and extracts valuable
                insights. By scanning your code, the CodeSeer bot lays the
                foundation for accurate and comprehensive code visualization.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.preview__item__wrapper}>
          <div className={styles.preview__item__graphic}>
            <div className={styles.graphic__review__wrapper}>
              {browserWindow(depMap)}
            </div>
          </div>
          <div className={styles.preview__item__line}>
            <span className={styles.preview__path__circle}></span>
            <span className={styles.preview__path__line}></span>
          </div>
          <div className={styles.preview__item__description}>
            <div className={styles.preview__description__inner}>
              <h5 className={styles.small__heading}>
                <span>
                  <div className={styles.icon__wrapper}>
                    <ChartDots />
                  </div>
                  Visualize the codebase
                </span>
              </h5>
              <p className={styles.paragraph}>
                Once the CodeSeer bot has done its magic, it&apos;s time to
                generate a dependency map. Our platform takes the data collected
                by CodeSeer and transforms it into an interactive and visually
                appealing map. This map provides a clear overview of the
                relationships between different files, modules, and components
                in your codebase. Say goodbye to confusion and hello to clarity.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.preview__item__wrapper}>
          <div className={styles.preview__item__graphic}>
            <div className={styles.graphic__review__wrapper}>
              {browserWindow(collaborateDepMap)}
            </div>
          </div>
          <div className={styles.preview__item__line}>
            <span className={styles.preview__path__circle}></span>
            <span
              className={styles.preview__path__line}
              style={{
                background: 'linear-gradient(#999, #f9cb28)',
                border: 'none',
              }}
            ></span>
          </div>
          <div className={styles.preview__item__description}>
            <div className={styles.preview__description__inner}>
              <h5 className={styles.small__heading}>
                <span>
                  <div className={styles.icon__wrapper}>
                    <UsersIcon />
                  </div>
                  Collaborative on a single domain
                </span>
              </h5>
              <p className={styles.paragraph}>
                With CodeSeer, you can easily collaborate with your team members
                directly on the generated dependency map. Label specific
                dependencies, highlight important sections, or leave comments
                for clarity. This collaborative approach ensures that everyone
                has a shared understanding of the codebase, promotes effective
                communication, and streamlines the development process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ThirdSection;
