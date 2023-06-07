import React from 'react';
import styles from './developer-editor.module.scss';

const DeveloperEditor = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.window__window}>
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
            <div className={styles.window__tabs__wrapper}>
              <div className={styles.window__tabs__tab}>index.js</div>
            </div>
          </div>
        </div>
        <div className={styles.window__body}>
          <div className={styles.editor__wrapper}>
            <div className={styles.editor__lines__background}>
              <div className={styles.editor__lines}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </div>
            </div>
            <div className={styles.editor__main}>
              <div>
                <span className={styles.token__k}>export</span>
                <span className={styles.token__p}> </span>
                <span className={styles.token__k}>default</span>
                <span className={styles.token__p}> </span>
                <span className={styles.token__k}>function</span>
                <span className={styles.token__p}>{'({ data }) {'}</span>
              </div>
              <div>
                <span className={styles.token__p}> </span>
                <span className={styles.token__k}>return</span>
                <span className={styles.token__p}> </span>
                <span className={styles.token__p}> </span>
                <span className={styles.token__p}>{'<'}</span>
                <span className={styles.token__n}>Layout</span>
                <span className={styles.token__p}>{'>'}</span>
              </div>
              <div>
                <span className={styles.token__p}> </span>
                <span className={styles.token__p}> </span>
                <span className={styles.token__p}> </span>
                <span className={styles.token__p}> </span>
                <span className={styles.token__p}>{'<'}</span>
                <span className={styles.token__n}>Product</span>
                <span className={styles.token__p}> </span>
                <span className={styles.token__p}>{'details={data}'}</span>
                <span className={styles.token__p}> </span>
                <span className={styles.token__p}>{'/>'}</span>
              </div>
              <div>
                <span className={styles.token__p}> </span>
                <span className={styles.token__p}>{'<'}</span>
                <span className={styles.token__n}>Layout</span>
                <span className={styles.token__p}>{'>'}</span>
              </div>
              <div>
                <span className={styles.token__p}>{'}'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperEditor;
