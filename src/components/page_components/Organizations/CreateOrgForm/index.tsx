'use client';

import { ChevronDown, EyeClosedIcon } from '@/components/icons';
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import styles from './create-org-form.module.scss';
import {
  createNewOrganization,
  organizationEndpoint,
} from '@/services/organization.service';
import { IOrganization } from '@/interfaces';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface ICreateOrgForm {
  isShown?: boolean;
  setIsShown: any;
  mutate: any;
  organizations: IOrganization[];
}

const CreateOrgForm = ({
  isShown,
  setIsShown,
  mutate,
  organizations,
}: ICreateOrgForm) => {
  const labelDropdown = useRef<HTMLUListElement>(null);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    login: '',
    label: '',
    description: '',
  });

  const formRef = useRef<HTMLFormElement>(null);

  const openLabelDropdown = () => {
    if (labelDropdown.current !== null) {
      if (labelDropdown.current.style.visibility !== 'visible') {
        // labelDropdown.current!!.classList.toggle('opacity-100');
        // labelDropdown.current!!.classList.toggle('visible');

        labelDropdown.current.style.visibility = 'visible';
        labelDropdown.current.style.opacity = '1';
      } else {
        labelDropdown.current.style.opacity = '';
        setTimeout(() => {
          labelDropdown.current!!.style.visibility = '';
        }, 100);
      }
    }
  };

  const closeModal = () => {
    formRef.current!!.style.animation = 'scaleOut 200ms ease-in-out forwards';

    setTimeout(() => setIsShown(false), 300);
  };

  const selectLabelItem = (label: string) => {
    setSelectedLabel(label);
    openLabelDropdown();
  };

  const validateFormInput = (name: string, login: string) => {
    let valid = true;

    // Validate name input
    if (name === '') {
      setErrors((prev) => ({
        ...prev,
        name: 'Organization name must not be blank',
      }));
      valid = false;
    } else if (name.length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: 'Organization name length must greater or equal to 3',
      }));
      valid = false;
    }

    // Validate login input
    if (login === '') {
      setErrors((prev) => ({ ...prev, login: 'Login must not be blank' }));
      valid = false;
    } else if (login.length < 3) {
      setErrors((prev) => ({
        ...prev,
        login: 'Login length must greater or equal to 3',
      }));
      valid = false;
    }

    return valid;
  };

  const handleCreateOrg = async (event: any) => {
    event.preventDefault();
    const { organizationName, organizationLogin } = event.target;
    const validInput = validateFormInput(
      organizationName.value,
      organizationLogin.value
    );
    if (validInput) {
      try {
        const res = await createNewOrganization(organizationEndpoint, {
          login: organizationLogin.value as string,
          name: organizationName.value,
          description: value,
        });
        mutate({ ...organizations, ...res.data });
        closeModal();
      } catch (error) {
        console.log(error);
      }
      setErrors({
        name: '',
        login: '',
        label: '',
        description: '',
      });
    }
  };

  return (
    <section className={styles.container}>
      <div
        className={`${styles.overlay}  backdrop-brightness-75 backdrop-blur-sm`}
        onClick={closeModal}
      />
      <form
        onSubmit={handleCreateOrg}
        className={styles.form__wrapper}
        ref={formRef}
      >
        <div className={styles.form__header}>
          <h1 className={styles.form__header__h1}>Create Organization</h1>
          <EyeClosedIcon onClick={closeModal} className='cursor-pointer' />
        </div>
        <div className={styles.form__body}>
          <div className={styles.form__field__wrapper}>
            <label
              htmlFor='organization_name'
              className={styles.form__field__label}
            >
              Organization Name
            </label>
            <input
              id='organization_name'
              name='organizationName'
              type='text'
              className={styles.form__input__text}
              placeholder='Meta, Google, Azure,...'
            />
            {errors.name !== '' && (
              <span className={styles.error__msg}>{errors.name}</span>
            )}
          </div>
          <div className={styles.form__field__wrapper}>
            <label
              htmlFor='organization_login'
              className={styles.form__field__label}
            >
              Login
            </label>
            <input
              id='organization_login'
              name='organizationLogin'
              type='text'
              className={styles.form__input__text}
              placeholder='Meta, Google, Azure,...'
            />
            {errors.login !== '' && (
              <span className={styles.error__msg}>{errors.login}</span>
            )}
          </div>
          <div className={styles.form__field__wrapper}>
            <label
              htmlFor='organization_login'
              className={styles.form__field__label}
            >
              Label
            </label>
            <button
              type='button'
              className='relative w-full'
              onClick={openLabelDropdown}
            >
              <div className={styles.form__input__selection}>
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
              className={styles.selection__dropdown}
              role='listbox'
            >
              <li
                className={styles.selection__dropdown__item}
                role='option'
                aria-selected
                onClick={() => selectLabelItem('Onboarding')}
              >
                Onboarding
              </li>
              <li
                className={styles.selection__dropdown__item}
                role='option'
                aria-selected
                onClick={() => selectLabelItem('Maintenace')}
              >
                Maintenace
              </li>
              <li
                className={styles.selection__dropdown__item}
                role='option'
                aria-selected
                onClick={() => selectLabelItem('Migrating')}
              >
                Migrating
              </li>
              <li
                className={styles.selection__dropdown__item}
                role='option'
                aria-selected
                onClick={() => selectLabelItem('Continuous')}
              >
                Continuous
              </li>
            </ul>
          </div>
          <div className={`${styles.form__field__wrapper} mb-10`}>
            <label
              htmlFor='organization_description'
              className={styles.form__field__label}
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
        <div className={styles.form__footer}>
          <button type='submit' className={styles.btn__submit}>
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateOrgForm;
