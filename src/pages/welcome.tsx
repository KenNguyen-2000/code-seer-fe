import {
  FirstSection,
  Footer,
  FourthSection,
  HeaderBar,
  ThirdSection,
} from '@/components';
import SecondSection from '@/components/page_components/Welcome/SecondSection';
import Head from 'next/head';
import React from 'react';
import styles from '@/styles/welcome.module.scss';
import FooterSection from '@/components/page_components/Welcome/FooterSection';

const WelcomePage = () => {
  return (
    <>
      <Head>
        <title>CodeSeer</title>
      </Head>

      <div className='min-h-screen'>
        <HeaderBar location='home' />
        <main>
          <FirstSection />
          <SecondSection />
          <ThirdSection />
          <FourthSection />
          <div className={styles.ship__section__stats}>
            <section className={styles.stats__statistics}>
              <div className={styles.stats__stats}>
                <div className={styles.stats__stats__item}>
                  <p className={styles.stats__highlight}>2</p>
                  <span className={styles.stats__description}>Cities</span>
                </div>
                <div className={styles.stats__stats__item}>
                  <p className={styles.stats__highlight}>10</p>
                  <span className={styles.stats__description}>
                    Requests per week
                  </span>
                </div>
                <div className={styles.stats__stats__item}>
                  <p className={styles.stats__highlight}>33PB</p>
                  <span className={styles.stats__description}>Data served</span>
                </div>
                <div className={styles.stats__stats__item}>
                  <p className={styles.stats__highlight}>99.99%</p>
                  <span className={styles.stats__description}>
                    GUARANTEED UPTIME
                  </span>
                </div>
              </div>
            </section>
          </div>
          <FooterSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WelcomePage;
