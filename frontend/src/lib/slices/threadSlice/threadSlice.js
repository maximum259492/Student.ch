import {createSlice} from '@reduxjs/toolkit';

export const threadSlice = createSlice({
	name: 'thread',
	initialState: {
		id: localStorage.getItem('threadId') || null,
		hiddenThreads: [],
		isInThread: false,
	},
	reducers: {
		saveThreadId(state, action) {
			state.id = action.payload;
		},
		resetThreadId(state) {
			state.id = null;
		},
		hideThread(state, action) {
			const threadId = action.payload;
			if (!state.hiddenThreads.includes(threadId)) {
				state.hiddenThreads.push(threadId);
			}
		},
		changeIsNotInThread(state) {
			state.isInThread = false;
		},
		changeIsInThread(state) {
			state.isInThread = true;
		},
	},
});

export const {
	saveThreadId,
	resetThreadId,
	hideThread,
	changeIsInThread,
	changeIsNotInThread,
} = threadSlice.actions;

export const selectThreadId = state => state.thread.id;
export const selectIsInThread = state => state.thread.isInThread;
export const selectHiddenThreads = state => state.thread.hiddenThreads;

export default threadSlice.reducer;

