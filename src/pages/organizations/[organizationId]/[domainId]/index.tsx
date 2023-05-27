'use client';

/* eslint-disable no-loop-func */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addEdge,
  Background,
  Controls,
  Edge,
  getConnectedEdges,
  getIncomers,
  MarkerType,
  MiniMap,
  Node,
  NodeTypes,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';

import {
  ActionBar,
  FloatingActionBar,
  CustomNode,
  FloatingConnectionLine,
  FloatingEdge,
  ButtonOutline,
  Loader,
} from '@/components';
import './dependency-map.module.scss';
import {
  ChevronRight,
  CircleChevronRight,
  ClipboardText,
} from '@/components/icons';
import { useRouter } from 'next/router';
import {
  retrieveMaps,
  retrieveWorkflowById,
  retrieveWorkflows,
  runWorkflow,
} from '@/services/domain.service';
import {
  getFourCornPos,
  getChildrenBiggestSize,
  generateInitSetup,
  getAllPosibleEdge,
  getAllChildNodes,
} from '@/utils/code-maps/helpers';
import { IMainData } from '@/utils/code-maps/helpers.interface';
import PrivateRoute from '@/components/common/PrivateRoute';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import { toast } from 'react-toastify';
import { setDependencyMaps } from '@/redux/slices/domainSlice';
import { IDomain, IWorkflow } from '@/interfaces/domain.interface';
import { IOrganization } from '@/interfaces';
import useUser from '@/hooks/useUser';
import Link from 'next/link';

const padding = 10;
const gap = 10;
const iconSize = 24;

// const nodeTypes = {
//   selectorNode: CustomNode,
// };
// const edgeTypes = {
//   floating: FloatingEdge,
// };

