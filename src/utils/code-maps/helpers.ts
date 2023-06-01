import { Edge, Node } from 'reactflow';
import {
  IEdgePayload,
  IMainData,
  INodePayload,
  IResult,
} from './helpers.interface';
import { INodeComment, INodeLabel } from '@/interfaces';

const padding = 20;
const gap = 25;
const iconSize = 24;

export function getChildrenBiggestSize(node: Node) {
  let longestString = '';
  let shortestString = '';
  node.data.children.forEach((child: any) => {
    let string = `${child.name}/`;
    if (child.name.includes('.')) {
      string = child.name.split('/')[child.name.split('/').length - 1];
    }
    if (longestString.length <= string.length) {
      longestString = string;
    } else {
      shortestString = string;
    }
  });

  // Get the biggest Size
  const long = document.createElement('span');
  long.style.visibility = 'hidden';
  long.style.fontSize = '16px';
  long.style.padding = '10px';
  long.innerHTML = longestString;
  document.body.appendChild(long);

  // Get the width of the long element and set it as the width of the div
  const longWidth = long.offsetWidth;
  const longHeight = long.offsetHeight;
  // Remove the long element
  document.body.removeChild(long);

  // Get the biggest Size
  const short = document.createElement('span');
  short.style.visibility = 'hidden';
  short.style.fontSize = '16px';
  short.style.padding = '10px';
  short.innerHTML = shortestString;
  document.body.appendChild(short);

  // Get the width of the short element and set it as the width of the div
  const shortWidth = short.offsetWidth;
  const shortHeight = short.offsetHeight;
  // Remove the short element
  document.body.removeChild(short);

  const dummyWidth = longWidth + iconSize;
  const dummyHeight = (longHeight + shortHeight) / 2;
  return { dummyWidth, dummyHeight };
}

export const getFourCornPos = (node: Node) => {
  const nodeCorners: any = {
    topLeft: { x: node.position.x, y: node.position.y },
    topRight: { x: node.position.x + node.width!, y: node.position.y },
    bottomLeft: { x: node.position.x, y: node.position.y + node.height! },
    bottomRight: {
      x: node.position.x + node.width!,
      y: node.position.y + node.height!,
    },
  };

  return nodeCorners;
};

interface CollisionInfo {
  collided: boolean;
  overlapX: number;
  overlapY: number;
}

// eslint-disable-next-line no-unused-vars
export function detectRectanglesCollision(
  rectA: Node,
  rectB: Node
): CollisionInfo {
  // Get the positions of the corners of the two rectangles
  const rectACorners: any = {
    topLeft: { x: rectA.position.x, y: rectA.position.y },
    topRight: { x: rectA.position.x + rectA.width!, y: rectA.position.y },
    bottomLeft: { x: rectA.position.x, y: rectA.position.y + rectA.height! },
    bottomRight: {
      x: rectA.position.x + rectA.width!,
      y: rectA.position.y + rectA.height!,
    },
  };
  const rectBCorners: any = {
    topLeft: { x: rectB.position.x, y: rectB.position.y },
    topRight: { x: rectB.position.x + rectB.width!, y: rectB.position.y },
    bottomLeft: { x: rectB.position.x, y: rectB.position.y + rectB.height! },
    bottomRight: {
      x: rectB.position.x + rectB.width!,
      y: rectB.position.y + rectB.height!,
    },
  };

  // Check if any of the corners of rectA are inside rectB
  // eslint-disable-next-line no-restricted-syntax
  for (const corner in rectACorners) {
    if (
      rectACorners[corner].x >= rectBCorners.topLeft.x &&
      rectACorners[corner].x <= rectBCorners.topRight.x &&
      rectACorners[corner].y >= rectBCorners.topLeft.y &&
      rectACorners[corner].y <= rectBCorners.bottomLeft.y
    ) {
      // Calculate the overlap rectangle
      const overlapX = Math.max(rectA.position.x, rectB.position.x);
      const overlapY = Math.max(rectA.position.y, rectB.position.y);
      const overlapWidth =
        Math.min(
          rectA.position.x + rectA.width!,
          rectB.position.x + rectB.width!
        ) - overlapX;
      const overlapHeight =
        Math.min(
          rectA.position.y + rectA.height!,
          rectB.position.y + rectB.height!
        ) - overlapY;
      // const overlapRect = { x: overlapX, y: overlapY, width: overlapWidth, height: overlapHeight };

      // Move rectB out of the collision area by adding the width and height of the overlap rectangle to its position
      return {
        overlapX: overlapWidth,
        overlapY: overlapHeight,
        collided: true,
      };
    }
  }

  return { overlapX: 0, overlapY: 0, collided: false };
}

