import {
  IMapLabel,
  INodeLabel,
  INodeComment,
  IDependencyMap,
  IAddNodeComment,
} from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node } from 'reactflow';
import { addCommentOnNode, fetchDepMaps } from '../thunks/map.thunk';

export interface MapSlice {
  map?: IDependencyMap;
  labels: IMapLabel[];
  nodeLabels: INodeLabel[];
  nodeComments: INodeComment[];
}

const initialState: MapSlice = {
  labels: [],
  nodeLabels: [],
  nodeComments: [],
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setLabels: (state, action: PayloadAction<IMapLabel[]>) => {
      state.labels = action.payload;
    },

    updateLabel: (state, action: PayloadAction<IMapLabel>) => {
      state.labels = state.labels.map((label) =>
        label.id === action.payload.id ? action.payload : label
      );
    },

    addLabel: (state, action: PayloadAction<IMapLabel>) => {
      state.labels.push(action.payload);
    },
    setCurMap: (state, action: PayloadAction<IDependencyMap>) => {
      state.map = action.payload;
    },

    setNodeLabels: (state, action: PayloadAction<INodeLabel[]>) => {
      state.nodeLabels = action.payload;
    },

    addNodeLabels: (state, action: PayloadAction<INodeLabel>) => {
      state.nodeLabels.push(action.payload);
    },

    deleteLabel: (state, action: PayloadAction<IMapLabel>) => {
      state.labels = state.labels.filter(
        (label: IMapLabel) => label.id !== action.payload.id
      );
    },

    setNodeComments: (state, action: PayloadAction<INodeComment[]>) => {
      state.nodeComments = action.payload;
    },

    addNodeComment: (state, action: PayloadAction<IAddNodeComment>) => {
      const { comment, nodeId } = action.payload;
      const isIdExist = state.nodeComments.find(
        (ndCmt) => ndCmt.nodeId === nodeId
      );

      if (isIdExist) {
        state.nodeComments = state.nodeComments.map((ndsCmt) =>
          ndsCmt.nodeId === nodeId
            ? {
                ...ndsCmt,
                comments: [...ndsCmt.comments, comment],
              }
            : ndsCmt
        );
      } else {
        state.nodeComments.push({
          nodeId,
          comments: [comment],
        });
      }
    },

    clearNodeComment: (state, action: PayloadAction<string>) => {
      state.nodeComments = state.nodeComments.filter(
        (nodeComment) => nodeComment.nodeId !== action.payload
      );
    },

    updateNodeComment: (state, action: PayloadAction<INodeComment>) => {
      state.nodeComments = state.nodeComments.filter((nodeComment) =>
        nodeComment.nodeId === action.payload.nodeId
          ? action.payload
          : nodeComment
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDepMaps.fulfilled, (state, action) => {
      console.log('Thunk', action.payload);
      if (action.payload.length > 0) {
        const data = JSON.parse(action.payload[0].payload);
        console.log('Thunk data', data);
        if (data.labels) {
          state.labels = data.labels[0];
          state.nodeLabels = data.labels[1];
        }
        if (data.comments) state.nodeComments = data.comments;
        state.map = action.payload[0];
      }
    });
    builder.addCase(addCommentOnNode.fulfilled, (state, action) => {
      const data = JSON.parse(action.payload.payload);
      console.log('Comment Thunk', data);
      state.nodeComments = data.comments;
      state.labels = data.labels[0];
      state.nodeLabels = data.labels[1];
    });
  },
});

export const {
  setCurMap,
  setLabels,
  setNodeLabels,
  addLabel,
  updateLabel,
  addNodeLabels,
  addNodeComment,
  setNodeComments,
} = mapSlice.actions;
export default mapSlice.reducer;
