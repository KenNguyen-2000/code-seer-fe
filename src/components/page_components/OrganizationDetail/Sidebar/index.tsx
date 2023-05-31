'use client';

import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import {
  CaretDown,
  ChevronDown,
  CircleChevronLeft,
  CircleChevronRight,
  PlusIcon,
  SettingsIcon,
} from '../../../icons';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { joinTeam, retrieveTeams, teamEndpoint } from '@/services/team.service';
import { ITeam } from '@/interfaces/team.interface';
import { domainEndpoint, retrieveDomains } from '@/services/domain.service';
import { IDomain } from '@/interfaces/domain.interface';
import CreateTeamForm from '../CreateTeamForm';
import CreateDomainForm from '../CreateDomainForm';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import ButtonFilled from '@/components/common/ButtonFilled';
import { toast } from 'react-toastify';
import Loader from '@/components/common/Loader';

const Sidebar = () => {
  const router = useRouter();
  const { organizationId } = router.query;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [domainsCollapsed, setDomainsCollapsed] = useState(false);
  const [teamsCollapsed, setTeamsCollapsed] = useState(false);

  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showCreateDomain, setShowCreateDomain] = useState(false);

  const {
    data: teams,
    error: teamsErr,
    isLoading: isTeamLoading,
    mutate: mutateTeam,
  } = useSWR(teamEndpoint + `?orgId=${organizationId}`, retrieveTeams);
  const {
    data: domains,
    error: domainsErr,
    isLoading: isDomainsLoading,
    mutate: mutateDomain,
  } = useSWR(domainEndpoint, retrieveDomains);

  const handleJoinTeam = async (teamId: string) => {
    try {
      const res = await joinTeam({
        url: teamEndpoint + '/members/join',
        teamId: teamId,
        orgId: organizationId as string,
      });

      if (res.success) toast.success('Join team successfully!');
    } catch (error) {}
  };

  // if (isTeamLoading || isDomainsLoading) return <h1>Loading</h1>;
  useEffect(() => {
    window.addEventListener('resize', function (e) {
      if (!isCollapsed && this.window.innerWidth <= 768) {
        setIsCollapsed(true);
      }
      if (isCollapsed && this.window.innerWidth > 768) setIsCollapsed(false);
    });

    return () => window.removeEventListener('resize', function (e) {});
  }, [isCollapsed]);

  return (
    <>
      {showCreateTeam && (
        <CreateTeamForm
          setIsShown={setShowCreateTeam}
          orgId={organizationId}
          mutate={mutateTeam}
          teams={teams.data}
        />
      )}
      {showCreateDomain && teams && domains && (
        <CreateDomainForm
          setIsShown={setShowCreateDomain}
          teams={teams.data}
          mutate={mutateDomain}
          domains={domains.data}
        />
      )}
      <aside
        className={` absolute top-0 bottom-0 overflow-x-hidden bg-white transition-all duration-300 
        ${isCollapsed ? 'w-0' : 'w-[340px]'}
         md:relative`}
      >
        <div className='w-full h-full' id={styles.wrapper}>
          <button
            id={styles.btn}
            className='absolute right-3 top-28 text-md_gray'
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <CircleChevronLeft
              fill='#fff'
              className={`fixed transition duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div className='flex-grow flex-shrink-0 flex flex-col gap-6 px-6 whitespace-nowrap'>
            <div>
              <button className='text-primary_text font-semibold flex items-center'>
                FPLMS
                <span className=' ml-4 text-dark_blue'>
                  <CaretDown width='20' height='20' />
                </span>
              </button>
              <p className='text-md_gray text-sm'>Software Project</p>
            </div>
            <div className='h-[1px] w-full bg-primary_gray'></div>

            <section>
              <div className='flex justify-between'>
                <button
                  className='flex gap-2 text-xl text-dark_blue font-semibold items-center mb-2'
                  onClick={() => setDomainsCollapsed(!domainsCollapsed)}
                >
                  <span>
                    <ChevronDown
                      width='20'
                      height='20'
                      className={`transition-all ${
                        domainsCollapsed ? '-rotate-90' : ''
                      }`}
                    />
                  </span>
                  Domains
                </button>
                <button>
                  <PlusIcon
                    className='w-5 h-5 hover:scale-125 transition'
                    onClick={() => setShowCreateDomain(true)}
                  />
                </button>
              </div>

              <ul
                className={`pl-7 flex flex-col gap-2 overflow-hidden transition-all ease-in-out ${
                  domainsCollapsed ? 'max-h-0' : 'max-h-[400px]'
                }`}
              >
                {isDomainsLoading ? (
                  <Loader width='40px' height='40px' borderWidth='6px' />
                ) : (
                  domains?.data?.map((domain: any) => (
                    <li className='text-md_gray' key={domain.id}>
                      <button
                        className='w-fit hover:underline hover:font-semibold hover:text-dark_blue'
                        onClick={() =>
                          router.push(
                            `/organizations/${organizationId}/${domain.id}`
                          )
                        }
                      >
                        {domain.name}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </section>

            <section>
              <div className='flex justify-between'>
                <button
                  className='flex gap-2 text-xl text-dark_blue font-semibold items-center mb-2'
                  onClick={() => setTeamsCollapsed(!teamsCollapsed)}
                >
                  <span>
                    <ChevronDown
                      width='20'
                      height='20'
                      className={`transition-all ${
                        teamsCollapsed ? '-rotate-90' : ''
                      }`}
                    />
                  </span>
                  Teams
                </button>
                <button>
                  <PlusIcon
                    className='w-5 h-5 hover:scale-125 transition'
                    onClick={() => setShowCreateTeam(true)}
                  />
                </button>
              </div>
              <ul
                className={`pl-7 flex flex-col gap-2 overflow-hidden transition-all ease-in-out ${
                  teamsCollapsed ? 'max-h-0' : 'max-h-[400px]'
                }`}
              >
                {isTeamLoading ? (
                  <Loader width='40px' height='40px' borderWidth='6px' />
                ) : (
                  teams?.data?.map((team: ITeam) => (
                    <li
                      className='text-md_gray flex justify-between items-center'
                      key={team.id}
                    >
                      <button
                        className='w-fit hover:underline hover:font-semibold hover:text-dark_blue'
                        onClick={() =>
                          router.push(
                            `/organizations/${organizationId}/teams/1`
                          )
                        }
                      >
                        {team.team.name}
                      </button>

                      <ButtonFilled
                        className='text-xs px-3 rounded-full'
                        style={{ padding: '4px 12px' }}
                        onClick={handleJoinTeam.bind(null, team.team.id)}
                      >
                        Join
                      </ButtonFilled>
                    </li>
                  ))
                )}
              </ul>
            </section>

            <section>
              <button className='w-full flex justify-between gap-2 text-xl text-dark_blue font-semibold items-center'>
                <div className='flex gap-2 items-center'>
                  <span>
                    <SettingsIcon width='20' height='20' />
                  </span>
                  Organization Settings
                </div>
                <span className='self-end'>
                  <CircleChevronRight width='20' height='20' />
                </span>
              </button>
            </section>
          </div>
          <footer className='w-full text-center self-end whitespace-nowrap'>
            <p className='text-sm text-primary_text'>
              You&apos;re in a domain managed place
            </p>
            <strong className='text-md_gray text-sm hover:cursor-pointer'>
              Learn more
            </strong>
          </footer>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
