import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import CodeSeerLogo from '/public/codeseer-logo.png';
import {
  BellFilledIcon,
  LogoutIcon,
  PlusIcon,
  SearchIcon,
  UserPlus,
} from '@/components/icons';
import { useRouter } from 'next/router';
import ArrowBadgeUp from '@/components/icons/ArrowBadgeUp';
import ButtonFilled from '../ButtonFilled';
import { toast } from 'react-toastify';
import { inviteMemberToOrganization } from '@/services/organization.service';

const Navbar: React.FC = () => {
  const router = useRouter();

  const { organizationId } = router.query;

  const [memberEmail, setMemberEmail] = useState('');
  const [inviteLink, setInviteLink] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleGetInviteLink = async () => {
    try {
      const res = await inviteMemberToOrganization({
        memberEmail: memberEmail.split('@')[0],
        organizationId: organizationId as string,
      });

      if (res.success)
        setInviteLink(
          `${window.location.origin}/organizations/join?inv=${res.data.id}&org=${res.data.organizationId}`
        );
    } catch (error: any) {
      toast.error(`${error.data.error.name}`);
    }
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.left}>
        <button
          className='flex items-center gap-4'
          onClick={() => router.push('/welcome')}
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
        {organizationId ? (
          <div className='relative z-10 group'>
            <div className='text-white hover:scale-110 transition ease-out cursor-pointer'>
              <UserPlus />
            </div>
            <div className='invisible -z-10 group-hover:visible group-hover:z-10'>
              <div className='absolute top-full border-8 border-transparent border-b-white z-20'></div>
              <div className='py-2 px-4 w-[250px] min-h-[60px] flex flex-col justify-start gap-2 bg-slate-100 border border-light_gray rounded-md absolute top-full mt-4 right-0 drop-shadow-xl before:content-[""] before:absolute before:w-full before:h-4 before:-top-4'>
                <input
                  type={inviteLink !== '' ? 'text' : 'email'}
                  className='w-full border border-light_gray rounded-md bg-transparent py-1 pl-2 pr-3 text-gray-500 focus:outline-primary_gray'
                  placeholder='Member email'
                  onChange={(e) => setMemberEmail(e.target.value)}
                  value={inviteLink !== '' ? inviteLink : memberEmail}
                  disabled={inviteLink !== ''}
                  required
                />
                <ButtonFilled
                  className='whitespace-nowrap rounded-md'
                  onClick={
                    inviteLink !== ''
                      ? () => navigator.clipboard.writeText(inviteLink)
                      : handleGetInviteLink
                  }
                  disabled={memberEmail === '' ? true : false}
                >
                  {inviteLink !== '' ? 'Copy Link' : 'Generate Invite Link'}
                </ButtonFilled>
              </div>
            </div>
          </div>
        ) : null}
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
