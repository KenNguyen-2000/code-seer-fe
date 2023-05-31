import { configureStore } from '@reduxjs/toolkit';
import domainReducer from './slices/domainSlice';
import organizationReducer from './slices/organizationSlice';
import nodeReducer from './slices/nodeSlice';
import mapReducer from './slices/mapSlice';

export const store = configureStore({
  reducer: {
    domain: domainReducer,
    organizationSlice: organizationReducer,
    nodeSlice: nodeReducer,
    mapSlice: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
