import { createAsyncThunk } from '@reduxjs/toolkit';
import { DELETE_VERSION_BY_ID, FETCH_DOMAIN_BY_ID } from '../constants';
import { retrieveADomain } from '@/services/domain.service';
import { deleteMapVersion } from '@/services/map.service';

export const fetchDomainById = createAsyncThunk(
  FETCH_DOMAIN_BY_ID,
  async (domainId: string, thunkApi) => {
    try {
      const res = await retrieveADomain(domainId);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAVersion = createAsyncThunk(
  DELETE_VERSION_BY_ID,
  async (versionId: string) => {
    try {
      const res = await deleteMapVersion(versionId);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
