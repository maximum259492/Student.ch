import {createSlice} from '@reduxjs/toolkit';
import {
	Books, Dormitory, Food, Teacher,
} from '../../../../public/index';

export const foodThreadsSlice = createSlice({
	name: 'foodThreads',
	initialState: {
		foodThreads: [],
		isLoading: false,
		error: null,
	},
	reducers: {
		fetchFoodThreads(state) {
			state.isLoading = true;
		},
		fetchFoodThreadsSuccess(state, action) {
			state.foodThreads = [...state.foodThreads, ...action.payload];
			state.isLoading = false;
		},
		fetchFoodThreadsError(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
		addFoodThread(state, action) {
			state.foodThreads = [...state.foodThreads, action.payload];
		},
	},
});

export const {
	fetchFoodThreads,
	fetchFoodThreadsSuccess,
	fetchFoodThreadsError,
	addFoodThread,
} = foodThreadsSlice.actions;

export const selectFoodThreads = state => state.foodThreads.foodThreads;
export const selectIsLoading = state => state.foodThreads.isLoading;
export const selectError = state => state.foodThreads.error;
export const selectLatestFoodThread = state => state.foodThreads.foodThreads.slice(-1);

export default foodThreadsSlice.reducer;