interface IObject {
  name?: any;
  children?: any;
  data?: any;
}
export const generateTemp = (data: IMainData, temp: any[], final: any) => {
  temp.forEach((a: any) => {
    a.reduce((r: any, name: any, i: any, arr: any) => {
      if (!r[name]) {
        const obj: IObject = { name };
        r[name] = { result: [] };
        if (arr[i + 1] && name != null) {
          obj.children = r[name].result;
        }

        if (name.includes('.')) {
          const otherChild = data.edges.filter(
            (e: any) => e.from === arr.join('/')
          );

          obj.children = otherChild.map((oC: any) => {
            const tempData = {
              name: oC.to,
              data: data.nodes.find((n: any) => n.source === oC.to),
              labelData: data.nodes.find(
                (item: any) =>
                  item.labelData && item.labelData.nodeId === obj.name
              )?.labelData,
              commentData: data.nodes.find(
                (item: any) =>
                  item.commentData && item.commentData.nodeId === obj.name
              )?.commentData,
            };

            return tempData;
          });
        }

        if (obj.name.includes('.')) {
          obj.name = arr.join('/');
          const tempData = data.nodes.find(
            (item: any) =>
              item.source.split('/')[item.source.split('/').length - 1] ===
              obj.name
          );
          obj.data = {
            ...tempData,
            labelData: data.nodes.find(
              (item: any) =>
                item.labelData && item.labelData.nodeId === obj.name
            )?.labelData,
            commentData: data.nodes.find(
              (item: any) =>
                item.commentData && item.commentData.nodeId === obj.name
            )?.commentData,
          };
        }

        r.result.push(obj);
      }

      return r[name];
    }, final);
  });
};

export const convertToReactFlowFormat = (
  treeNode: IResult,
  arr: Map<string, Node>,
  mainData: IMainData
) => {
  if (treeNode.name.includes('.')) {
    if (treeNode.children && treeNode.children.length > 0) {
      arr.set(treeNode.name, {
        id: treeNode.name,
        data: {
          label: treeNode.name,
          ...mainData.nodes.find(
            (item: INodePayload) => item.source === treeNode.name
          ),
          children: treeNode.children,
        },
        position: {
          x: 0,
          y: 0,
        },
        type: 'selectorNode',
      });
    } else {
      arr.set(treeNode.name, {
        id: treeNode.name,
        data: {
          label: treeNode.name,
          ...mainData.nodes.find(
            (item: INodePayload) => item.source === treeNode.name
          ),
        },
        position: {
          x: 0,
          y: 0,
        },
        type: 'selectorNode',
      });
    }
  } else {
    arr.set(treeNode.name, {
      id: treeNode.name,
      position: {
        x: 0,
        y: 0,
      },
      data: {
        label: treeNode.name,
        children: treeNode.children,
      },
      type: 'selectorNode',
      className: `reactflow_node_${treeNode.name}`,
    });
    treeNode.children.forEach((node: IResult) => {
      convertToReactFlowFormat(node, arr, mainData);
    });
  }
};

export const generateInitialNodes = (
  result: IResult[],
  mainData: IMainData
): Node[] =>
  result.map((item: IResult, index: number) => {
    const labelData = mainData.nodes.find(
      (n: INodePayload) => n.source === item.name
    )?.labelData;

    return {
      id: item.name,
      position: {
        x: 0,
        y: index * 20,
      },
      type: 'selectorNode',
      data: !item.name.includes('.')
        ? {
            label: item.name,
            children: item.children ? item.children : undefined,
            depth: 0,
            labelData: mainData.nodes.find(
              (n: INodePayload) => n.source === item.name
            )?.labelData,
          }
        : {
            label: item.name,
            children: item.children ? item.children : undefined,
            ...mainData.nodes.find((n: INodePayload) => n.source === item.name),
            depth: 0,
            labelData: labelData,
          },
      style: {
        background: labelData ? labelData.color : 'rgba(255,255,255,0.6)',
      },
    };
  });

