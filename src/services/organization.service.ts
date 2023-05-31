import { AxiosResponse } from 'axios';

import interceptor from './interceptor';
import {
  ICreateOrganization,
  IInviteMemberToOrg,
  IJoinOrg,
} from '@/interfaces';

export const organizationEndpoint = '/organizations';

export const retrieveOrganizations = async (): Promise<AxiosResponse> => {
  const res = await interceptor.get(organizationEndpoint);
  return res.data;
};

export const retrieveAnOrganization = async (key: string) => {
  const res = await interceptor.get(key);

  return res.data;
};

export const createNewOrganization = async (
  url: string,
  { login, description, name }: ICreateOrganization
): Promise<AxiosResponse> => {
  const res = await interceptor.post(url, {
    login,
    description,
    name,
  });
  return res.data;
};

const deleteAnOrganization = async (
  url: string,
  organizationId: string
): Promise<AxiosResponse> => {
  const res = await interceptor.delete(`${url}/${organizationId}`);

  return res.data;
};

const inviteMemberToOrganization = async (
  url: string,
  { organizationId, memberEmail }: IInviteMemberToOrg
): Promise<AxiosResponse> => {
  const res = await interceptor.post(url, {
    organizationId,
    memberEmail,
  });

  return res.data;
};

export const joinOrganization = async (
  url: string,
  { invitationId, orgId }: IJoinOrg
): Promise<AxiosResponse> => {
  const res = await interceptor.get(url, {
    params: {
      inv: invitationId,
      org: orgId,
    },
  });

  return res.data;
};
