import { AxiosResponse } from 'axios';

import interceptor from './interceptor';
import {
  ICreateOrganization,
  IInviteMemberToOrg,
  IJoinOrg,
} from '@/interfaces';
import { toast } from 'react-toastify';

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
) => {
  const res = await interceptor.post(url, {
    login,
    description,
    name,
  });
  return res.data;
};

export const deleteAnOrganization = async (organizationId: string) => {
  const res = await interceptor.delete(
    `${organizationEndpoint}/${organizationId}`
  );

  if (res.status >= 200 && res.status < 300)
    toast.success('Delete organization successfully!');

  return res.data;
};

export const inviteMemberToOrganization = async ({
  organizationId,
  memberEmail,
}: IInviteMemberToOrg) => {
  const res = await interceptor.post(`${organizationEndpoint}/members/invite`, {
    organizationId,
    memberEmail,
  });

  return res.data;
};

export const joinOrganization = async ({ invitationId, orgId }: IJoinOrg) => {
  const res = await interceptor.get(`${organizationEndpoint}/members/join`, {
    params: {
      inv: invitationId,
      org: orgId,
    },
  });

  console.log(res);

  return res.data;
};
