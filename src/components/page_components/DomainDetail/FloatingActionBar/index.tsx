'use client';

import { PlusIcon, TagIcon } from '@/components/icons';
import React, { useRef, useState } from 'react';

import styles from './floating-action-bar.module.scss';
import { Node } from 'reactflow';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import { addComment, setActionOnNode } from '@/redux/slices/nodeSlice';
import LabelItem from '../LabelItem';
import { IMapLabel, INodeComment } from '@/interfaces';
import TimeAgo from 'react-timeago';
import { updateMapComments, updateMapLabels } from '@/services/map.service';
import { v4 } from 'uuid';
import {
  addLabel,
  addNodeComment,
  setNodeComments,
  updateLabel,
} from '@/redux/slices/mapSlice';
import useUser from '@/hooks/useUser';
import { addCommentOnNode } from '@/redux/thunks/map.thunk';

interface IFloatingActionBar {
  selectedNode: Node;
}

const FloatingActionBar: React.FC<IFloatingActionBar> = ({ selectedNode }) => {
  const dispatch = useAppDispatch();
  const action = useAppSelector((state) => state.nodeSlice.action);
  const curMap = useAppSelector((state) => state.mapSlice.map)!!;
  const labelListRef = useRef<HTMLUListElement>(null);
  const mapLabels = useAppSelector((state) => state.mapSlice.labels);
  const nodeLabels = useAppSelector((state) => state.mapSlice.nodeLabels);
  const nodeComments = useAppSelector((state) => state.nodeSlice.comments);
  const mapComments: INodeComment[] = useAppSelector(
    (state) => state.mapSlice.nodeComments
  );

  const user: any = useUser();

  const [showComment, setShowComment] = useState(true);
  const [comment, setComment] = useState('');
  const now = new Date();

  const handleAddNewLabel = async () => {
    const newId = v4();
    dispatch(addLabel({ id: newId, color: '#C2C2C2', name: 'New label' }));

    try {
      const newMapLabels = [
        ...mapLabels,
        { id: newId, color: '#C2C2C2', name: 'New label' },
      ];
      const res = await updateMapLabels(
        [newMapLabels, nodeLabels],
        mapComments,
        curMap.id
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeLabel = async (selectedLabel: IMapLabel) => {
    dispatch(updateLabel(selectedLabel));

    try {
      const newMapLabels = [
        ...mapLabels.map((label: IMapLabel) =>
          label.id === selectedLabel.id ? selectedLabel : label
        ),
      ];
      const res = await updateMapLabels(
        [newMapLabels, nodeLabels],
        mapComments,
        curMap.id
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    if (showComment) {
      const newId = v4();
      const newComment = {
        id: newId,
        author: user.login,
        content: comment,
        createdAt: now.toString(),
      };
      let newMapComments: INodeComment[] = mapComments;
      const isExist = mapComments.find(
        (comment) => comment.nodeId === selectedNode.id
      );
      if (isExist) {
        newMapComments = newMapComments.map((ndsCmt: INodeComment) =>
          ndsCmt.nodeId === selectedNode.id
            ? ({
                nodeId: ndsCmt.nodeId,
                comments: [...ndsCmt.comments, newComment],
              } as INodeComment)
            : ndsCmt
        );
      } else {
        newMapComments = [
          ...newMapComments,
          {
            nodeId: selectedNode.id,
            comments: [newComment],
          },
        ];
      }
      dispatch(addComment(newComment));
      dispatch(setNodeComments(newMapComments));

      try {
        // const res = await updateMapComments(
        //   [mapLabels, nodeLabels],
        //   [...newMapComments],
        //   curMap.id
        // );
        const res = await dispatch(
          addCommentOnNode({
            labels: [mapLabels, nodeLabels],
            comments: [...newMapComments],
            mapId: curMap.id,
          })
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
    setComment('');
    setShowComment(!showComment);
  };

  const getActionView = (action: string) => {
    if (action === 'comments') {
      return (
        <>
          <div className='w-full flex flex-col bg-white  border border-light_gray rounded-md'>
            {nodeComments?.map((ndsCmt, index) => {
              const timeStamp = new Date(ndsCmt.createdAt);
              return (
                <>
                  <div key={ndsCmt.id + 'comment'} className='py-1 px-2'>
                    <div className='flex items-center justify-between gap-2 text-sm font-semibold text-dark_blue'>
                      <span>{ndsCmt.author}</span>
                      <span className='text-primary_gray'>
                        <TimeAgo date={timeStamp.getTime()} />
                      </span>
                    </div>
                    <p className='w-full text-base'>{ndsCmt.content}</p>
                  </div>
                  {index !== nodeComments.length - 1 ? (
                    <hr className='border border-solid border-light_gray my-1' />
                  ) : null}
                </>
              );
            })}
          </div>
          {showComment && (
            <div className='py-1 px-2 bg-white border border-light_gray rounded-md'>
              {/* <div className='flex items-center justify-between gap-2 text-sm font-semibold text-dark_blue'>
                <span>idchina1080@gmail.com</span>
                <span className='text-primary_gray'>
                  <TimeAgo date={now.getTime()} />
                </span>
              </div> */}
              <textarea
                className='w-full text-base outline-none border-none'
                placeholder='Say something'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          )}
          <button
            type='button'
            className='flex items-center gap-2 bg-white py-1 px-2 border border-light_gray rounded-md hover:bg-dark_blue hover:text-white'
            onClick={handleAddComment}
          >
            <PlusIcon className='w-5 h-5' />
            <span className='font-medium'>
              {showComment ? 'Comment' : 'Add new comments'}
            </span>
          </button>
        </>
      );
    }

    return (
      <>
        <div className='w-full flex flex-col gap-2 bg-white border border-light_gray rounded-md'>
          <div className='p-3 pb-2 font-semibold text-dark_blue text-sm border-b border-black-50'>
            Map label
          </div>
          <ul ref={labelListRef}>
            {mapLabels?.map((label: IMapLabel, index) => (
              <li key={label.id + 'label'} className={styles.label__item}>
                <LabelItem
                  data={label}
                  changeLabel={handleChangeLabel.bind(null, label)}
                />
              </li>
            ))}
          </ul>
          <button
            type='button'
            className='flex items-center gap-2 bg-white py-3 px-2 group'
            onClick={handleAddNewLabel}
          >
            <span className='group-hover:bg-light_gray p-1 rounded-md'>
              <PlusIcon className='w-5 h-5 ' />
            </span>
            <span className='font-medium'>Add a new label</span>
          </button>
        </div>
      </>
    );
  };

  return (
    <section className={styles.wrapper}>
      <div className='flex gap-3 '>
        <button
          type='button'
          className={`${styles.action__btn} ${
            action === 'comments' ? styles.active : ''
          }`}
          onClick={() => dispatch(setActionOnNode('comments'))}
        >
          Comments
        </button>
        <button
          type='button'
          className={`${styles.action__btn} ${
            action === 'label' ? styles.active : ''
          }`}
          onClick={() => dispatch(setActionOnNode('label'))}
        >
          Label
        </button>
      </div>
      {getActionView(action)}
    </section>
  );
};

export default FloatingActionBar;
