'use client';

import React, { useEffect, useRef, useState } from 'react';
import FolderTree from '../FolderTree';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import { IDependencyMap } from '@/interfaces/dependency-map.interface';
import { fetchDepMaps, fetchMapById } from '@/redux/thunks/map.thunk';

import styles from './action-bar.module.scss';
import { setCurMap } from '@/redux/slices/mapSlice';
import { PlusIcon } from '@/components/icons';
import { toast } from 'react-toastify';
import {
  retrieveWorkflowById,
  retrieveWorkflows,
  runWorkflow,
} from '@/services/domain.service';
import { IDomain, IWorkflow } from '@/interfaces/domain.interface';
import InputModal from '@/components/common/InputModal';
import { deleteMapVersion } from '@/services/map.service';
import useUser from '@/hooks/useUser';
import Loader from '@/components/common/Loader';

const ActionBar = ({ explorer }: any) => {
  const dispatch = useAppDispatch();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const user: any = useUser();

  const domain: IDomain | undefined = useAppSelector(
    (state) => state.domain.domain
  );
  const dependencyMaps = useAppSelector((state) => state.domain.dependencyMaps);
  const curMap = useAppSelector((state) => state.mapSlice.map);

  const [width, setWidth] = useState(400);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showInputModal, setShowInputModal] = useState(false);
  const [workflowRunning, setWorkflowRunning] = useState(false);

  const handleSwitchMap = (mapId: string) => {
    const exactMap = dependencyMaps.find((map) => map.id === mapId);
    if (exactMap) dispatch(setCurMap(exactMap));
    else dispatch(fetchMapById(mapId));
  };

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      if (dragging) {
        const deltaX = event.clientX - startX;
        const newWidth = width + deltaX * 1.5;
        const clampedWidth = Math.min(Math.max(newWidth, 400), 1000); // Limit the width within the range
        setWidth(clampedWidth);
        setStartX(event.clientX);
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, startX, width]);

  const handleMouseDown = (event: any) => {
    event.preventDefault(); // Prevent text selection
    setDragging(true);
    setStartX(event.clientX);
  };

  const handleGetWorkflow = async ({
    owner,
    repository,
    githubToken,
    workflowId,
  }: IWorkflow) => {
    const workflow = await retrieveWorkflowById({
      owner,
      repository,
      githubToken: githubToken,
      workflowId: workflowId,
    });

    return workflow;
  };

  const handleTrackingWorkflow = async () => {
    console.log('Tracking ne');
    if (domain) {
      try {
        const owner = domain.domain.repository.split('/')[0];
        const repository = domain.domain.repository.split('/')[1];
        const res = await retrieveWorkflows({
          owner,
          repository,
          githubToken: user.githubToken,
        });

        const { workflow_runs } = res;
        const in_progress_workflows = workflow_runs.filter(
          (workflow_run: any) => workflow_run.status !== 'completed'
        );

        if (in_progress_workflows.length > 0) {
          let myTimer = setInterval(async () => {
            const workflow = await handleGetWorkflow({
              owner,
              repository,
              githubToken: user.githubToken,
              workflowId: in_progress_workflows[0].id,
            });
            if (workflow.status === 'completed') {
              setWorkflowRunning(false);
              dispatch(fetchDepMaps(domain.domain.id));
              clearInterval(myTimer);
            }
          }, 10000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRunWorkflow = async (version: string) => {
    try {
      const owner = domain?.domain.repository.split('/')[0] as string;
      const repository = domain?.domain.repository.split('/')[1] as string;
      const res = await runWorkflow({ owner, repository, version });
      if (res.success) {
        toast.success('Run workflow success');
      }

      setWorkflowRunning(true);
      setTimeout(() => {
        handleTrackingWorkflow();
      }, 15000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteVersion = async (versionId: string) => {
    try {
      const res = await deleteMapVersion(versionId);
      if (res.success) toast.success('Delete verion successfully!');
    } catch (error) {}
  };

  return (
    <>
      <InputModal
        isShown={showInputModal}
        closeModal={() => setShowInputModal(false)}
        action={handleRunWorkflow}
        title={'Enter map version'}
      />
      <aside
        className=' p-3 bg-light_white flex flex-col gap-3 relative transition ease-out duration-200'
        ref={wrapperRef}
        style={{ width: `${width}px` }}
      >
        <div
          className='absolute right-0 top-0 bottom-0 w-2 bg-transparent hover:cursor-col-resize'
          onMouseDown={handleMouseDown}
        />
        <div className='w-full bg-white rounded-lg py-2 px-3 flex flex-col gap-[10px] border border-slate-300'>
          <div className='w-full text-center relative'>
            Version
            <button
              className='absolute top-1/2 right-1 -translate-y-1/2 w-5 h-5'
              onClick={() => setShowInputModal(true)}
            >
              <span>
                {workflowRunning ? (
                  <Loader />
                ) : (
                  <PlusIcon className='h-5 w-5' />
                )}
              </span>
            </button>
          </div>
          <ul
            className={`${styles.version__list__wrapper} relative flex flex-col gap-[10px] max-h-[140px] `}
          >
            {dependencyMaps?.map((item: IDependencyMap, index: number) => {
              const createdDate = new Date(item.createdAt as string);
              const dateString = `${createdDate.getDate()}/${
                createdDate.getMonth() + 1
              }/${createdDate.getFullYear()}`;

              return (
                <li
                  key={item.id}
                  className={`group h-10 rounded-[4px] cursor-pointer transition-all duration-200 ${
                    item.id === curMap?.id
                      ? 'bg-md_blue text-white'
                      : 'text-md_blue hover:bg-md_blue hover:text-white'
                  }`}
                >
                  <div
                    className='w-full flex items-center justify-between p-2 '
                    onClick={handleSwitchMap.bind(null, item.id)}
                  >
                    <button>
                      {item.version !== null
                        ? `${item.version.substring(
                            1,
                            item.version.length - 1
                          )}`
                        : `Version 1.0.${index + 1}`}
                    </button>
                    <span className='group-hover:hidden'>{dateString}</span>
                    <button
                      className='hidden group-hover:flex w-fit h-fit rounded-sm px-2 bg-red-600 hover:bg-red-500  items-center justify-center'
                      onClick={handleDeleteVersion.bind(null, item.id)}
                    >
                      <span>x</span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='flex-grow w-full max-h-[600px]  rounded-lg overflow-hidden  border border-slate-300'>
          <div className='w-full h-full  max-h-[600px] py-2 px-4 bg-white overflow-y-scroll'>
            {explorer.length > 0 && <FolderTree explorer={explorer[0]} />}
          </div>
        </div>
        {/* <fieldset className='h-[200px] w-full bg-white rounded-lg px-4 py-5 border border-slate-300'>
        <legend className='sr-only'>Rules</legend>
        <div
          className='text-sm font-semibold leading-6 text-gray-900'
          aria-hidden='true'
        >
          Rules
        </div>
        <div className='mt-4 space-y-4'>
          <div className='flex items-start'>
            <div className='flex h-6 items-center'>
              <input
                id='orphan'
                name='orphan'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-primary_blue focus:ring-primary_blue cursor-pointer'
              />
            </div>
            <div className='ml-3 text-sm leading-6'>
              <label
                htmlFor='orphan'
                className='font-medium text-gray-900 cursor-pointer'
              >
                Orphan
              </label>
            </div>
          </div>
          <div className='flex items-start'>
            <div className='flex h-6 items-center'>
              <input
                id='inherit'
                name='inherit'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-primary_blue focus:ring-primary_blue cursor-pointer'
              />
            </div>
            <div className='ml-3 text-sm leading-6'>
              <label
                htmlFor='inherit'
                className='font-medium text-gray-900 cursor-pointer'
              >
                Inherit
              </label>
            </div>
          </div>
          <div className='flex items-start'>
            <div className='flex h-6 items-center'>
              <input
                id='naming-convention'
                name='naming-convention'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-primary_blue focus:ring-primary_blue cursor-pointer'
              />
            </div>
            <div className='ml-3 text-sm leading-6'>
              <label
                htmlFor='naming-convention'
                className='font-medium text-gray-900 cursor-pointer'
              >
                Naming Convention
              </label>
            </div>
          </div>
          <div className='flex items-start'>
            <div className='flex h-6 items-center'>
              <input
                id='circular-dependency'
                name='circular-dependency'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-primary_blue focus:ring-primary_blue cursor-pointer'
              />
            </div>
            <div className='ml-3 text-sm leading-6'>
              <label
                htmlFor='circular-dependency'
                className='font-medium text-gray-900 cursor-pointer'
              >
                Circular
              </label>
            </div>
          </div>
        </div>
      </fieldset> */}
      </aside>
    </>
  );
};

export default ActionBar;
