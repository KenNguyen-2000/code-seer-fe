import React, { useState } from 'react';

import styles from './FloatingButtons.module.scss';
import { BrandSafariIcon, MessageIcon, TagIcon } from '@/components/icons';
import { clearLabel, setActionOnNode } from '@/redux/slices/nodeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import { Node, useReactFlow } from 'reactflow';
import { IMapLabel, INodeLabel } from '@/interfaces';
import { updateMapLabels } from '@/services/map.service';
import { addNodeLabels } from '@/redux/slices/mapSlice';

interface IFloatingButtons {
  isShow: boolean;
}

const FloatingButtons: React.FC<IFloatingButtons> = ({ isShow }) => {
  const dispatch = useAppDispatch();
  const labelsData = useAppSelector((state) => state.mapSlice.labels);
  const nodeLabels = useAppSelector((state) => state.mapSlice.nodeLabels);
  const selectedNode = useAppSelector(
    (state) => state.nodeSlice.selectedNode
  )!!;
  const curMap = useAppSelector((state) => state.mapSlice.map)!!;
  const nodeComments = useAppSelector((state) => state.nodeSlice.comments);
  const mapComments = useAppSelector((state) => state.mapSlice.nodeComments);

  const [showLabelsView, setShowLabelsView] = useState(false);

  const reactflowInstances = useReactFlow();

  const handleLabelNode = async (label: IMapLabel) => {
    const newNodeLabel: INodeLabel = { [selectedNode.id]: label };

    try {
      const res = await updateMapLabels(
        [labelsData, { ...nodeLabels, ...newNodeLabel }],
        mapComments,
        curMap.id
      );
      if (res.success) {
        dispatch(addNodeLabels(newNodeLabel));
        reactflowInstances.setNodes(
          reactflowInstances.getNodes().map((node: Node) => {
            if (node.id === selectedNode.id) {
              return {
                ...selectedNode,
                style: {
                  ...selectedNode.style,
                  background: label.color,
                },
              };
            }

            return node;
          })
        );
      }
    } catch (error) {}
    setShowLabelsView(false);
  };

  const handleClearLabel = async () => {
    dispatch(clearLabel());

    try {
      const nodeLabelsData = Object.keys(nodeLabels).reduce(
        (result: INodeLabel, key: string) => {
          if (key !== selectedNode.id) {
            result[key] = nodeLabels[key];
          }

          return result;
        },
        {} as INodeLabel
      );

      const res = await updateMapLabels(
        [labelsData, nodeLabelsData],
        nodeComments,
        curMap.id
      );

      if (res.success) {
        reactflowInstances.setNodes(
          reactflowInstances.getNodes().map((node: Node) => {
            if (node.id === selectedNode.id) {
              return {
                ...selectedNode,
                style: {
                  ...selectedNode.style,
                  background: '',
                },
              };
            }

            return node;
          })
        );
      }
    } catch (error) {}
    setShowLabelsView(false);
  };

  const getLabelsView = () => {
    return showLabelsView ? (
      <div className={styles.labels__wrapper}>
        <h2
          className={
            styles.labels__title + ' text-sm font-medium text-neutral-500'
          }
        >
          Label selection and contents
        </h2>
        {labelsData?.map((label: IMapLabel) => (
          <button
            key={label.id}
            className={styles.labels__item__btn}
            onClick={() => handleLabelNode(label)}
          >
            <span className='flex items-center gap-2'>
              <span
                className='w-5 h-4 rounded-md block mr-2'
                style={{ background: label.color }}
              ></span>
              <span className='font-medium'>{label.name}</span>
            </span>
          </button>
        ))}
        <hr className='boreder border-light_gray border-solid my-2' />
        <button className={styles.labels__item__btn}>
          <span className='font-medium'>Add new label</span>
        </button>
        <button className={styles.labels__item__btn} onClick={handleClearLabel}>
          <span className='font-medium'>Clear label</span>
        </button>
      </div>
    ) : null;
  };

  if (!isShow) return null;
  return (
    <div className={styles.wrapper}>
      <div className={styles.action__list}>
        <button
          className={styles.action__list__item}
          onClick={() => {
            dispatch(setActionOnNode('label'));
            setShowLabelsView(!showLabelsView);
          }}
        >
          <TagIcon />
        </button>
        {getLabelsView()}
        <button
          className={styles.action__list__item}
          onClick={() => dispatch(setActionOnNode('comments'))}
        >
          <MessageIcon />
        </button>

        <button className={styles.action__list__item}>
          <BrandSafariIcon />
        </button>
      </div>
    </div>
  );
};

export default FloatingButtons;
