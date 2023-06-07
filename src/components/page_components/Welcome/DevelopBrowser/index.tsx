import React from 'react';
import styles from './develop-browser.module.scss';
import depmap from '/public/install-browser.png';
import Image from 'next/image';

const DevelopBrowser = ({ browserImage }: any) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.browser__header}>
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
                    localhost:3000
                  </span>
                </div>
              </div>
              <div className={styles.browser__spacer}></div>
            </div>
          </div>
        </div>
        <div className={styles.browser__body}>
          <Image
            src={browserImage ? browserImage : depmap}
            alt='Github Action Browser'
          />
        </div>
      </div>
    </div>
  );
};

export default DevelopBrowser;
