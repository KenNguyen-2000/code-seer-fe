import { IMapLabel, INodeComment, INodeLabel } from '@/interfaces';
import { updateMapComments } from '@/services/map.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_MAP } from '../constants';
import { retrieveMaps } from '@/services/domain.service';

interface IAddCommentOnNode {
  comments: INodeComment[];
  labels: [IMapLabel[], INodeLabel[]];
  mapId: string;
}

export const addCommentOnNode = createAsyncThunk(
  'maps/addComment',
  async ({ comments, labels, mapId }: IAddCommentOnNode, thunkAPI) => {
    const res = await updateMapComments(labels, comments, mapId);

    return res.data;
  }
);

export const fetchDepMaps = createAsyncThunk(
  FETCH_MAP,
  async (domainId: string, thunkApi) => {
    try {
      const res = await retrieveMaps(domainId);

      return res.data;
    } catch (error) {}
  }
);
