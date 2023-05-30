'use client';

import {
  CreateOrgForm,
  Layout,
  OrganizationCard,
  OrganizationLoader,
} from '@/components';
import React, { useState } from 'react';
import styles from './organizations.module.scss';
import useSWR from 'swr';
import {
  retrieveOrganizations,
  organizationEndpoint,
} from '@/services/organization.service';
import useUser from '@/hooks/useUser';
import PrivateRoute from '@/components/common/PrivateRoute';

const organizationTypes = [
  'Onboarding',
  'Maintenance',
  'Migration',
  'Continuous',
];

const OrganizationList = () => {
  const [selectedType, setSelectedType] = useState(organizationTypes[0]);
  const [isShown, setIsShown] = useState(false);
  const { data, error, isLoading } = useSWR(
    organizationEndpoint,
    retrieveOrganizations
  );

  const user = useUser();

  // if (isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>;

  return (
    <main className='h-full px-10'>
      {isShown && <CreateOrgForm isShown={isShown} setIsShown={setIsShown} />}
      <section className='mb-8'>
        <h1 className='text-4xl text-dark_blue font-semibold mt-14 mb-8'>
          Your Organization
        </h1>
        <div className='flex justify-between mb-4'>
          <h3 className='text-2xl font-semibold text-dark_blue'>
            Recent Organizations
          </h3>
          <a
            className='underline text-primary_blue'
            href='#'
            type='button'
            onClick={() => setIsShown(true)}
          >
            Create new
          </a>
        </div>

        <div className='flex flex-wrap md:flex-nowrap flex-col md:flex-row gap-8 min-h-[150px] '>
          {!isLoading
            ? data?.data?.map((organization: any) => (
                <OrganizationCard
                  key={organization.id}
                  organization={organization.organization}
                />
              ))
            : new Array(3)
                .fill('')
                .map((item, index) => <OrganizationLoader key={index} />)}
        </div>
      </section>
      <section>
        <ul className='flex  gap-4 text-primary_gray font-semibold'>
          {organizationTypes.map((type) => (
            <li
              key={type}
              className={`cursor-pointer hover:text-dark_blue relative transition-all after:content-[""] after:absolute after:-bottom-[1.5px] after:left-1/2 after:-translate-x-1/2 after:right-0 after:h-1 after:bg-dark_blue after:w-0 hover:after:w-full after:transition-all ${
                selectedType === type ? styles.selected : ''
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </li>
          ))}
        </ul>
        <div className='h-[1px] w-full bg-slate-700' />
        <div className='min-h-[300px]'></div>
      </section>
    </main>
  );
};

export default OrganizationList;

OrganizationList.getLayout = function getLayout(page: any) {
  return (
    <PrivateRoute>
      <Layout>{page}</Layout>
    </PrivateRoute>
  );
};
