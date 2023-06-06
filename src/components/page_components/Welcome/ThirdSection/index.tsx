import React from 'react';
import styles from './third-section.module.scss';
import { ClockIcon } from '@/components/icons';

const ThirdSection = () => {
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
            Integrate with your Codebase
          </span>
        </h4>
        <p className={styles.subtitle}>
          <span className='inline-block align-top decoration-inherit'>
            Make frontend development a collaborative experience with automatic
            Preview Deployments for every code change, by seamlessly integrating
            with GitHub, GitLab, and Bitbucket.
          </span>
        </p>
      </div>
      <section className={styles.preview__section}>
        <div className={styles.container}>
          <span className={styles.path__line}></span>
        </div>
        <div className={styles.preview__item__wrapper}>
          <div className={styles.preview__item__graphic}></div>
          <div className={styles.preview__item__line}>
            <span className={styles.preview__path__circle}></span>
            <span className={styles.preview__path__line}></span>
          </div>
          <div className={styles.preview__item__description}>
            <div className={styles.preview__description__inner}>
              <h5 className={styles.small__heading}>
                <span>
                  <div className={styles.icon__wrapper}>
                    <ClockIcon />
                  </div>
                  Push to deploy
                </span>
              </h5>
              <p className={styles.paragraph}>
                Every deploy automatically generates a shareable live preview
                site that stays up-to-date with your changes.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.preview__item__wrapper}>
          <div className={styles.preview__item__graphic}></div>
          <div className={styles.preview__item__line}>
            <span className={styles.preview__path__circle}></span>
            <span className={styles.preview__path__line}></span>
          </div>
          <div className={styles.preview__item__description}>
            <div className={styles.preview__description__inner}>
              <h5 className={styles.small__heading}>
                <span>
                  <div className={styles.icon__wrapper}>
                    <ClockIcon />
                  </div>
                  Automatic Previews for every branch
                </span>
              </h5>
              <p className={styles.paragraph}>
                Each new branch receives a live, production-like URL that
                everyone on your team can visit.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.preview__item__wrapper}>
          <div className={styles.preview__item__graphic}></div>
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
                    <ClockIcon />
                  </div>
                  Collaborative reviews on UI
                </span>
              </h5>
              <p className={styles.paragraph}>
                Comment directly on components, layouts, copy, and more in real
                context and real time, integrated seamlessly with GitHub and
                Slack.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ThirdSection;
