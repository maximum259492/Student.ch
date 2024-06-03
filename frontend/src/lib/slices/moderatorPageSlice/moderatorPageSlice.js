import {createSlice} from '@reduxjs/toolkit';

export const moderatorPageSlice = createSlice({
	name: 'moderatorPage',
	initialState: {
		deletedThreads: [],
		deletedComments: [],
	},
	reducers: {
		deleteThread(state, action) {
			state.deletedThreads = [...state.deletedThreads, action.payload];
		},
		deleteComment(state, action) {
			state.deletedComments = [...state.deletedComments, action.payload];
		},
	},
});

export const {deleteThread, deleteComment} = moderatorPageSlice.actions;

export const selectDeletedThreads = state => state.moderatorPage.deletedThreads;
export const selectDeletedComments = state => state.moderatorPage.deletedComments;

export default moderatorPageSlice.reducer;
