'use client';

import { ChevronDown, CloseIcon } from '@/components/icons';
import { IDomain } from '@/interfaces/domain.interface';
import { ITeam } from '@/interfaces/team.interface';
import {
  createNewDomain,
  domainEndpoint,
  retrieveGithubAccounts,
  retrieveInstalledAppRepos,
} from '@/services/domain.service';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { MutatorOptions } from 'swr';
import useUser from '@/hooks/useUser';
import ButtonFilled from '@/components/common/ButtonFilled';
import Link from 'next/link';

interface ICreateDomainForm {
  teams: ITeam[];
  setIsShown: any;
  mutate: any;
  domains: IDomain[];
}
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateDomainForm = ({
  teams,
  setIsShown,
  mutate,
  domains,
}: ICreateDomainForm) => {
  const labelDropdown = useRef<HTMLUListElement>(null);
  const githubOrgsDropdown = useRef<HTMLUListElement>(null);
  const reposDropdown = useRef<HTMLUListElement>(null);

  const [selectedTeam, setSelectedTeam] = useState<ITeam>();
  const [value, setValue] = useState('');

  const [githubOrgs, setGithubOrgs] = useState<any[]>([]);
  const [selectedGithubOrg, setSelectedGithubOrg] = useState('');

  const [repos, setRepos] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState('');

  const user: any = useUser();

  const openLabelDropdown = () => {
    if (labelDropdown.current!!.classList.contains('invisible')) {
      labelDropdown.current!!.classList.toggle('opacity-0');
      labelDropdown.current!!.classList.toggle('invisible');
    } else {
      labelDropdown.current!!.classList.toggle('opacity-0');
      setTimeout(() => {
        labelDropdown.current!!.classList.toggle('invisible');
      }, 100);
    }
  };

  const openGithubOrgsDropdown = () => {
    if (githubOrgsDropdown.current!!.classList.contains('invisible')) {
      githubOrgsDropdown.current!!.classList.toggle('opacity-0');
      githubOrgsDropdown.current!!.classList.toggle('invisible');
    } else {
      githubOrgsDropdown.current!!.classList.toggle('opacity-0');
      setTimeout(() => {
        githubOrgsDropdown.current!!.classList.toggle('invisible');
      }, 100);
    }
  };

  const openReposDropdown = () => {
    if (reposDropdown.current!!.classList.contains('invisible')) {
      reposDropdown.current!!.classList.toggle('opacity-0');
      reposDropdown.current!!.classList.toggle('invisible');
    } else {
      reposDropdown.current!!.classList.toggle('opacity-0');
      setTimeout(() => {
        reposDropdown.current!!.classList.toggle('invisible');
      }, 100);
    }
  };

  const closeModal = () => {
    setIsShown(false);
  };

  const selectAssignedTeam = (team: ITeam) => {
    setSelectedTeam(team);
    openLabelDropdown();
  };

  const selectGithubOrg = (event: any, githubOrg: string) => {
    event.stopPropagation();
    setSelectedGithubOrg(githubOrg);
    openGithubOrgsDropdown();
  };

  const selectRepo = (event: any, repo: string) => {
    event.stopPropagation();
    setSelectedRepo(repo);
    openReposDropdown();
  };

  const handleCreateDomain = async (event: any) => {
    event.preventDefault();
    const { domainName, domainDirectory } = event.target;

    try {
      await mutate(
        domainEndpoint,
        createNewDomain({
          teamId: selectedTeam?.team.id as string,
          payload: {
            name: domainName.value,
            directory: domainDirectory.value,
            repository: selectedRepo,
          },
        }),
        {
          optimisticData: [
            ...domains,
            {
              teamId: selectedTeam?.id as string,
              name: domainName.value,
              directory: domainDirectory.value,
              repository: selectedRepo,
            },
          ],
          rollbackOnError: true,
        } as MutatorOptions
      );

      toast.success(`Create domain ${domainName.value} successfully!`, {
        autoClose: 2000,
      });
      closeModal();
    } catch (error) {
      toast.error('Failed to create new domain!', {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    const fetchGithubOrgs = async () => {
      const data = await retrieveGithubAccounts(user.githubToken);
      if (data) {
        setGithubOrgs([user.login, ...data.map((item: any) => item.login)]);
        setSelectedGithubOrg(user.login);
      }
    };

    fetchGithubOrgs();
  }, [user.githubToken, user.login]);

  useEffect(() => {
    const fetchInstalledAppRepos = async () => {
      const data = await retrieveInstalledAppRepos(selectedGithubOrg);
      setRepos(data);
      setSelectedRepo(data[0].full_name);
    };
    if (selectedGithubOrg !== '') fetchInstalledAppRepos();
  }, [selectedGithubOrg]);

  return (
    <section className='fixed inset-0  py-14  flex justify-center z-20 '>
      <div
        className='backdrop-brightness-75 backdrop-blur-sm fixed inset-0 py-5 '
        onClick={closeModal}
      />
      <form
        onSubmit={handleCreateDomain}
        className='w-[600px]   flex flex-col bg-white rounded-xl z-40 animate-scaleIn'
      >
        <div className=' p-6 border-b border-md_blue flex justify-between'>
          <h1 className='text-md_blue text-3xl font-semibold'>Create Domain</h1>
          <CloseIcon onClick={closeModal} className='cursor-pointer' />
        </div>
        <div className='w-full h-full flex flex-col gap-5 px-6 pt-4 pb-8 max-h-screen overflow-y-scroll'>
          <div className=' flex flex-col gap-3'>
            <label htmlFor='domain_name' className='text-lg font-medium'>
              Domain name
            </label>
            <input
              id='domain_name'
              name='domainName'
              type='text'
              className='py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500'
              placeholder='Login domain, Auth domain, Mange domain,...'
              required
            />
          </div>
          <div className='flex flex-col gap-3 relative'>
            <label htmlFor='organization_login' className='text-lg font-medium'>
              Account/Organization
            </label>
            <button
              type='button'
              className='relative w-full'
              onClick={openGithubOrgsDropdown}
            >
              <div className='flex items-center justify-between py-4 px-7 border border-gray-400 rounded-md text-gray-500'>
                <span>
                  {selectedGithubOrg
                    ? selectedGithubOrg
                    : 'Account/Organization'}
                </span>
                <ChevronDown className='w-5 h-5' />
              </div>
              <ul
                ref={githubOrgsDropdown}
                className='create-organization-label__dropdown absolute top-full z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-in duration-100 opacity-0 invisible text-left'
                role='listbox'
              >
                {githubOrgs?.map((githubOrg: any) => (
                  <li
                    key={githubOrg}
                    className='py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white'
                    role='option'
                    aria-selected
                    onClick={(e) => selectGithubOrg(e, githubOrg)}
                  >
                    {githubOrg}
                  </li>
                ))}
              </ul>
            </button>
            <Link
              target='_blank'
              rel='noopener noreferrer'
              href={process.env.NEXT_PUBLIC_CODESEER_INSTALLATION as string}
              className='text-drark_blue underline'
            >
              + Config CodeSeer bot installation
            </Link>
          </div>

          <div className='flex flex-col gap-3 relative'>
            <label htmlFor='organization_login' className='text-lg font-medium'>
              Repository
            </label>
            <button
              type='button'
              className='relative w-full'
              onClick={openReposDropdown}
            >
              <div className='flex items-center justify-between py-4 px-7 border border-gray-400 rounded-md text-gray-500'>
                <span>{selectedRepo ? selectedRepo : 'repository'}</span>
                <ChevronDown className='w-5 h-5' />
              </div>
              <ul
                ref={reposDropdown}
                className='create-organization-label__dropdown absolute top-full z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-in duration-100 opacity-0 invisible text-left'
                role='listbox'
              >
                {repos?.map((repo: any) => (
                  <li
                    key={repo.id}
                    className='py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white'
                    role='option'
                    aria-selected
                    onClick={(e) => selectRepo(e, repo.full_name)}
                  >
                    {repo.full_name}
                  </li>
                ))}
              </ul>
            </button>

            <Link
              target='_blank'
              rel='noopener noreferrer'
              href={process.env.NEXT_PUBLIC_CODESEER_CONFIG as string}
              className='text-drark_blue underline'
            >
              + Config repository accessible permission
            </Link>
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='domain_directory' className='text-lg font-medium'>
              Directory
            </label>
            <input
              id='domain_directory'
              name='domainDirectory'
              type='text'
              className='py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500'
              placeholder='src/components/, src/, root/, dist/,...'
              required
            />
          </div>
          <div className='flex flex-col gap-3 relative'>
            <label htmlFor='organization_login' className='text-lg font-medium'>
              Assigned to
            </label>
            <button
              type='button'
              className='relative w-full'
              onClick={openLabelDropdown}
            >
              <div className='flex items-center justify-between py-4 px-7 border border-gray-400 rounded-md text-gray-500'>
                <span>{selectedTeam ? selectedTeam.team.name : 'Team'}</span>
                <ChevronDown className='w-5 h-5' />
              </div>
            </button>
            <ul
              ref={labelDropdown}
              className='create-organization-label__dropdown absolute top-full z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-in duration-100 opacity-0 invisible'
              role='listbox'
            >
              {teams.map((team: ITeam) => (
                <li
                  key={team.teamId}
                  className='py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white'
                  role='option'
                  aria-selected
                  onClick={selectAssignedTeam.bind(null, team)}
                >
                  {team.team.name}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col gap-3 relative mb-10'>
            <label
              htmlFor='organization_description'
              className='text-lg font-medium'
            >
              Description
            </label>
            <ReactQuill
              id='organization_description'
              className='h-[120px] '
              theme='snow'
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className='p-6 border-t border-md_blue w-full flex justify-end'>
          <ButtonFilled type='submit' className='rounded-md'>
            Create
          </ButtonFilled>
        </div>
      </form>
    </section>
  );
};

export default CreateDomainForm;
