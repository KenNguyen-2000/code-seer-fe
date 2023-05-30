'use client';

import { CommitChanges, Layout, Sidebar } from '@/components';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MapVersion from '/public/map-version.png';
import Image from 'next/image';
import useSWR from 'swr';
import {
  organizationEndpoint,
  retrieveAnOrganization,
} from '@/services/organization.service';
import PrivateRoute from '@/components/common/PrivateRoute';
import { useAppDispatch } from '@/redux/reduxHooks';
import { setOrganization } from '@/redux/slices/organizationSlice';
import { setDependencyMaps } from '@/redux/slices/domainSlice';

const OrganizationDetail = () => {
  const router = useRouter();
  const { organizationId } = router.query;
  const {
    data: organization,
    error: orgErr,
    isLoading: isOrgLoading,
  } = useSWR(
    organizationId ? `${organizationEndpoint}/${organizationId}` : null,
    retrieveAnOrganization
  );

  const dispatch = useAppDispatch();

  if (organization) dispatch(setOrganization(organization));

  // if (isOrgLoading) return <h1>Loading</h1>;

  useEffect(() => {
    dispatch(setDependencyMaps([]));
  }, [dispatch]);

  return (
    <>
      <div className='flex-grow pl-6 py-9'>
        <section className='mb-6'>
          <h1 className='text-dark_blue text-xl font-semibold mb-4'>
            Recently Versions:
          </h1>
          <ul className='flex gap-3'>
            {new Array(3).fill('').map((item, index) => (
              <li
                key={index}
                role='button'
                onClick={() => {
                  router.push(
                    `/organizations/${organizationId}/dependency-map/${index}`
                  );
                }}
              >
                <Image src={MapVersion} alt='Dependency Map' priority={true} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h1 className='w-full pb-4 text-dark_blue text-xl font-semibold border-b border-primary_gray mb-6'>
            Latest changes
          </h1>

          <ul className='flex flex-col gap-8'>
            {new Array(8).fill('').map((item, index) => (
              <li key={index}>
                <CommitChanges />
              </li>
            ))}
          </ul>
        </section>
      </div>
      <aside className='md:w-0 lg:w-96'></aside>
    </>
  );
};

export default OrganizationDetail;

OrganizationDetail.getLayout = function getLayout(page: any) {
  return (
    <PrivateRoute>
      <Layout>
        <main className='flex-grow flex bg-[#f5f5f5] relative'>
          <Sidebar />
          {page}
        </main>
      </Layout>
    </PrivateRoute>
  );
};
