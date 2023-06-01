import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_DOMAIN_BY_ID } from '../constants';
import { retrieveADomain } from '@/services/domain.service';

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
