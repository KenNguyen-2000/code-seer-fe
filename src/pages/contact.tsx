import { ButtonFilled, Footer } from '@/components';
import React, { useState } from 'react';
import styles from '@/styles/contact.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/codeseer-logo.png';
import Head from 'next/head';
import {
  BuildingArcIcon,
  ClockIcon,
  EmailIcon,
  PhoneIcon,
} from '@/components/icons';
import { useRouter } from 'next/router';

interface FormValue {
  name: string;
  email: string;
  message?: string;
}
const Contact = () => {
  const router = useRouter();

  const [formValue, setFormValue] = useState<FormValue>({
    name: '',
    email: '',
  });

  const handleSubmitContact = (e: any) => {
    e.preventDefault();

    router.push('/');
  };
  return (
    <>
      <Head>
        <title>CodeSeer: Contact</title>
      </Head>
      <div className='min-h-screen flex flex-col'>
        <div className={styles.wrapper}>
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
                      <Link href='/welcome' className={styles.nav__list__item}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href='/welcome' className={styles.nav__list__item}>
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link href='/about' className={styles.nav__list__item}>
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link href='/pricing' className={styles.nav__list__item}>
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/contact'
                        className={styles.nav__list__item}
                        style={{ background: 'rgba(0,0,0,0.1)' }}
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
                      <ButtonFilled className='rounded-md'>
                        Sign In
                      </ButtonFilled>
                    </Link>
                  </div>
                </span>
              </div>
            </div>
          </header>
        </div>
        <main className='flex-1 h-full flex justify-center items-center bg-[#F0F0F0]'>
          <div className={styles.form__wrapper}>
            <div className='flex justify-between w-full pl-8 md:pl-20 py-20 z-10'>
              <section className='w-[340px] flex flex-col '>
                <h1 className='text-5xl font-semibold mb-3'>Contact Us</h1>
                <p className='text-md_gray text-sm'>
                  Feel free to contact us any time. We will get back to you as
                  soon as we can!
                </p>
                <form
                  onSubmit={handleSubmitContact}
                  className='flex flex-col gap-6 mt-8'
                >
                  <input
                    id='name'
                    className='bg-transparent pb-2 outline-none ring-0 focus:ring-0 border-b-2 border-gray-500'
                    type='text'
                    name='name'
                    placeholder='Name'
                    onChange={(e) =>
                      setFormValue({ ...formValue, name: e.target.value })
                    }
                  />
                  <input
                    id='email'
                    className='bg-transparent pb-2 outline-none ring-0 focus:ring-0 border-b-2 border-gray-500'
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={(e) =>
                      setFormValue({ ...formValue, email: e.target.value })
                    }
                  />
                  <input
                    id='message'
                    className='bg-transparent pb-2 outline-none ring-0 focus:ring-0 border-b-2 border-gray-500'
                    type='text'
                    name='message'
                    placeholder='Message'
                    onChange={(e) =>
                      setFormValue({ ...formValue, message: e.target.value })
                    }
                  />
                  <ButtonFilled type='submit' className='rounded-md mt-4'>
                    Send
                  </ButtonFilled>
                </form>
              </section>
              <section className='w-[300px] md:[360px] flex flex-col bg-md_blue pl-6 py-8'>
                <h1 className='text-4xl text-white font-semibold mb-8'>Info</h1>
                <ul className='flex-grow text-white font-light flex flex-col justify-between'>
                  <li className='flex gap-2'>
                    <EmailIcon strokeWidth='1' />
                    <span>ngkien299@gmail.com</span>
                  </li>
                  <li className='flex gap-2'>
                    <PhoneIcon strokeWidth='1' />
                    <span>0818000299</span>
                  </li>
                  <li className='flex gap-2'>
                    <BuildingArcIcon strokeWidth='1' />
                    <span>Lo Long Thanh, p. Phu Huu</span>
                  </li>
                  <li className='flex gap-2'>
                    <ClockIcon strokeWidth='1' />
                    <span>9:00 - 17:00</span>
                  </li>
                </ul>
              </section>
            </div>
            <div className='w-[160px] bg-primary_blue absolute right-0 top-0 bottom-0'></div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
