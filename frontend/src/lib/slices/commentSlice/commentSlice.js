import {createSlice} from '@reduxjs/toolkit';

export const commentSlice = createSlice({
	name: 'comment',
	initialState: {
		comments: [],
		isLoading: false,
		error: null,
	},
	reducers: {
		fetchComments(state) {
			state.isLoading = true;
		},
		fetchCommentsSuccess(state, action) {
			state.comments = [...state.comments, ...action.payload];
			state.isLoading = false;
		},
		fetchCommentsError(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
		addComment(state, action) {
			state.comments = [...state.comments, action.payload];
		},
	},
});

export const {
	fetchComments,
	fetchCommentsSuccess,
	fetchCommentsError,
	addComment,
} = commentSlice.actions;

export const selectComments = state => state.comment.comments;
export const selectIsLoading = state => state.comment.isLoading;
export const selectError = state => state.comment.error;
export const selectLatestComment = state => state.comment.comments.slice(-1);
