import {createSlice} from '@reduxjs/toolkit';
import {
	Books, Dormitory, Food, Teacher,
} from '../../../../public/index';

export const latestThreadsSlice = createSlice({
	name: 'latestThreads',
	initialState: {
		latestThreads: [
			{
				text: 'Epic night in the dorm! Someone’s Siri kept saying "I\'m watching you" at 3 AM. Turns out it was just Dave\'s new sleep-talking talent. We nearly called an exorcist. #DormLife #ParanormalDave',
				image: Dormitory,
			},
			{
				text: 'Guys, had the mystery stew at the dining hall today. Pretty sure it started moving on my plate. If I don\'t make it to tomorrow\'s lecture, tell my mom I loved her cooking best. #HauntedDinner #RIPMe',
				image: Food,
			},
			{
				text: 'Today’s lecture on quantum physics made me realize two things: I might be in the wrong class, and if I blink sideways, I can actually see time slowing down. #AccidentalGenius #QuantumConfusion',
				image: Books,
			},
			{
				text: 'My math prof just tried to open a PDF with a calculator. And he\'s the one grading our exams? I\'m convinced my future is in the hands of a guy who might lose at tic-tac-toe to a pigeon. #SendHelp #FacepalmAcademia',
				image: Teacher,
			},
		],
		isLoading: false,
		error: null,
	},
	reducers: {
		fetchLatestThreads(state) {
			state.isLoading = true;
		},
		fetchLatestThreadsSuccess(state, action) {
			state.latestThreads = [...state.latestThreads, ...action.payload];
			state.isLoading = false;
		},
		fetchLatestThreadsError(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const {
	fetchLatestThreads,
	fetchLatestThreadsSuccess,
	fetchLatestThreadsError,
} = latestThreadsSlice.actions;

export const selectLatestThreads = state => state.latestThreads.latestThreads;
export const selectIsLoading = state => state.latestThreads.isLoading;
export const selectError = state => state.latestThreads.error;

export default latestThreadsSlice.reducer;
