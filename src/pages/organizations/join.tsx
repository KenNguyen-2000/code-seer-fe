'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { joinOrganization } from '@/services/organization.service';
import Link from 'next/link';

function JoinOrganization() {
  const router = useRouter();
  const { inv, org } = router.query;

  if (typeof window !== 'undefined') {
    if (router.basePath === '/join') router.push('/404');
  }

  useEffect(() => {
    // Handle the logic to generate the custom URL based on `inv` and `org` query parameters
    const joinOrg = async () => {
      const res = await joinOrganization({
        invitationId: inv as string,
        orgId: org as string,
      });

      if (res.success) {
        router.push(`/organizations/${res.data.organizationId}`);
      }
    };
    if (org && inv) joinOrg();
  }, [inv, org, router]);

  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
          Joining Organization
        </h1>
        <div className='flex gap-2 w-full justify-center mt-7'>
          <span
            className='w-3 h-3 rounded-full bg-blue-500 animate-bounce'
            style={{
              animationDuration: '600ms',
            }}
          ></span>
          <span
            className='w-3 h-3 rounded-full bg-blue-500 animate-bounce'
            style={{
              animationDelay: '150ms',
              animationDuration: '600ms',
            }}
          ></span>
          <span
            className='w-3 h-3 rounded-full bg-blue-500 animate-bounce'
            style={{
              animationDelay: '300ms',
              animationDuration: '600ms',
            }}
          ></span>
        </div>
        <p className='mt-6 text-base leading-7 text-gray-600'>
          Please wait a few minute for redirecting.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link
            href='/organizations'
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Cancel
          </Link>
          <Link href='/contact' className='text-sm font-semibold text-gray-900'>
            Contact support <span aria-hidden='true'>&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default JoinOrganization;
