import React from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import CodeSeerLogo from '/public/codeseer-logo.png';
import {
  BellFilledIcon,
  LogoutIcon,
  PlusIcon,
  SearchIcon,
} from '@/components/icons';
import { useRouter } from 'next/router';
import ArrowBadgeUp from '@/components/icons/ArrowBadgeUp';

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.left}>
        <button
          className='flex items-center gap-4'
          onClick={() => router.push('/')}
        >
          <Image src={CodeSeerLogo} alt='CodeSeer Logo' />
          <h3 className='font-semibold text-2xl'>CodeSeer</h3>
        </button>
      </div>
      <div className='navbar-search-wrapper flex gap-3 ring-1 ring-white rounded-lg w-[360px] py-2 px-4 focus-within:ring-2'>
        <div>
          <SearchIcon />
        </div>
        <input
          id='navbar-search__input'
          className='w-full bg-transparent border-none outline-none focus:right-0 placeholder:italic placeholder:text-sm'
          type='text'
          placeholder='What are you searching for...'
        />
      </div>
      <div className={styles.right}>
        <button className='text-white hover:scale-110 transition ease-out'>
          <BellFilledIcon />
        </button>
        <button
          className='text-white hover:scale-110 transition ease-out border border-white p-[1px] rounded-full'
          onClick={() => router.push('/pricing')}
        >
          <ArrowBadgeUp />
        </button>
        <button
          onClick={handleLogout}
          className='text-white hover:scale-110 transition ease-out'
        >
          <LogoutIcon />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
