import { HeaderBar, PricingCard } from '@/components';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const Pricing = () => {
  const items = new Array(3).fill({
    type: 'Personal',
    price: 500,
    features: [
      {
        label: 'Standard Dummy Text',
        description: 'There are many variation of Lorem ipsum available',
      },
      {
        label: 'Standard Dummy Text',
        description: 'There are many variation of Lorem ipsum available',
      },
      {
        label: 'Standard Dummy Text',
        description: 'There are many variation of Lorem ipsum available',
      },
    ],
  });
  return (
    <>
      <Head>
        <title>CodeSeer: Pricing</title>
      </Head>

      <div className='min-h-screen'>
        <HeaderBar location={'pricing'} />
        <main className='h-full lg:h-screen w-full flex flex-col bg-white overflow-hidden relative'>
          <div className='h-[45%] w-full flex flex-col items-center bg-md_blue drop-shadow-xl'>
            <h1 className='font-semibold text-4xl text-white mt-32 mb-4'>
              Flexible Plans & Pricing
            </h1>
            <p className='text-white font-light w-[500px] text-center'>
              Lorem ipsum is simply dummy text of the printing and type setting
              industry and has been the standard ever since
            </p>
          </div>
          <div className='absolute bottom-9 left-1/2 -translate-x-1/2 w-full h-[600px] flex justify-center px-32'>
            <div className='flex flex-col lg:flex-row gap-3 lg:gap-6 xl:gap-12'>
              {items.map((item, index) => (
                <PricingCard key={index} {...item} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Pricing;
