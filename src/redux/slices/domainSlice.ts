import { IDependencyMap } from '@/interfaces/dependency-map.interface';
import { IDomain } from '@/interfaces/domain.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDomainById } from '../thunks/domain.thunk';
import { fetchDepMaps } from '../thunks/map.thunk';

export interface DomainSlice {
  isLoading: boolean;
  domain?: IDomain;
  dependencyMaps: IDependencyMap[];
}

const initialState: DomainSlice = {
  isLoading: false,
  dependencyMaps: [],
};

const domainSlice = createSlice({
  name: 'domain',
  initialState,
  reducers: {
    setDomain: (state, action: PayloadAction<IDomain>) => {
      state.domain = action.payload;
    },
    setDependencyMaps: (state, action: PayloadAction<IDependencyMap[]>) => {
      state.dependencyMaps = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchDomainById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDomainById.fulfilled, (state, action) => {
      state.domain = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchDomainById.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchDepMaps.fulfilled, (state, action) => {
      console.log('FetchDepMaps domainSlice');
      state.dependencyMaps = action.payload;
    });
  },
});

export const { setDomain, setDependencyMaps } = domainSlice.actions;
export default domainSlice.reducer;
