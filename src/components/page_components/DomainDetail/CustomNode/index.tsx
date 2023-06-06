import { FileCodeIcon, FolderIcon } from '@/components/icons';
import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import FloatingButtons from '../FloatingButtons';

function CustomNode(props: NodeProps) {
  const { data, isConnectable, selected } = props;

  const handleCollapseNode = () => {
    if (data.isExpand) {
    }
  };

  return (
    <div className='w-fit  text-black px-[10px] rounded-lg '>
      {/* <NodeResizer minWidth={160} minHeight={30} /> */}
      <Handle
        type='target'
        position={Position.Left}
        style={{ background: '#555', visibility: 'hidden' }}
        onConnect={(params: any) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div
        className='flex flex-col w-fit h-fit cursor-pointer'
        onClick={handleCollapseNode}
      >
        <div className='label flex items-center justify-center text-black relative z-[3000]'>
          {data.label.includes('.') ? (
            <span className='flex items-center'>
              <FileCodeIcon className='w-5 h-auto mr-1' />
              {data.label.split('/')[data.label.split('/').length - 1]}
            </span>
          ) : (
            <span className='flex items-center'>
              <FolderIcon className='w-5 h-auto mr-1' />
              {data.label}
            </span>
          )}
        </div>
        {data.label ? (
          selected && data.label.includes('.') ? (
            <FloatingButtons isShow={true} />
          ) : null
        ) : null}
      </div>
      <Handle
        type='source'
        position={Position.Right}
        style={{ background: '#555', visibility: 'hidden' }}
        onConnect={(params: any) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomNode;
