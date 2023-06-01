import { AxiosResponse } from 'axios';
import interceptor from './interceptor';
import { IMapLabel, INodeComment, INodeLabel } from '@/interfaces';
import { toast } from 'react-toastify';

export const mapEndpoint = '/maps';

export const updateMapLabels = async (
  labels: [IMapLabel[], INodeLabel[]],
  comments: any[],
  mapId: string
) => {
  const res = await interceptor.put(`${mapEndpoint}/${mapId}`, {
    comments,
    labels: labels,
  });

  if (res.data.success) {
    toast.success('Update map success');
  }
  return res.data;
};

export const updateMapComments = async (
  labels: [IMapLabel[], INodeLabel[]],
  comments: INodeComment[],
  mapId: string
) => {
  const res = await interceptor.put(`${mapEndpoint}/${mapId}`, {
    comments,
    labels,
  });

  if (res.data.success) {
    toast.success('Update comment success');
  }
  return res.data;
};

export const retrieveMapById = async (mapId: string) => {
  const res = await interceptor.get(`${mapEndpoint}/${mapId}`);

  toast.success(`Get map by id success`);

  return res.data;
};
