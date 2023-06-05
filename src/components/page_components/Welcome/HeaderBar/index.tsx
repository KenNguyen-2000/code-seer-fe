import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import logo from '/public/codeseer-logo.png';
import styles from './header-bar.module.scss';
import Link from 'next/link';
import ButtonFilled from '@/components/common/ButtonFilled';

const HeaderBar = ({ location }: any) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', function (e) {
      if (headerRef.current !== null) {
        if (this.scrollY > 10) {
          headerRef.current.style.background = 'hsla(0,0%,100%,.8)';
          headerRef.current.style.boxShadow = 'inset 0 -1px 0 0 rgba(0,0,0,.1)';
        } else {
          headerRef.current.removeAttribute('style');
        }
      }
    });

    return () => {
      //   window.removeEventListener('scroll');
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={headerRef}>
      <header className={styles.header}>
        <div className={styles.logo__wrapper}>
          <div className=''>
            <Link href='/welcome' className={styles.logo__link}>
              <Image src={logo} alt='CodeSeer logo' />
              <span className={styles.logo__link__text}>CodeSeer</span>
            </Link>

            <div></div>
          </div>
        </div>
        <div className={styles.header__middle}>
          <nav className={styles.nav__wrapper}>
            <div className='relative'>
              <ul dir='ltr' className={styles.nav__list}>
                <li>
                  <Link
                    href={'/welcome'}
                    className={styles.nav__list__item}
                    style={{
                      background:
                        location === 'home' ? 'rgba(0, 0, 0, 0.1)' : '',
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/welcome'}
                    className={styles.nav__list__item}
                    style={{
                      background:
                        location === 'features' ? 'rgba(0, 0, 0, 0.1)' : '',
                    }}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href={'about'}
                    className={styles.nav__list__item}
                    style={{
                      background:
                        location === 'about' ? 'rgba(0, 0, 0, 0.1)' : '',
                    }}
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/pricing'}
                    className={styles.nav__list__item}
                    style={{
                      background:
                        location === 'pricing' ? 'rgba(0, 0, 0, 0.1)' : '',
                    }}
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/contact'}
                    className={styles.nav__list__item}
                    style={{
                      background:
                        location === 'contact' ? 'rgba(0, 0, 0, 0.1)' : '',
                    }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.header__right}>
          <div className={styles.header__right__wrapper}>
            <span className={styles.fade__in}>
              <div className={styles.logout__wrapper}>
                <Link href='/login'>
                  <ButtonFilled className='rounded-md'>Sign In</ButtonFilled>
                </Link>
              </div>
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderBar;
