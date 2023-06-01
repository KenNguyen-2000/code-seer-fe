export interface IDependencyMap {
  id: string;
  type: string;
  // payload: {
  //   modules: [];
  //   summary: {
  //     error: number;
  //     ignore: number;
  //     info: number;
  //     totalCruised: number;
  //     totalDependenciesCruised: number;
  //     warn: number;
  //   };
  // };
  payload: string;
  createdAt?: string;
  updatedAt?: string;
  domainId?: string;
  version: string;
}

export interface IModule {
  source: string;
  orphan: boolean;
  valid: boolean;
  dependencies: IDependency[];
  dependents: string[];
}

export interface IDependency {
  circular: boolean;
  coreModule: boolean;
  couldNotResolve: boolean;
  dependencyTypes: string[];
  dynamic: boolean;
  exoticallyRequired: boolean;
  followable: boolean;
  matchesDoNotFollow: boolean;
  module: string;
  moduleSystem: string;
  resolved: string;
  valid: boolean;
}

export interface IMapLabel {
  id: string;
  color: string;
  name: string;
}

export interface INodeLabel extends IMapLabel {
  nodeId: string;
}

export interface IComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface INodeComment {
  nodeId: string;
  comments: IComment[];
}

export interface IAddNodeComment {
  nodeId: string;
  comment: IComment;
}
