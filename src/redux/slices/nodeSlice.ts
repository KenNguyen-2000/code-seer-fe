import { IComment, IMapLabel } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node } from 'reactflow';

export interface NodeSlice {
  selectedNode?: Node;
  showAction: boolean;
  action: 'comments' | 'label';
  label?: IMapLabel;
  comments: IComment[];
}

const initialState: NodeSlice = {
  showAction: false,
  action: 'comments',
  comments: [],
};

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    setSelectedNode: (state, action: PayloadAction<Node>) => {
      state.selectedNode = action.payload;
      if (action.payload.data.commentData)
        state.comments = action.payload.data.commentData.comments;
      else state.comments = [];
      state.showAction = true;
    },

    setActionOnNode: (state, action: PayloadAction<'comments' | 'label'>) => {
      state.action = action.payload;
    },

    setNodeLabel: (state, action: PayloadAction<IMapLabel>) => {
      state.label = action.payload;
    },

    clearLabel: (state) => {
      state.label = undefined;
    },

    addComment: (state, action: PayloadAction<IComment>) => {
      state.comments.push(action.payload);
    },

    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const {
  setSelectedNode,
  setActionOnNode,
  setNodeLabel,
  clearLabel,
  addComment,
  deleteComment,
} = nodeSlice.actions;
export default nodeSlice.reducer;
