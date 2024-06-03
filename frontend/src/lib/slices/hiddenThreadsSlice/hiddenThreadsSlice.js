import {createSlice} from '@reduxjs/toolkit';

export const hiddenThreadsSlice = createSlice({
	name: 'hiddenThreads',
	initialState: {
		unhiddenThreads: [],
	},
	reducers: {
		unhideThread(state, action) {
			state.unhiddenThreads = [...state.unhiddenThreads, action.payload];
		},
	},
});

export const {unhideThread} = hiddenThreadsSlice.actions;

export const selectUnhiddenThreads = state => state.hiddenThreads.unhiddenThreads;

export default hiddenThreadsSlice.reducer;
