export interface IDomain {
  id: string;
  userId: string;
  domainId: string;
  createdAt?: string;
  updatedAt?: string;
  domain: {
    id: string;
    name: string;
    repository: string;
    directory: string | '/';
    ownerId: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface ICreateDomain {
  teamId: string;
  payload: {
    name: string;
    repository: string;
    directory: string | '/';
  };
}

export interface IRunWorkflow {
  owner: string;
  repository: string;
  version: string;
}

export interface IWorkflows {
  owner: string;
  repository: string;
  githubToken: String;
}

export interface IWorkflow extends IWorkflows {
  workflowId: string;
}
