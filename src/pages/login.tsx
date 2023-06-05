'use client';

import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import background from '/public/welcome-background.png';
import GithubIcon from '/public/github-icon.png';
import { ButtonOutline, GoogleScript } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import Script from 'next/script';
import Head from 'next/head';

const Login = () => {
  const router = useRouter();

  const { token } = router.query;
  if (token) {
    localStorage.setItem('token', token as string);
  }

  const isLoggedIn = useUser();

  useEffect(() => {
    if (isLoggedIn !== null) router.push('/organizations');
  }, [isLoggedIn, router]);

  return (
    <>
      <Head>
        <title>CodeSeer: Login</title>
      </Head>
      <div className='relative h-full w-full flex justify-center items-center'>
        <Image
          src={background}
          alt='background'
          className='absolute top-0 left-0 w-full h-screen object-cover mix-blend-normal'
        />
        <main className='w-full md:w-[600px] flex flex-col items-center bg-white shadow-lg rounded-2xl overflow-hidden z-10'>
          <h1 className='font-bold text-4xl text-md_blue mt-8'>
            Welcome to CodeSeer
          </h1>
          <Image
            src={GithubIcon}
            alt='background'
            className='w-32 h-auto object-contain my-3'
          />
          <Link href={process.env.NEXT_PUBLIC_LOGIN_GITHUB as string}>
            <ButtonOutline className='rounded-lg font-semibold mb-8'>
              Login with Github
            </ButtonOutline>
          </Link>

          <div className='w-full border-t border-black pt-7 pb-4 text-center text-sm'>
            <p>Not yet? Login with a different account</p>
            <p>
              Need an account?{' '}
              <span className='underline cursor-pointer hover:font-semibold'>
                <Link href='#'>Sign up</Link>
              </span>
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