function Codebase() {
  const router = useRouter();
  const { domainId } = router.query;

  const dispatch = useAppDispatch();
  const domain: IDomain | undefined = useAppSelector(
    (state) => state.domain.domain
  );
  const organization: IOrganization | undefined = useAppSelector(
    (state) => state.organizationSlice.organization
  );

  const user: any = useUser();

  const [mapData, setMapData] = useState<IMainData>({ nodes: [], edges: [] });
  const [explorer, setExplorer] = useState<any[]>([]);
  const [depMaps, setDepMaps] = useState([]);
  const [workflowRunning, setWorkflowRunning] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      selectorNode: CustomNode,
    }),
    []
  );
  const edgeTypes = useMemo(
    () => ({
      floating: FloatingEdge,
    }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const reactFlowInstance = useReactFlow();

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  /** *************Click Event********** */
  const createNewEdges = (selectedNode: Node, newNodes: Node[]) => {
    const allNodes = nodes
      .concat(newNodes)
      .filter(
        (n: Node) => n.id !== selectedNode.id && n.data.isExpand !== true
      );

    const possibleConnections = mapData.edges.filter((ed: any) =>
      allNodes.find((fN) => ed.from.includes(`/${fN.id}`) || ed.from === fN.id)
    );

    const egdesMap = new Map<string, Edge>();

    allNodes.forEach((node: Node) => {
      const exactConnections = possibleConnections.filter(
        (pC: any) => pC.from === node.id || pC.from.split('/').includes(node.id)
      );

      return exactConnections.forEach((exactConnect) => {
        if (node.id.includes('.')) {
          if (exactConnect.from === node.id) {
            const isTargetVisible = allNodes.find(
              (n) => n.id === exactConnect.to
            );
            const source = node.id;
            const target = isTargetVisible
              ? isTargetVisible.id
              : allNodes.find((n) =>
                  exactConnect.to.split('/').includes(n.id)
                )!!.id;

            const edgeData = {
              id: `${source}~${exactConnect.to}`,
              source: source,
              target: target,
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            };

            egdesMap.set(edgeData.id, edgeData);
          }
        } else {
          if (exactConnect.from.split('/').includes(node.id)) {
            const isTargetVisible = allNodes.find(
              (n) => n.id === exactConnect.to
            );
            const source = node.id;
            const target = isTargetVisible
              ? isTargetVisible.id
              : allNodes.find((n) =>
                  exactConnect.to.split('/').includes(n.id)
                )!!.id;
            const edgeData: Edge = {
              id: `${source}~${target}`,
              source: source,
              target: target as string,
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            };
            if (source !== target) {
              egdesMap.set(edgeData.id, edgeData);
            }
          }
        }
      });
    });

    let trueEdges: Edge[] = [];

    egdesMap.forEach((value, key, egdesMap) => {
      trueEdges.push(value);
    });

    reactFlowInstance.setEdges(trueEdges);
  };

  const createNewNodes = (parentNode: Node) => {
    const { dummyWidth } = getChildrenBiggestSize(parentNode);
    const numOfRow = Math.ceil(Math.sqrt(parentNode.data.children.length));
    const numOfCol = Math.ceil(Math.sqrt(parentNode.data.children.length));

    let prevNode: any = undefined;

    const newNodes = parentNode.data.children.map((cN: any, index: number) => {
      const nodeData = {
        id: cN.name,
        position: {
          x: (index % numOfRow) * (dummyWidth + gap) + padding,
          y:
            parentNode.height!! +
            gap +
            Math.floor(index / numOfCol) * (parentNode.height!! + gap),
        },
        type: 'selectorNode',
        data: !cN.name.includes('.')
          ? {
              label: cN.name,
              children: cN.children ? cN.children : undefined,
              depth: parentNode.data.depth + 1,
              isExpand: false,
            }
          : {
              label: cN.name,
              ...mapData.nodes.find((n: any) => n.source.includes(cN.name)),
              depth: parentNode.data.depth + 1,
            },
        style: {
          border: '1px solid black',
          borderRadius: '8px',
          zIndex: 1000 + parentNode.data.depth + 1,
        },
        parentNode: parentNode.id,

        extent: 'parent',
      };

      return nodeData;
    });
    if (!parentNode.id.includes('.')) {
      createNewEdges(parentNode, newNodes);
    }
    reactFlowInstance.addNodes(newNodes);
  };

  const rearangedNode = (
    selectedNode: Node,
    growingHeight: any,
    growingWidth: any
  ) => {
    const passingNode = {
      ...selectedNode,
      width: selectedNode.width + growingWidth,
      height: selectedNode.height + growingHeight,
    };

    if (selectedNode.data.depth === 0) {
      return;
    }

    const sameLevelNodes = nodes.filter(
      (n: Node) => n.data.depth === selectedNode.data.depth
    );

    setNodes((prev) =>
      prev.map((nds) => {
        const exactNodes = sameLevelNodes.find(
          (n) => n.id === nds.id && n.id !== selectedNode.id
        );
        if (exactNodes) {
          const isSameParent = selectedNode.parentNode === nds.parentNode;
          if (isSameParent) {
            const trarverseX = nds.position.x + growingWidth;
            const trarverseY = nds.position.y + growingHeight;

            const sourceLeft = selectedNode.position.x;
            const targetLeft = nds.position.x;
            const sourceTop = selectedNode.position.y;
            const targetTop = nds.position.y;

            if (targetTop > sourceTop && targetLeft >= sourceLeft) {
              return {
                ...nds,
                position: {
                  x: targetLeft,
                  y: trarverseY,
                },
              };
            }
            if (targetTop === sourceTop && targetLeft > sourceLeft) {
              return {
                ...nds,
                position: {
                  x: trarverseX,
                  y: targetTop,
                },
              };
            }

            if (targetTop < sourceTop && targetLeft >= sourceLeft) {
              const nodeCorners = getFourCornPos(nds);
              if (nodeCorners.bottomLeft.y >= sourceTop) {
                return {
                  ...nds,
                  position: {
                    x: trarverseX,
                    y: targetTop,
                  },
                };
              }
            }

            if (targetTop > sourceTop && targetLeft < sourceLeft) {
              const nodeCorners = getFourCornPos(passingNode);
              if (
                nodeCorners.bottomLeft.y >= targetTop &&
                nodeCorners.bottomLeft.x < targetLeft + nds.width!!
              ) {
                return {
                  ...nds,
                  position: {
                    x: nds.position.x,
                    y: trarverseY,
                  },
                };
              }
            }
            return nds;
          }
          return nds;
        }
        return nds;
      })
    );

    rearangedNode(
      nodes.find((n) => n.id === selectedNode.parentNode)!!,
      growingHeight,
      growingWidth
    );
  };

  const resizeParentNode = (
    node: Node,
    parentNode: Node,
    expandWidth: any,
    expandHeight: any
  ) => {
    // const realWidth = expandWidth - (parentNode.width!! - node.position.x) + 10;

    let rightMost = node;

    const sameLevelNodes = nodes.filter(
      (n: Node) => n.data.depth === node.data.depth
    );

    sameLevelNodes.forEach((item) => {
      if (
        item.position.y === node.position.y ||
        Math.abs(item.position.y - node.position.y) < item.width!! ||
        Math.abs(item.position.y - node.position.y) < node.width!!
      ) {
        if (item.position.x > rightMost.position.x) {
          rightMost = item;
        }
      }
    });

    const realWidth = -(
      parentNode.width!! -
      rightMost.position.x -
      expandWidth -
      rightMost.width!! -
      10
    );

    setNodes((prev) =>
      prev.map((nds: Node) => {
        if (nds.id === parentNode.id) {
          return {
            ...nds,
            width: realWidth > 0 ? nds.width!! + realWidth : nds.width,
            height: nds.height!! + expandHeight,
            style: {
              ...nds.style,
              width: realWidth > 0 ? nds.width!! + realWidth : nds.width!!,
              height: nds.height!! + expandHeight,
            },
          };
        }
        return nds;
      })
    );

    if (parentNode.data.depth === 0) {
      return;
    }
    const grandParent = nodes.find(
      (n: Node) => n.id === parentNode.parentNode
    )!!;
    if (grandParent) {
      resizeParentNode(
        parentNode,
        grandParent,
        realWidth + parentNode.width!!,
        expandHeight
      );
    }
  };

  const expandNode = async (node: Node) => {
    const { dummyWidth } = getChildrenBiggestSize(node);
    const numElOnRow = Math.ceil(Math.sqrt(node.data.children.length));
    const numElOnCol = Math.ceil(node.data.children.length / numElOnRow);

    const growthHeight = (node.height!! + gap) * (numElOnCol + 1) + padding;
    const growthWidth =
      (gap + dummyWidth) * numElOnRow + padding * 3 + iconSize;
    const parentNode = nodes.find((n: Node) => n.id === node.parentNode)!!;

    setNodes((prev) =>
      prev.map((nds) => {
        if (nds.id === node.id) {
          return {
            ...nds,
            width: growthWidth,
            height: growthHeight,
            style: {
              ...nds.style,

              width: growthWidth,
              height: growthHeight,
            },

            data: {
              ...nds.data,
              isExpand: true,
            },
          };
        }
        return nds;
      })
    );

    await rearangedNode(
      node,
      growthHeight - node.height!!,
      growthWidth - node.width!!
    );

    if (parentNode) {
      resizeParentNode(
        node,
        parentNode,
        growthWidth - node.width!!,
        growthHeight - node.height!!
      );
    }
  };

  const handleHightLightEdges = (node: Node) => {
    let incomerEdges = getConnectedEdges([node], edges);
    if (!node.id.includes('.')) {
      incomerEdges = getConnectedEdges(getAllChildNodes(node, nodes), edges);
    }
    // console.log('Hight light Edges', incomerEdges);
    setEdges((prev) =>
      prev.map((edge: Edge) => {
        const exactEdge = incomerEdges.find((e) => e.id === edge.id);
        if (exactEdge) {
          return {
            ...exactEdge,
            style: {
              ...exactEdge.style,
              strokeWidth: 1.5,
              stroke: '#333',
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#333',
            },
          };
        }

        return {
          ...edge,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#33333361',
          },
          style: {
            strokeWidth: 1,
            stroke: '#33333361',
          },
        };
      })
    );
  };

  const onNodeClick = async (event: any, node: Node) => {
    console.log('Edges', edges);

    if (node.data.label.includes('.')) {
      handleHightLightEdges(node);
    } else {
      if (!node.data.isExpand) {
        expandNode(node);
        createNewNodes(node);
      } else {
        handleHightLightEdges(node);
      }
    }
  };

  /** *************Drag Event********** */
  const handleNodeDrag = () => {};

  /**     *******Services*********      */
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

    if (workflow.status !== 'completed') {
      setTimeout(() => {
        handleGetWorkflow({
          owner,
          repository,
          githubToken: githubToken,
          workflowId: workflowId,
        });
      }, 30000);
    }

    return workflow;
  };

  const handleTrackingWorkflow = async () => {
    if (domain) {
      try {
        const owner = domain.repository.split('/')[0];
        const repository = domain.repository.split('/')[1];
        const res = await retrieveWorkflows({
          owner,
          repository,
          githubToken: user.githubToken,
        });
        setWorkflowRunning(true);

        const { workflow_runs } = res;
        const in_progress_workflows = workflow_runs.filter(
          (workflow_run: any) => workflow_run.status !== 'completed'
        );

        if (in_progress_workflows.length > 0) {
          const workflow = await handleGetWorkflow({
            owner,
            repository,
            githubToken: user.githubToken,
            workflowId: in_progress_workflows[0].id,
          });
          if (workflow.status === 'completed') setWorkflowRunning(false);
        }
        setWorkflowRunning(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRunWorkflow = async () => {
    try {
      const owner = domain?.repository.split('/')[0] as string;
      const repository = domain?.repository.split('/')[1] as string;
      const res = await runWorkflow({ owner, repository });
      console.log(res);
      if (res.success) {
        toast.success('Run workflow success');
        setShowRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const res = await retrieveMaps(domainId as string);
        dispatch(setDependencyMaps(res.data));
        setDepMaps(res.data);
        if (res.data.length > 0) {
          const { initialNodes, initialEdges, explorer, mainData } =
            generateInitSetup(JSON.parse(res.data[0].payload));

          setNodes(initialNodes);
          setEdges(initialEdges);
          setExplorer(explorer);
          setMapData(mainData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (domainId) fetchMaps();
  }, [dispatch, domainId, setEdges, setNodes]);

  if (workflowRunning)
    return (
      <div className='w-full h-screen flex justify-between items-center'>
        <h1>Loading....</h1>
        {/* <Loader /> */}
      </div>
    );

  return (
    <div className='w-full h-screen flex overflow-hidden'>
      <ActionBar explorer={explorer} />
      <div className='flex-grow w-full h-full flex flex-col relative'>
        <div className='px-7 py-6 flex justify-between bg-[#F7F8FA] border-b-2 border-[#E3E3E3] drop-shadow-md'>
          <div className='flex gap-3 text-lg font-semibold'>
            <span className='text-md_blue'>
              {organization ? organization.organization.name : 'Organization'}
            </span>
            <ChevronRight className='text-md_blue' />
            <span className='text-primary_gray'>
              {domain ? domain.name : 'Domain Name'}
            </span>
            <ChevronRight className='text-md_blue' />
            <span className='text-primary_blue'>
              {domain
                ? domain.repository
                : 'Kennguyen2000/facebook-instagram-mobile'}
            </span>
          </div>
          <ClipboardText className='text-dark_blue_2 cursor-pointer' />
        </div>
        {depMaps.length === 0 ? (
          <div className='flex flex-col grow w-full h-screen justify-center items-center relative'>
            <ButtonOutline className='rounded-md' onClick={handleRunWorkflow}>
              Run work flow
            </ButtonOutline>
            {showRedirect && (
              <Link
                href={`https://github.com/${domain?.repository.split('/')[0]}/${
                  domain?.repository.split('/')[1]
                }/actions`}
                className='hover:underline py-2'
              >
                View workflow progress
              </Link>
            )}
          </div>
        ) : (
          <div className='flex grow w-full h-screen relative'>
            <FloatingActionBar />
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              connectionLineComponent={FloatingConnectionLine}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              onNodeClick={onNodeClick}
              onNodeDrag={handleNodeDrag}
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </div>
        )}
      </div>
    </div>
  );
}

export default Codebase;

Codebase.getLayout = function getLayout(page: any) {
  return <PrivateRoute>{page}</PrivateRoute>;
};