export const generateInitialEdges = (
  result: IResult[],
  mainData: IMainData
): Edge[] =>
  result
    .filter(
      (item: IResult) =>
        mainData.edges.find((e: IEdgePayload) => e.from === item.name) !==
        undefined
    )
    .map((item: any) => ({
      id: `${item.from}-${item.to}`,
      source: item.from,
      target: item.to,
    }));

export const generateInitSetup = (data: any) => {
  const nodeAr: INodePayload[] = data.modules.map((module: any) => ({
    source: module.source,
    orphan: module.orphan,
    valid: module.valid,
    labelData: data.labels
      ? data.labels[1].find(
          (label: INodeLabel) => label.nodeId === module.source
        )
      : null,
    commentData: data.comments
      ? data.comments.find(
          (comment: INodeComment) => comment.nodeId === module.source
        )
      : null,
  }));

  const edgeAr: IEdgePayload[] = data.modules
    .map((module: any) => {
      const edgesList = module.dependencies.map((dependency: any) => ({
        from: module.source,
        to: dependency.resolved,
        ...dependency,
      }));

      return [...edgesList];
    })
    .flat(1);

  const mainData: IMainData = { nodes: nodeAr, edges: edgeAr };

  const temp = nodeAr.map((n: any) => n.source.split('/'));
  const result: IResult[] = [];
  const final = { result };
  generateTemp(mainData, temp, final);

  const arrMap = new Map<string, Node>();
  convertToReactFlowFormat(result[0], arrMap, mainData);

  const initNodes: Node[] = generateInitialNodes(result, mainData);
  const initEdges: Edge[] = generateInitialEdges(result, mainData);

  return {
    initialNodes: initNodes,
    initialEdges: initEdges,
    explorer: result,
    mainData,
  };
};

export const getAllPosibleEdge = (
  sourceNode: Node,
  presentNodes: Node[],
  mainData: IMainData
) => {
  if (!sourceNode.id.includes('.') && sourceNode.data.isExpand) {
  }

  const allPosibleEdges: IEdgePayload[] = mainData.edges.filter(
    (edge: IEdgePayload) => edge.from === sourceNode.id
  );
  const interSectionsEdges = allPosibleEdges.filter((aPE: IEdgePayload) => {
    return presentNodes.some((pNode) => pNode.id === aPE.from);
  });

  return interSectionsEdges;
};

export function getAllChildNodes(node: Node, nodes: Node[]) {
  // const childNodes = [];
  // if (node.data.children.length > 0) {
  //   const childNodes = nodes.filter(
  //     (n) => node.data.children.find((c: any) => c.name === n.id) !== undefined
  //   );
  //   childNodes.forEach((cN: Node) => {
  //     if (!cN.id.includes('') && cN.data.isExpand)
  //       getAllChildNodes(cN, nodes, [...list, ...childNodes]);
  //   });
  // }

  const chilren: Node[] = [];
  const findChildren = (currentNode: Node, parentNode: Node) => {
    if (
      currentNode.parentNode === parentNode.id &&
      !currentNode.data.isExpand
    ) {
      chilren.push(currentNode);
    }

    nodes.forEach((n: Node) => {
      if (n.parentNode === currentNode.id) {
        findChildren(n, currentNode);
      }
    });
  };

  findChildren(node, node);

  return chilren;
}

// function getAllChildren(tree, nodeId) {
//   const children = [];

//   const findChildren = (currentNode) => {
//     if (currentNode.parent === nodeId) {
//       children.push(currentNode);
//     }

//     tree.forEach((node) => {
//       if (node.parent === currentNode.id) {
//         findChildren(node);
//       }
//     });
//   };

//   // Find all children starting from the given node
//   findChildren({ id: nodeId });

//   return children;
// }
