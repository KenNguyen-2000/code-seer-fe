'use client';

import React, { useEffect, useRef, useState } from 'react';
import FolderTree from '../FolderTree';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import { IDependencyMap } from '@/interfaces/dependency-map.interface';
import { fetchMapById } from '@/redux/thunks/map.thunk';

import styles from './action-bar.module.scss';

const ActionBar = ({ explorer }: any) => {
  const dispatch = useAppDispatch();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dependencyMaps = useAppSelector((state) => state.domain.dependencyMaps);

  const [width, setWidth] = useState(400);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const curMap = useAppSelector((state) => state.mapSlice.map);

  const handleSwitchMap = (mapId: string) => {
    dispatch(fetchMapById(mapId));
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

  return (
    <div
      className=' p-3 bg-light_white flex flex-col gap-3 relative transition ease-out duration-200'
      ref={wrapperRef}
      style={{ width: `${width}px` }}
    >
      <div
        className='absolute right-0 top-0 bottom-0 w-2 bg-transparent hover:cursor-col-resize'
        onMouseDown={handleMouseDown}
      />
      <div className='w-full bg-white rounded-lg py-2 px-3 flex flex-col gap-[10px]'>
        <div className='w-full text-center'>Version</div>
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
                className={`h-10 rounded-[4px] cursor-pointer transition-all duration-200 ${
                  item.id === curMap?.id
                    ? 'bg-md_blue text-white'
                    : 'text-md_blue hover:bg-md_blue hover:text-white'
                }`}
              >
                <button
                  className='w-full flex justify-between p-2 '
                  onClick={handleSwitchMap.bind(null, item.id)}
                >
                  <span>
                    {item.version !== null
                      ? `Version ${item.version.substring(
                          1,
                          item.version.length - 1
                        )}`
                      : `Version 1.0.${index + 1}`}
                  </span>
                  <span>{dateString}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex-grow w-full max-h-[600px] py-2 px-4 bg-white overflow-y-scroll '>
        {explorer.length > 0 && <FolderTree explorer={explorer[0]} />}
      </div>
      <fieldset className='h-[200px] w-full bg-white rounded-lg px-4 py-5'>
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
      </fieldset>
    </div>
  );
};

export default ActionBar;
