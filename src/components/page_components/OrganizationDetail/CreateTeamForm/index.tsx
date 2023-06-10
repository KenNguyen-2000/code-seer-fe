'use client';

import ButtonFilled from '@/components/common/ButtonFilled';
import { ChevronDown, CloseIcon } from '@/components/icons';
import { createNewTeam, teamEndpoint } from '@/services/team.service';
import React, { useRef, useState } from 'react';
import { MutatorOptions } from 'swr';

const CreateTeamForm = ({ setIsShown, orgId, mutate, teams }: any) => {
  const labelDropdown = useRef<HTMLUListElement>(null);
  const [selectedLabel, setSelectedLabel] = useState('');

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

  const closeModal = () => {
    setIsShown(false);
  };

  const selectLabelItem = (label: string) => {
    setSelectedLabel(label);
    openLabelDropdown();
  };

  const handleCreateTeam = async (event: any) => {
    event.preventDefault();
    const { teamName, teamLogin } = event.target;
    try {
      const res = await createNewTeam({
        orgId,
        payload: {
          login: teamLogin.value,
          name: teamName.value,
        },
      });

      mutate({ ...teams, ...res.data });
      // if (res.success) {
      closeModal();
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className='fixed inset-0  py-14  flex justify-center z-20'>
      <div
        className='backdrop-brightness-75 backdrop-blur-sm fixed inset-0  py-5'
        onClick={closeModal}
      />
      <form
        onSubmit={handleCreateTeam}
        className='w-[600px] h-fit flex flex-col bg-white rounded-xl z-40 animate-scaleIn'
      >
        <div className=' p-6 border-b border-md_blue flex justify-between'>
          <h1 className='text-md_blue text-3xl font-semibold'>Create Team</h1>
          <CloseIcon onClick={closeModal} className='cursor-pointer' />
        </div>
        <div className='w-full flex flex-col gap-5 px-6 pt-4 pb-8 h-fit overflow-y-auto'>
          <div className=' flex flex-col gap-3'>
            <label htmlFor='team_name' className='text-lg font-medium'>
              Name
            </label>
            <input
              id='team_name'
              name='teamName'
              type='text'
              className='py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500'
              placeholder='CodeSeer, Magim, Four,...'
              required
            />
          </div>
          <div className=' flex flex-col gap-3'>
            <label htmlFor='team_login' className='text-lg font-medium'>
              Login
            </label>
            <input
              id='team_login'
              name='teamLogin'
              type='text'
              className='py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500'
              placeholder='CodeSeer, Magim, Four,...'
              required
            />
          </div>

          <div className='flex flex-col gap-3 relative'>
            <label htmlFor='organization_login' className='text-lg font-medium'>
              Add members
            </label>
            <button
              type='button'
              className='relative w-full'
              onClick={openLabelDropdown}
            >
              <div className='flex items-center justify-between py-4 px-7 border border-gray-400 rounded-md text-gray-500'>
                <span>
                  {selectedLabel !== ''
                    ? selectedLabel
                    : 'Type of Organization'}
                </span>
                <ChevronDown className='w-5 h-5' />
              </div>
            </button>
            <ul
              ref={labelDropdown}
              className='create-organization-label__dropdown absolute top-full z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-in duration-100 opacity-0 invisible'
              role='listbox'
            >
              <li
                className='py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white'
                role='option'
                aria-selected
                onClick={() => selectLabelItem('Ken Nguyen')}
              >
                Ken Nguyen
              </li>
              <li
                className='py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white'
                role='option'
                aria-selected
                onClick={() => selectLabelItem('Nhat Hoang')}
              >
                Nhat Hoang
              </li>
              <li
                className='py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white'
                role='option'
                aria-selected
                onClick={() => selectLabelItem('Tony Quach')}
              >
                Tony Quach
              </li>
              <li
                className='py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white'
                role='option'
                aria-selected
                onClick={() => selectLabelItem('Nhat Hoang')}
              >
                Nhat Hoang
              </li>
            </ul>
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

export default CreateTeamForm;
