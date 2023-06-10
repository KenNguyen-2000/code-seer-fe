'use client';

/* eslint-disable no-loop-func */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  MarkerType,
  MiniMap,
  Node,
  NodeDragHandler,
  NodeTypes,
  Panel,
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
  FloatingButtons,
  Loader,
  ButtonFilled,
  Layout,
} from '@/components';
import './dependency-map.module.scss';
import {
  ChevronRight,
  CircleChevronRight,
  ClipboardText,
} from '@/components/icons';
import { useRouter } from 'next/router';
import {
  retrieveADomain,
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
import { setDependencyMaps, setDomain } from '@/redux/slices/domainSlice';
import { IDomain, IWorkflow } from '@/interfaces/domain.interface';
import { IDependencyMap, IOrganization } from '@/interfaces';
import useUser from '@/hooks/useUser';
import Link from 'next/link';
import Script from 'next/script';
import { setSelectedNode } from '@/redux/slices/nodeSlice';
import {
  setCurMap,
  setLabels,
  setNodeLabels,
  updateCurrentMapState,
} from '@/redux/slices/mapSlice';
import { retrieveAnOrganization } from '@/services/organization.service';
import { setOrganization } from '@/redux/slices/organizationSlice';
import { fetchDepMaps } from '@/redux/thunks/map.thunk';
import { fetchAnOrganization } from '@/redux/thunks/organization.thunk';
import { fetchDomainById } from '@/redux/thunks/domain.thunk';
import Head from 'next/head';
import styles from './dependency-map.module.scss';
import InputModal from '@/components/common/InputModal';

const padding = 20;
const gap = 25;
const iconSize = 24;

function Codebase() {
  const router = useRouter();
  const { domainId, organizationId } = router.query;

  const user: any = useUser();

  const dispatch = useAppDispatch();
  const domain: IDomain | undefined = useAppSelector(
    (state) => state.domain.domain
  );
  const organization: IOrganization | undefined = useAppSelector(
    (state) => state.organizationSlice.organization
  );
  const selectedNode: Node | undefined = useAppSelector(
    (state) => state.nodeSlice.selectedNode
  );
  const curMap: IDependencyMap | undefined = useAppSelector(
    (state) => state.mapSlice.map
  );
  const curDepMaps: IDependencyMap[] = useAppSelector(
    (state) => state.domain.dependencyMaps
  );
  const isMapLoading: boolean = useAppSelector(
    (state) => state.mapSlice.isLoading
  );

  const currentState = useAppSelector((state) => state.mapSlice.currentState);

  const isDomainLoading = useAppSelector((state) => state.domain.isLoading);

  const [mapData, setMapData] = useState<IMainData>({ nodes: [], edges: [] });
  const [explorer, setExplorer] = useState<any[]>([]);
  const [workflowRunning, setWorkflowRunning] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [floatingBtns, setFloatingBtns] = useState({
    isShown: false,
    position: {
      x: 0,
      y: 0,
    },
  });

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
  const createNewEdges = useCallback(
    (selectedNode: Node, newNodes: Node[]) => {
      const allNodes = nodes
        .concat(newNodes)
        .filter(
          (n: Node) => n.id !== selectedNode.id && n.data.isExpand !== true
        );

      const possibleConnections = mapData.edges.filter((ed: any) =>
        allNodes.find(
          (fN) => ed.from.includes(`/${fN.id}`) || ed.from === fN.id
        )
      );

      const egdesMap = new Map<string, Edge>();

      allNodes.forEach((node: Node) => {
        const exactConnections = possibleConnections.filter(
          (pC: any) =>
            pC.from === node.id || pC.from.split('/').includes(node.id)
        );

        return exactConnections.forEach((exactConnect, index) => {
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

              const edgeData: Edge = {
                id: `${source}~${exactConnect.to}`,
                source: source,
                target: target,
                type: 'floating',
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
                type: 'floating',
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
    },
    [mapData.edges, nodes, reactFlowInstance]
  );

  const createNewNodes = useCallback(
    (parentNode: Node) => {
      const { dummyWidth } = getChildrenBiggestSize(parentNode);
      const numOfRow = Math.ceil(Math.sqrt(parentNode.data.children.length));
      const numOfCol = Math.ceil(Math.sqrt(parentNode.data.children.length));

      let prevNode: any = undefined;

      const newNodes: Node[] = parentNode.data.children.map(
        (cN: any, index: number) => {
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
              zIndex: 1000 + (parentNode.data.depth + 1) * 100 - index,
              background: cN.data
                ? cN.data.labelData
                  ? cN.data.labelData.color
                  : ''
                : '',
            },
            parentNode: parentNode.id,

            // extent: 'parent',
          };

          return nodeData;
        }
      );
      if (!parentNode.id.includes('.')) {
        createNewEdges(parentNode, newNodes);
      }
      reactFlowInstance.addNodes(newNodes);
    },
    [createNewEdges, mapData.nodes, reactFlowInstance]
  );

  const rearangedNode = useCallback(
    (selectedNode: Node, growingHeight: any, growingWidth: any) => {
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
    },
    [nodes, setNodes]
  );

  const resizeParentNode = useCallback(
    (node: Node, parentNode: Node, expandWidth: any, expandHeight: any) => {
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
    },
    [nodes, setNodes]
  );

  const expandNode = useCallback(
    async (node: Node) => {
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
    },
    [nodes, rearangedNode, resizeParentNode, setNodes]
  );

  const handleHightLightEdges = useCallback(
    (node: Node) => {
      let incomerEdges = getConnectedEdges([node], edges);
      if (!node.id.includes('.')) {
        incomerEdges = getConnectedEdges(getAllChildNodes(node, nodes), edges);
      }
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
              // color: '#33333361',
              color: 'transparent',
            },
            style: {
              strokeWidth: 1,
              // stroke: '#33333361',
              stroke: 'transparent',
            },
          };
        })
      );
    },
    [edges, nodes, setEdges]
  );

  const handleHightLightNodes = useCallback(
    (node: Node) => {
      let incommerNodes = getIncomers(node, nodes, edges);
      let outgoersNodes = getOutgoers(node, nodes, edges);
      let arr = new Map();
      if (!node.id.includes('.')) {
        const children = getAllChildNodes(node, nodes);

        [node, ...children].forEach((n: Node) => {
          [
            n,
            ...getIncomers(n, nodes, edges),
            ...getOutgoers(n, nodes, edges),
          ].forEach((nds: Node) => {
            if (!arr.has(nds.id)) {
              arr.set(nds.id, nds);
            }
          });
        });
      } else {
        [
          ...getIncomers(node, nodes, edges),
          ...getOutgoers(node, nodes, edges),
          node,
        ].forEach((nds: Node) => {
          if (!arr.has(nds.id)) {
            arr.set(nds.id, nds);
          }
        });
      }

      const nodeArr = [...incommerNodes, ...outgoersNodes, node];
      setNodes((prev) =>
        prev.map((n: Node, index, array) => {
          const exactNode = arr.get(n.id);
          if (exactNode) {
            return {
              ...exactNode,
              style: {
                ...exactNode.style,
                opacity: 1,
              },
            };
          }

          return {
            ...n,
            style: {
              ...n.style,
              opacity: 0.5,
            },
          };
        })
      );
    },

    [edges, nodes, setNodes]
  );

  const onNodeClick = useCallback(
    async (event: any, node: Node) => {
      const { pageX, pageY, clientX, clientY } = event;
      dispatch(setSelectedNode(node));
      if (node.data.label.includes('.')) {
        handleHightLightEdges(node);
        handleHightLightNodes(node);
        setFloatingBtns({
          isShown: true,
          position: {
            x: clientX,
            y: clientY,
          },
        });
      } else {
        if (!node.data.isExpand) {
          expandNode(node);
          createNewNodes(node);
        } else {
          handleHightLightEdges(node);
          handleHightLightNodes(node);
        }
      }
    },
    [
      createNewNodes,
      dispatch,
      expandNode,
      handleHightLightEdges,
      handleHightLightNodes,
    ]
  );

  /** *************Drag Event********** */
  const handleChangeSize = useCallback(
    (node: Node, dx: number, dy: number) => {
      setNodes((prev) =>
        prev.map((n: Node) =>
          n.id === node.id
            ? {
                ...node,
                width: node.width!! + Math.abs(dx),
                height: node.height!! + Math.abs(dy),
                style: {
                  ...node.style,
                  width: node.width!! + Math.abs(dx),
                  height: node.height!! + Math.abs(dy),
                },
                position: {
                  x: dx < 0 ? node.position.x + dx : node.position.x,
                  y: dy < 0 ? node.position.y + dy : node.position.y,
                },
              }
            : n
        )
      );
    },
    [setNodes]
  );

  const handleNodeDrag = useCallback(
    (event: any, node: Node) => {
      const nodeRight = node.position.x + node.width!!;
      const nodeLeft = node.position.x;
      const nodeTop = node.position.y;
      const nodeBottom = node.position.y + node.height!!;

      const parentNode = nodes.find((n: Node) => n.id === node.parentNode);

      if (parentNode) {
        let dx = 0;
        let dy = 0;

        if (nodeRight > parentNode.width!!) {
          dx = nodeRight - parentNode.width!!;
        }

        if (nodeBottom > parentNode.height!!) {
          dy = nodeBottom - parentNode.height!!;
        }

        if (nodeLeft < 0) {
          dx = nodeLeft;
        }

        if (nodeTop < 0) {
          dy = nodeTop;
        }
        handleChangeSize(parentNode, dx, dy);
      }
    },
    [handleChangeSize, nodes]
  );

  /**     *******Services*********      */
  const handleSaveTempMap = useCallback(() => {
    localStorage.setItem(
      `codeseer_map_${curMap?.id}`,
      JSON.stringify({
        nodes: nodes,
        edges: edges,
      })
    );

    dispatch(updateCurrentMapState([nodes, edges]));
  }, [curMap?.id, dispatch, edges, nodes]);

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
    if (domain) {
      try {
        const owner = domain.domain.repository.split('/')[0];
        const repository = domain.domain.repository.split('/')[1];
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
        console.log('workflow runs: ', workflow_runs);
        console.log('Inprogress', in_progress_workflows);

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
        setWorkflowRunning(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRunWorkflow = async (version: string) => {
    console.log('Hello ');
    try {
      const owner = domain?.domain.repository.split('/')[0] as string;
      const repository = domain?.domain.repository.split('/')[1] as string;
      const res = await runWorkflow({ owner, repository, version });
      if (res.success) {
        toast.success('Run workflow success! Please wait for redirect!');
        setTimeout(() => {
          const aLink = document.createElement('a');
          aLink.href = `https://github.com/${owner}/${repository}/actions`;
          aLink.target = '_blank';
          aLink.rel = 'noopener noreferrer';
          aLink.style.position = 'absolute';
          aLink.style.visibility = 'invisible';

          document.body.appendChild(aLink);
          aLink.click();
          document.body.removeChild(aLink);
          handleTrackingWorkflow();
        }, 15000);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.error.name);
    }
  };

  useEffect(() => {
    if (curMap) {
      const { initialNodes, initialEdges, explorer, mainData } =
        generateInitSetup(JSON.parse(curMap.payload));

      const codeSeerMap = JSON.parse(
        localStorage.getItem(`codeseer_map_${curMap.id}`) as string
      );

      if (codeSeerMap) {
        const nodesData = codeSeerMap.nodes;
        const edgesData = codeSeerMap.edges;

        if (nodesData.length > 0) setNodes(nodesData);
        else setNodes(initialNodes);

        if (edgesData.length > 0) setEdges(edgesData);
        else setEdges(initialEdges);
      } else {
        setNodes(initialNodes);
        setEdges(initialEdges);
      }
      setExplorer(explorer);
      setMapData(mainData);

      const el = document.querySelector('.react-flow__edges');
    }
  }, [curMap, currentState, setEdges, setNodes]);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        dispatch(fetchDepMaps(domainId as string));
        dispatch(fetchDomainById(domainId as string));
        if (!organization)
          dispatch(fetchAnOrganization(organizationId as string));
      } catch (error) {
        console.log(error);
      }
    };
    if (domainId && organizationId) fetchMaps();
  }, [dispatch, domainId, organization, organizationId]);

  if (workflowRunning)
    return (
      <div className='w-full h-screen flex justify-between items-center'>
        <h1>Loading....</h1>
        {/* <Loader /> */}
      </div>
    );

  return (
    <>
      <Head>
        <title>CodeSeer: Dependency Maps</title>
      </Head>
      <InputModal
        isShown={showInputModal}
        closeModal={() => setShowInputModal(false)}
        action={handleRunWorkflow}
        title={'Enter map version'}
      />
      <section className='w-full h-screen flex overflow-hidden'>
        <div className='flex-grow w-full h-full flex flex-col relative'>
          <header className='h-[80px] px-7 py-6 flex justify-between bg-[#F7F8FA] border-b-2 border-[#E3E3E3] drop-shadow-md'>
            <div className='flex items-center gap-3 text-lg font-semibold'>
              <span className='text-md_blue'>
                {organization
                  ? organization?.organization?.name
                  : 'Organization'}
              </span>
              <ChevronRight className='text-md_blue' />
              <span className='text-primary_gray'>
                {domain ? domain.domain.name : 'Domain Name'}
              </span>
              <ChevronRight className='text-md_blue' />
              <span className='text-primary_blue'>
                {domain ? domain.domain.repository : 'Repository'}
              </span>
              <ChevronRight className='text-md_blue' />
              <span className='text-primary_blue'>
                {curMap && curMap.version !== null
                  ? curMap.version.substring(1, curMap.version.length - 1)
                  : 'Version'}
              </span>
            </div>
            <ClipboardText className='text-dark_blue_2 cursor-pointer' />
          </header>
          <div className={styles.body__wrapper}>
            <ActionBar explorer={explorer} />

            {isDomainLoading ? (
              <div className='w-full h-full flex justify-center items-center'>
                <Loader width='80px' height='80px' />
              </div>
            ) : curDepMaps.length === 0 ? (
              <main className='flex flex-col grow w-full h-screen justify-center items-center relative'>
                <ButtonOutline
                  className='rounded-md'
                  onClick={() => setShowInputModal(true)}
                >
                  Run work flow
                </ButtonOutline>
              </main>
            ) : (
              <main className={styles.main__wrapper}>
                {isMapLoading ? (
                  <Loader width='80px' height='80px' />
                ) : (
                  <>
                    {selectedNode && curMap ? (
                      <FloatingActionBar selectedNode={selectedNode} />
                    ) : null}
                    {curMap ? (
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
                        {/* <Controls /> */}
                        <Background />
                        <Panel
                          position='bottom-left'
                          style={{ marginRight: '-20px' }}
                        >
                          <ButtonFilled
                            onClick={handleSaveTempMap}
                            className='rounded-md'
                          >
                            Save State
                          </ButtonFilled>
                        </Panel>
                      </ReactFlow>
                    ) : null}
                  </>
                )}
              </main>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Codebase;

Codebase.getLayout = function getLayout(page: any) {
  return (
    <PrivateRoute>
      <Layout>{page}</Layout>
    </PrivateRoute>
  );
};
