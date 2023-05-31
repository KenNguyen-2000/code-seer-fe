import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_ORGANIZATION } from '../constants';
import {
  organizationEndpoint,
  retrieveAnOrganization,
} from '@/services/organization.service';

export const fetchAnOrganization = createAsyncThunk(
  FETCH_ORGANIZATION,
  async (organizationId: string, thunkApi) => {
    try {
      const res = await retrieveAnOrganization(
        `${organizationEndpoint}/${organizationId}`
      );

      console.log('Thunk request', res);

      return res.data;
    } catch (error) {}
  }
);
