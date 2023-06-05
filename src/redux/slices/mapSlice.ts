import {
  IMapLabel,
  INodeLabel,
  INodeComment,
  IDependencyMap,
  IAddNodeComment,
} from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Edge, Node } from 'reactflow';
import {
  addCommentOnNode,
  fetchDepMaps,
  fetchMapById,
} from '../thunks/map.thunk';

interface MapState {
  nodesState: Node[];
  edgesState: Edge[];
}

export interface MapSlice {
  isLoading: boolean;
  map?: IDependencyMap;
  labels: IMapLabel[];
  nodeLabels: INodeLabel;
  nodeComments: INodeComment[];
  currentState: [Node[], Edge[]];
}

const initialState: MapSlice = {
  isLoading: false,
  labels: [],
  nodeLabels: {},
  nodeComments: [],
  currentState: [[], []],
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

    setNodeLabels: (state, action: PayloadAction<INodeLabel>) => {
      state.nodeLabels = action.payload;
    },

    addNodeLabels: (state, action: PayloadAction<INodeLabel>) => {
      state.nodeLabels = { ...state.nodeLabels, ...action.payload };
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

    updateCurrentMapState: (state, action: PayloadAction<[Node[], Edge[]]>) => {
      state.currentState = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDepMaps.fulfilled, (state, action) => {
      console.log('FetchDepMaps mapSlice');

      if (action.payload && action.payload.length > 0) {
        const data = JSON.parse(action.payload[0].payload);
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
      state.nodeComments = data.comments;
      state.labels = data.labels[0];
      state.nodeLabels = data.labels[1];
    });

    // Fetch dependency map by mapId
    builder.addCase(fetchMapById.pending, (state) => {
      state.isLoading = true;
      localStorage.removeItem('codeseer_nodes');
      localStorage.removeItem('codeseer_edges');
    });

    builder.addCase(fetchMapById.fulfilled, (state, action) => {
      state.map = action.payload;
      const data = JSON.parse(action.payload.payload);
      if (data.labels) {
        state.nodeLabels = data.labels[1];
        state.labels = data.labels[0];
      } else {
        state.labels = [];
        state.nodeLabels = {};
      }
      if (data.comments) state.nodeComments = data.comments;
      else state.nodeComments = [];

      state.isLoading = false;
    });

    builder.addCase(fetchMapById.rejected, (state) => {
      state.isLoading = false;
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
  updateCurrentMapState,
} = mapSlice.actions;
export default mapSlice.reducer;
