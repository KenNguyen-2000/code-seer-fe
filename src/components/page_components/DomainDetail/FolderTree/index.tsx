'use client';

import {
  EyeClosedIcon,
  EyeFilledIcon,
  FileCodeIcon,
  FolderIcon,
  TypescriptFileIcon,
} from '@/components/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Edge, Node, getIncomers, useReactFlow } from 'reactflow';

const FolderTree = ({ explorer, parentVisible = true }: any) => {
  const [isExpand, setIsExpand] = useState(false);
  const [visible, setVisible] = useState(parentVisible);

  const reactflowInstance = useReactFlow();

  const getIcon = () => {
    if (!explorer.name.includes('.')) {
      return <FolderIcon className='w-6 h-6' />;
    }
    return explorer.name.split('.').includes('ts') ? (
      <TypescriptFileIcon className='w-6 h-6' />
    ) : (
      <FileCodeIcon className='w-6 h-6' />
    );
  };

  const changeNodeHidden = useCallback(
    (nodeId: string) => {
      const node: Node | undefined = reactflowInstance.getNode(nodeId);
      if (!node) {
        return;
      }
      // Hide node
      const nodes: Node[] = reactflowInstance.getNodes().map((item: Node) => {
        if (item.id === node.id) {
          return {
            ...node,
            hidden: !node.hidden,
          };
        }

        return item;
      });
      reactflowInstance.setNodes(nodes);
    },
    [reactflowInstance]
  );

  const changeEdgesHiddenState = useCallback(
    (nodeId: string) => {
      const node: Node | undefined = reactflowInstance.getNode(nodeId);
      if (!node) {
        return;
      }
      // Hide edges
      const incomingEdges = reactflowInstance
        .getEdges()
        .filter(
          (edge: Edge) => edge.source === node.id || edge.target === node.id
        );

      const otherEdges = reactflowInstance
        .getEdges()
        .filter(
          (edge: Edge) => edge.source !== node.id && edge.target !== node.id
        );

      reactflowInstance.setEdges([
        ...otherEdges,
        ...incomingEdges.map((edge: Edge) => ({
          ...edge,
          hidden: !edge.hidden,
        })),
      ]);
    },
    [reactflowInstance]
  );

  const handleShowHideNode = useCallback(() => {
    setVisible(!visible);
    changeNodeHidden(explorer.name);
    changeEdgesHiddenState(explorer.name);
  }, [changeEdgesHiddenState, changeNodeHidden, explorer.name, visible]);

  const getText = (text: string) =>
    text.includes('.') ? text.split('/')[text.split('/').length - 1] : text;

  useEffect(() => {
    setVisible(parentVisible);
  }, [parentVisible]);

  return (
    <section>
      <div className='w-full flex justify-between items-center gap-2'>
        <button
          type='button'
          className='flex flex-grow items-center font-medium gap-2 my-1 text-ellipsis overflow-hidden whitespace-nowrap hover:text-primary_blue '
          style={{
            opacity: !visible ? '0.5' : '',
          }}
          onClick={() => setIsExpand(!isExpand)}
        >
          <span className='flex-shrink'>{getIcon()}</span>
          <span className='text-ellipsis overflow-hidden'>
            {getText(explorer.name)}
          </span>
        </button>
        {visible ? (
          <EyeFilledIcon
            onClick={handleShowHideNode}
            className='w-6 h-6 text-inherit'
          />
        ) : (
          <EyeClosedIcon
            onClick={handleShowHideNode}
            className='w-6 h-6 text-inherit'
          />
        )}
      </div>
      <div
        className={`ml-4 max-h-0 transition-all ease-in-out duration-300 overflow-hidden `}
        style={{
          maxHeight: isExpand ? '1000px' : '0',
        }}
      >
        {!explorer.name.includes('.') &&
          explorer?.children?.map((child: any, index: number) => (
            <FolderTree
              explorer={child}
              key={explorer.name + index}
              parentVisible={visible}
            />
          ))}
      </div>
    </section>
  );
};

export default FolderTree;
