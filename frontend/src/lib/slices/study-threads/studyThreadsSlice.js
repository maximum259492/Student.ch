import {createSlice} from '@reduxjs/toolkit';
import {
	Books, Dormitory, Food, Teacher,
} from '../../../../public/index';

export const studyThreadsSlice = createSlice({
	name: 'studyThreads',
	initialState: {
		studyThreads: [
		],
		isLoading: false,
		error: null,
	},
	reducers: {
		fetchStudyThreads(state) {
			state.isLoading = true;
		},
		fetchStudyThreadsSuccess(state, action) {
			state.studyThreads = [...state.studyThreads, ...action.payload];
			state.isLoading = false;
		},
		fetchStudyThreadsError(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
		addStudyThread(state, action) {
			state.studyThreads = [...state.studyThreads, action.payload];
		},
	},
});

export const {
	fetchStudyThreads,
	fetchStudyThreadsSuccess,
	fetchStudyThreadsError,
	addStudyThread,
} = studyThreadsSlice.actions;

export const selectStudyThreads = state => state.studyThreads.studyThreads;
export const selectIsLoading = state => state.studyThreads.isLoading;
export const selectError = state => state.studyThreads.error;
export const selectLatestStudyThread = state => state.studyThreads.studyThreads.slice(-1);

export default studyThreadsSlice.reducer;
