import {createSlice} from '@reduxjs/toolkit';
import {
	Books, Dormitory, Food, Teacher,
} from '../../../../public/index';

export const dormThreadsSlice = createSlice({
	name: 'dormThreads',
	initialState: {
		dormThreads: [
		],
		isLoading: false,
		error: null,
	},
	reducers: {
		fetchDormThreads(state) {
			state.isLoading = true;
		},
		fetchDormThreadsSuccess(state, action) {
			state.dormThreads = [...state.dormThreads, ...action.payload];
			state.isLoading = false;
		},
		fetchDormThreadsError(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
		addDormThread(state, action) {
			state.dormThreads = [...state.dormThreads, action.payload];
		},
	},
});

export const {
	fetchDormThreads,
	fetchDormThreadsSuccess,
	fetchDormThreadsError,
	addDormThread,
} = dormThreadsSlice.actions;

export const selectDormThreads = state => state.dormThreads.dormThreads;
export const selectIsLoading = state => state.dormThreads.isLoading;
export const selectError = state => state.dormThreads.error;
export const selectLatestDormThread = state => state.dormThreads.dormThreads.slice(-1);

export default dormThreadsSlice.reducer;
