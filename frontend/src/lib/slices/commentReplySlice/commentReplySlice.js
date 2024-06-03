import {createSlice} from '@reduxjs/toolkit';

export const commentReplySlice = createSlice({
	name: 'commentReply',
	initialState: {
		commentReplies: [],
		isLoading: false,
		error: null,
	},
	reducers: {
		fetchCommentReplies(state) {
			state.isLoading = true;
		},
		fetchCommentRepliesSuccess(state, action) {
			state.commentReplies = [...state.commentReplies, ...action.payload];
			state.isLoading = false;
		},
		fetchCommentRepliesError(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
		addCommentReply(state, action) {
			state.commentReplies = [...state.commentReplies, action.payload];
		},

	},

});

export const {
	fetchCommentReplies,
	fetchCommentRepliesSuccess,
	fetchCommentRepliesError,
	addCommentReply,
} = commentReplySlice.actions;

export const selectCommentReplies = state => state.commentReply.commentReplies;
export const selectIsLoading = state => state.commentReply.isLoading;
export const selectError = state => state.commentReply.error;
export const selectLatestCommentReply = state => state.commentReply.commentReplies.slice(-1);
