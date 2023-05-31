import { IComment, IDependency } from '@/interfaces/dependency-map.interface';

export interface INodePayload {
  source: string;
  orphan: boolean;
  valid: boolean;
  labelData?: {
    id: string;
    color: string;
    name: string;
  };
  commentData?: {
    nodeId: string;
    comments: IComment[];
  };
}

export interface IEdgePayload extends IDependency {
  from: string;
  to: string;
}

export interface IResult {
  name: string;
  children: IResult[];
}

export interface IMainData {
  nodes: INodePayload[];
  edges: IEdgePayload[];
}
