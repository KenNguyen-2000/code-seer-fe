import { IOrganization } from '@/interfaces';
import { IDependencyMap } from '@/interfaces/dependency-map.interface';
import { IDomain } from '@/interfaces/domain.interface';
import { ITeam } from '@/interfaces/team.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAnOrganization } from '../thunks/organization.thunk';

export interface OrganizationSlice {
  organization?: IOrganization;
  domains: IDomain[];
  teams: ITeam[];
}

const initialState: OrganizationSlice = {
  domains: [],
  teams: [],
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<IOrganization>) => {
      state.organization = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAnOrganization.fulfilled, (state, action) => {
      state.organization = action.payload;
    });
  },
});

export const { setOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
